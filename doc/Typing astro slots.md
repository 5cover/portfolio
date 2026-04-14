# Proposal: optional static typing for Astro component slots

## Summary

This proposal adds optional static typing for component slots in Astro, analogous to the existing `Props` typing model.

A component may declare a `Slots` type describing:

- which slot names it accepts
- whether each slot is required or optional
- which argument tuple, if any, is provided when that slot is rendered

This would improve:

- correctness of slot usage
- typing of `Astro.slots.render(...)`
- inference of slot callback parameters at call sites
- discoverability of component slot APIs

The proposal is fully additive:

- existing Astro code remains valid
- current runtime behavior remains unchanged
- slot typing is opt-in

## Motivation

Astro components can currently define typed `Props`, but slots remain effectively untyped.

Today there is no way for a component to statically declare:

- which slots are accepted
- which slots are required
- which arguments are passed to a slot when rendered

This is especially limiting for components that provide structured information back to their caller through slots.

For example, a component may provide contextual rendering information:

```astro
---
type Context = {
  level: number;
};

type Props = {
  c: Context;
};

const p = Astro.props;
---

<section>
  {await Astro.slots.render('default', [{ level: p.c.level + 1 }])}
</section>
```

and the caller may use it like this:

```astro
<BaseLayout pageName={`project/${id}`}>
  {(c: Context) => <Detail {c} of={project(Astro.currentLocale, id)} />}
</BaseLayout>
```

This works, but the component cannot currently declare that:

- `default` is expected
- `default` receives one argument
- that argument is a `Context`

As a result, tooling cannot help the caller, and the terser syntax:

```astro
<BaseLayout pageName={`project/${id}`}>
  {c => <Detail {c} of={project(Astro.currentLocale, id)} />}
</BaseLayout>
```

cannot benefit from principled TypeScript inference.

## Proposed syntax

Allow Astro components to optionally declare a `Slots` type in frontmatter, similarly to `Props`.

Example:

```astro
---
type Context = {
  level: number;
};

type Props = {
  c: Context;
};

type Slots = {
  default: [Context];
};
---
```

Interpretation:

- the component accepts a `default` slot
- the `default` slot receives one argument of type `Context`

## Slot value shape

Each slot value is a tuple type describing the arguments passed to that slot.

This directly mirrors TypeScript’s `Parameters<T>` model for function parameters.

Examples:

```ts
type Slots = {
  default: [];
  title: [string];
  footer: [string, number];
  spread: [a: string, ...rest: number[]];
};
```

Interpretation:

- `default` receives no arguments
- `title` receives one string
- `footer` receives a string and a number
- `spread` receives one string followed by zero or more numbers

This model also naturally supports:

- `unknown[]` as the top type for “unchecked arguments”
- `never` as a slot that is never rendered

Using parameter tuples instead of full function types is preferable because the slot callback return type is not relevant to users and would be confusing to expose. The important contract is the argument list.

## Why tuple types instead of full function types

A full function type would force users to think about both:

- input parameters
- return type

Only the input parameters matter here.

The callback return value is always template content handled by Astro internally. Requiring users to model that return type would add noise and confusion.

Tuple types describe the relevant contract directly and align with how `Astro.slots.render(name, args)` already works.

## Semantics

### If `Slots` is not declared

Current behavior is preserved:

- any slot names are allowed
- slot argument shapes are unchecked
- no slot validation is performed

This preserves full backwards compatibility.

This mirrors Astro’s current `Props` philosophy: absence of a type declaration means unchecked behavior, not forbidden behavior.

### If `Slots` is declared

Then slot names and argument tuples are validated.

Example:

```astro
---
type Context = {
  level: number;
};

type Slots = {
  default: [Context];
  title?: [];
};
---
```

Interpretation:

- `default` is required and receives one `Context`
- `title` is optional and receives no arguments

### Empty `Slots`

```astro
---
type Slots = {};
---
```

Interpretation:

- the component explicitly accepts no slots

