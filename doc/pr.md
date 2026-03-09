
todo

- remove optional? maybe
- specify non interface types allowed (ts api used to inspect type, like props, same mechanics)
- futures? no, do it now. like unused args
- specify direct rendering examples (valid and invalid, no render call, slot element)

## Summary

This proposal adds an **optional** `Slots` type contract for Astro components, analogous to the existing `Props` contract.

It allows component authors to declare:

- which slot names are accepted
- whether a slot is required or optional
- which argument tuple, if any, is provided when a slot is rendered

This would improve correctness and editor tooling for slot-heavy component systems while remaining fully backwards-compatible.

This feature is **purely additive**:

- existing components remain valid
- runtime behavior remains unchanged
- slot typing is opt-in

## Motivation

Astro components can currently define typed `Props`, but slots remain effectively untyped:

- callers can provide any slot name
- components can render any slot name
- slot arguments are not statically described
- callers cannot know whether a slot should be direct markup or a render function receiving arguments
- missing/extra slots are not validated

This is especially limiting for advanced component patterns where slots act as a reverse data flow channel, e.g. components that provide structured contextual information to their caller.

Example pattern today:

```astro
---
interface Props {
  c: { level: number }
}
const p = Astro.props;
---
<section>
  {await Astro.slots.render('default', [{ level: p.c.level + 1 }])}
</section>
```

Caller:

```astro
<Section {c}>
  {(c) => <Heading {c}>Title</Heading>}
</Section>
```

This works at runtime, but:

- the slot argument is not typed
- the caller is not guided by tooling
- the component cannot declare that `default` is required
- providing the wrong slot name or wrong shape is unchecked

## Proposed syntax

Allow Astro components to optionally declare a `Slots` type or interface in frontmatter, similarly to `Props`.

### Example

```astro
---
interface Props {
  c: Context;
}

interface Slots {
  default: [Context];
}
---
```

Interpretation:

- this component accepts a `default` slot
- that slot receives one argument of type `Context`

### Optional slots

```astro
---
interface Slots {
  default?: [Context];
  title?: [];
}
---
```

Interpretation:

- `default` slot is optional and receives a `Context`
- `title` slot is optional and receives no arguments

### Empty slot contract

```astro
---
interface Slots {}
---
```

Interpretation:

- this component explicitly accepts no slots

### Escape hatch

```astro
---
interface Slots {
  [key: string]: unknown;
}
---
```

Interpretation:

- allow any slot names
- no argument validation

This would reproduce the current behavior explicitly.

## Semantics

### If `Slots` is not defined

Current behavior is preserved:

- any slot names are allowed
- any slot argument shapes are allowed
- no slot validation is performed

This preserves full backwards compatibility.

### If `Slots` is defined

Then tooling validates:

- slot names accepted by the component
- optional vs required presence
- argument tuple shape for `Astro.slots.render(...)`
- slot usage shape at call sites

### Slot argument tuples

Each value type in the `Slots` object type is an argument tuple:

```ts
default: [Context]
header: []
custom: [Context, string, number]
```

This maps directly to `Astro.slots.render(name, args)`.

Examples:

```astro
---
interface Slots {
  default: [Context];
}
---
{await Astro.slots.render('default', [nextContext])}
```

This is valid.

```astro
{await Astro.slots.render('default', [])}
```

This is invalid because `default` expects one argument.

## Call-site typing behavior

### Slot with no arguments

```astro
---
interface Slots {
  title?: [];
}
---
```

Caller may write standard slot markup:

```astro
<Component>
  <Fragment slot="title">Title</Fragment>
</Component>
```

### Slot with arguments

```astro
---
interface Slots {
  default: [Context];
}
---
```

Caller may write a render function:

```astro
<Component>
  {(c) => <Heading {c}>Title</Heading>}
</Component>
```

Tooling would know that `c` is a `Context`.

### Ignoring provided arguments

It should remain valid to ignore the provided slot arguments:

```astro
<Component>
  <Heading c={outerContext}>Title</Heading>
</Component>
```

This is semantically questionable in some domains, but it is not intrinsically invalid.