This enables negative validation for components that should reject all slots.

### Escape hatch

```astro
---
type Slots = {
  [key: string]: unknown[];
};
---
```

Interpretation:

- allow any slot names
- allow any slot argument tuples
- keep checking enabled at the structural level, but make the contract intentionally loose

If users want to disable type checking entirely, they could also use `any`, but `unknown[]` is the preferable top type because it preserves typing discipline while remaining permissive.

## Typing `Astro.slots.render(...)`

This proposal should not merely validate `Astro.slots.render(...)` ad hoc. It should type it from `Slots`.

Conceptually, if a component declares:

```ts
type Slots = {
  default: [Context];
  title?: [];
  footer?: [string, number];
};
```

then inside that component the type of `Astro.slots.render` should behave as if it were:

```ts
type TypedSlotsRender<Slots> = <K extends keyof Slots>(
  name: K,
  args: Slots[K]
) => Promise<string>;
```

with whatever exact return type Astro already uses internally for rendered slot content.

That means:

```astro
{await Astro.slots.render('default', [{ level: 2 }])}
```

is valid.

```astro
{await Astro.slots.render('title', [])}
```

is valid.

```astro
{await Astro.slots.render('footer', ['x', 1])}
```

is valid.

```astro
{await Astro.slots.render('default', [])}
```

is invalid.

```astro
{await Astro.slots.render('missing', [])}
```

is invalid unless the slot type includes an index signature.

Optional slots would still be callable by name from the component side, but their existence at the call site would be checked separately.

## Call-site validation

When `Slots` is declared, tooling should validate:

- whether required slots are present
- whether provided slot names exist
- whether slot callback parameters are inferred correctly
- whether named slots with no arguments are used in normal markup form

Example:

```astro
---
type Context = {
  level: number;
};

type Slots = {
  default: [Context];
};
---
```

Valid:

```astro
<Component>
  {c => <Heading {c}>Title</Heading>}
</Component>
```

Invalid:

```astro
<Component />
```

because the required `default` slot is missing.

Optional no-argument slot:

```astro
---
type Slots = {
  title?: [];
};
---
```

Valid:

```astro
<Component>
  <Fragment slot="title">Hello</Fragment>
</Component>
```

Unknown slot:

```astro
<Component>
  <Fragment slot="unknown">Hello</Fragment>
</Component>
```

Invalid if `unknown` is not declared and no index signature exists.

## Slot callback argument inference

One of the main benefits of this proposal is that slot callback parameters can be inferred from the component’s declared slot contract.

For example:

```astro
---
type Context = {
  level: number;
};

type Props = {
  pageName: string;
};

type Slots = {
  default: [Context];
};
const p = Astro.props;
---

<main>
  {await Astro.slots.render('default', [{ level: 1 }])}
</main>
```

Then this call site:

```astro
<BaseLayout pageName={`project/${id}`}>
  {c => <Detail {c} of={project(Astro.currentLocale, id)} />}
</BaseLayout>
```

should infer `c` as `Context` automatically.

This avoids the need for explicit annotation:

```astro
<BaseLayout pageName={`project/${id}`}>
  {(c: Context) => <Detail {c} of={project(Astro.currentLocale, id)} />}
</BaseLayout>
```

This improves both ergonomics and correctness while leveraging normal TypeScript inference.

## Ignoring provided slot arguments

Callers should still be allowed to ignore provided slot arguments.

For example, this should remain valid:

```astro
<Component>
  <Heading c={outerContext}>Title</Heading>
</Component>
```

even if `default` is declared as `[Context]`.

This is analogous to ordinary typed callbacks in TypeScript:

```ts
someArray.map(() => 42);
```

The callback may ignore its arguments.

In some domains this may be a mistake or dead end, but that should not be a core type error. It is better handled by linting or editor diagnostics.

## Relationship to `Props`

This proposal treats `Slots` as the dual of `Props`:

- `Props` describe data flowing from caller to component
- `Slots` describe render contracts flowing from component back to the caller

Example:

```astro
---
type Context = {
  level: number;
};

type Props = {
  pageName: string;
};

type Slots = {
  default: [Context];
  title?: [];
};
---
```

This symmetry makes the feature easier to understand and teach.

## Backwards compatibility

This proposal is intentionally conservative.

If `Slots` is not declared:

- all current Astro components continue to behave exactly as they do today
- no migration is required
- existing codebases are unaffected

This is preferable to interpreting absence of `Slots` as “no slots allowed”, which would be stricter but would also be a breaking change.

Strict “no slots” semantics remain available explicitly via:

```ts
type Slots = {};
```

## Benefits

### Better correctness

Components can explicitly declare:

- accepted slot names
- required vs optional slots
- argument tuples for each slot

### Better editor tooling

Editors and the language server can:

- autocomplete slot names
- infer callback parameter types
- report missing required slots
- report unknown slots
- validate `Astro.slots.render(...)`

### Better discoverability

A component’s slot API becomes visible in the source, alongside `Props`.

### Better support for advanced component patterns

This is especially useful for patterns where slots behave like reverse props or structured render callbacks.

### Zero runtime cost

This proposal only affects type generation and tooling. Runtime behavior does not need to change.

## Drawbacks

### Increased type-system complexity

Astro’s tooling would need to parse and propagate a new kind of component contract.

### Another concept for users to learn

Users would need to understand `Slots` in addition to `Props`.

### Semantic mistakes are still possible

A slot may provide arguments that the caller chooses not to consume. That is appropriate at the type level, but some projects may still want stronger guidance.

### Some slot syntax details may need careful design

Astro supports multiple slot usage forms today. Mapping all of them cleanly into a typed model may require careful language-server and compiler work.

## Open questions

### How exactly should `Astro.slots.render(...)` be surfaced in generated component types?

The underlying idea is straightforward, but the exact generated typing should fit Astro’s existing internal type model and return types.

### How should named slots with arguments be represented ergonomically at call sites?

For default slots, callback-style usage is natural. For named slots with arguments, Astro may need to define or document the expected usage pattern clearly.

### Should tooling surface a hint when a slot provides arguments but the caller ignores them?

This seems better suited to linting or editor diagnostics than to the core type system.

### Should a config option be provided for defaulting to "no slots" semantics for the absence of `Slots` instead of "any slots"?

Something like `strictSlots: true` in `astro.config.mjs`. This does introduce complexity, but "no slots" by default is preferable in the long run, requiring explicit typing of slots.

## Implementation sketch

At a high level, this appears implementable in Astro’s existing type-generation and language-tooling pipeline.

1. Parse `Slots` from component frontmatter, using the same general machinery already used for `Props`
2. Resolve the final object type, allowing either type aliases or interfaces
3. Extract finite keys and tuple value types
4. Generate slot metadata alongside prop metadata
5. Use this metadata to:
   - type `Astro.slots.render(...)` inside the component
   - validate slot names and requiredness at call sites
   - infer slot callback parameter types
   - improve editor completions and diagnostics

No runtime behavior change should be required.

## Example

### `BaseLayout.astro`

```astro
---
type Context = {
  level: number;
};

type Props = {
  pageName: string;
};

type Slots = {
  default: [Context];
};

const p = Astro.props;
---

<main>
  {await Astro.slots.render('default', [{ level: 1 }])}
</main>
```

### Call site

```astro
<BaseLayout pageName={`project/${id}`}>
  {c => <Detail {c} of={project(Astro.currentLocale, id)} />}
</BaseLayout>
```

`c` should be inferred as `Context`.

## Conclusion

Astro already provides a strong model for typed props. Extending that model to slots would make advanced component composition significantly safer and easier to understand, especially for slot-based render contracts and callback-style slot usage.

This proposal is:

- additive
- backwards-compatible
- opt-in
- zero-runtime-cost

and would improve both correctness and developer experience for a class of Astro components that currently rely on convention rather than explicit contracts.