This is similar to:

```ts
someArray.map(() => 42)
```

where callback parameters may be unused.

A future lint rule or editor hint could warn if a slot provides arguments that are not consumed, but this should not be a type error.

## Relationship to `Props`

This proposal treats `Slots` as the dual of `Props`.

- `Props` describe data flowing from caller to component
- `Slots` describe render contracts flowing from component to caller

This symmetry makes the feature easy to understand:

```astro
---
interface Props {
  foo: string;
}

interface Slots {
  default?: [Context];
  title?: [];
}
---
```

## Component-side validation

When `Slots` is defined, tooling should validate component-side slot usage.

Example:

```astro
---
interface Slots {
  default: [Context];
}
---
{await Astro.slots.render('default', [{ level: 2 }])}
```

Valid.

Example:

```astro
{await Astro.slots.render('default', [])}
```

Invalid: wrong arity.

Example:

```astro
{await Astro.slots.render('missing', [])}
```

Invalid: undeclared slot name.

If `Slots` is empty:

```astro
---
interface Slots {}
---
```

then any `Astro.slots.render(...)` call is invalid.

## Call-site validation

When `Slots` is defined, tooling should validate:

- whether required slots are present
- whether provided slot names exist
- whether slots with arguments are used in a compatible way

Examples:

### Required default slot

```astro
---
interface Slots {
  default: [Context];
}
---
```

Valid:

```astro
<Component>
  {(c) => <Heading {c}>Title</Heading>}
</Component>
```

Invalid:

```astro
<Component />
```

because required `default` slot is missing.

### Optional named slot

```astro
---
interface Slots {
  title?: [];
}
---
```

Valid:

```astro
<Component>
  <Fragment slot="title">Hello</Fragment>
</Component>
```

Invalid:

```astro
<Component>
  <Fragment slot="unknown">Hello</Fragment>
</Component>
```

because `unknown` is undeclared.

## Backwards compatibility

This proposal is intentionally conservative.

If no `Slots` declaration exists:

- current runtime and typing behavior remains unchanged
- all existing components continue to work

This matches Astro’s current `Props` philosophy:
absence of a type declaration means permissive / unchecked behavior, not “no props allowed”.

## Possible future tooling

This proposal is deliberately limited to type contracts.

Future tooling could build on top of it:

- warnings for ignored slot arguments
- editor hints suggesting function-style slots when arguments exist
- lint rules enforcing consumption of slot arguments for specific components
- quick fixes for missing required slots

These are optional future improvements and not required for the core feature.

## Implementation sketch

This feature appears implementable at the type-generation / language-tooling level.

At a high level:

1. Parse `Slots` declaration from component frontmatter
2. Extract its keys and tuple value types
3. Generate corresponding slot metadata alongside existing prop metadata
4. Use this metadata in:

   - component-side checking for `Astro.slots.render(...)`
   - call-site validation in Astro templates
   - editor/autocomplete support

No runtime behavior change is required.

## Full example

### `Section.astro`

```astro
---
interface Context {
  level: number;
}

interface Props {
  c: Context;
}

interface Slots {
  default: [Context];
}
const p = Astro.props;
---

<section>
  {await Astro.slots.render('default', [{ level: p.c.level + 1 }])}
</section>
```

### Caller

```astro
---
const c = { level: 1 };
---

<Section {c}>
  {(c) => <Heading {c}>Title</Heading>}
</Section>
```

Tooling would infer `c` inside the slot callback as:

```ts
{ level: number }
```

## Benefits

- Better correctness for advanced Astro component systems
- Improved editor tooling and discoverability
- Slot contracts become explicit
- Required/optional slot presence can be validated
- Backwards-compatible and opt-in
- No runtime cost

## Conclusion

Astro already provides a strong model for typed props. Extending that model to slots would make advanced component composition significantly safer and easier to understand, especially in cases where slots carry structured data back to the caller.

This proposal keeps Astro’s current behavior intact by default, while allowing authors to opt into precise slot contracts when needed.If you want, I can also rewrite this into a shorter GitHub issue format instead of a full PR description.
