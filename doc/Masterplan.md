# MASTER PROMPT — V1 CLEAN REFACTOR (ASTRO + INFONODES)

You are refactoring an existing PHP-based static site (V1) into a modern Astro + TypeScript codebase.

This is **not a redesign**.
This is **not an exploration project**.
This is a **faithful refactor** whose primary goal is to replicate V1 behavior and appearance as closely as possible, while introducing a cleaner architecture.

The result must feel like “the same site, rebuilt sanely”.

## Primary objective

Reimplement the V1 site using:

- Astro
- strict TypeScript
- content collections
- a clean “infonode” data model

**All visible features, behaviors, layouts, and interactions from V1 must be preserved unless explicitly stated otherwise.**

## Authoritative references (read these first)

Treat the following as source-of-truth documentation:

1. `doc/V1.md`
   Factual audit of the existing PHP site: layout, typography, colors, components, interactions, quirks.

2. `doc/Content.md`
   Defines the infonode concept, directed graph semantics, roles, visibility, Card vs Detail rendering.

3. `doc/Pages.md`
   Lists pages and their content/behavior. Implement only pages that were in the V1.

4. `doc/Display.md`
   UI and interaction invariants (hover behavior, accent usage, reduced motion rules, link behavior).

5. The original V1 PHP codebase: `doc/v1/`
   Use it only to clarify ambiguities. If the code contradicts `V1.md`, signal it to the user and trust the code.

## Core architectural change (the only one)

The **only intentional architectural change** is **how data is represented and loaded**.

### Old

- JSON files
- PHP templates
- ad-hoc data access

### New

- Astro content collections
- Infonodes (typed, directed, build-time)
- Strict TypeScript types everywhere

Everything else should behave the same.

## Infonode model (mandatory)

- Every piece of information is an **infonode**.
- Infonodes are **typed**, **directed**, and **build-time only**.
- Each infonode has:

  - `id`
  - `type` (string)
  - `role` (`content` or `layout`)
  - `visibility` (`public` or `private`)
  - a `successors` iterable (outgoing links)
- Relationships may be authored as intuitive properties (e.g. `image`, `gallery`, `backgroundImage`) but **must be projected into `successors`** so the graph is complete.
- Cards always exist; Detail views exist only where V1 had pages.

Do **not** invent new infonode types beyond those required to replicate V1.

Consider that the Infonode system was designed by an user who doesn't know how Astro work. You may run slight adaptations to adapt it to the Astro content model, but preserve the original invariants.

## Strict TypeScript requirements (non-negotiable)

- Enable `strict: true`.
- **No `any`.**
- **No `as` casts** unless absolutely unavoidable and documented.
- Prefer explicit interfaces and discriminated unions.
- Content collection schemas must be strongly typed.
- Fail the build on invalid content.

If a type problem arises:

- fix the model
- do not silence the compiler

## Styling and behavior fidelity

The site must visually and behaviorally match V1:

From `doc/V1.md` and `doc/Display.md`, preserve at minimum:

- Font stack (`Ubuntu, system-ui`)
- Base font size (`1.1em`)
- Accent color `#a66144`
- Light/dark theme mechanism
- `.lvl` layered backgrounds
- Hover scaling behavior for interactive elements
- Reduced-motion handling
- Hypertext vs button-like link distinction
- Background images and opacity behavior
- Breakpoints and general responsive behavior

You may modernize CSS structure, but **not visual outcomes**.

## Pages to implement (no more, no less)

Implement exactly the pages defined in `doc/Pages.md`, including:

- Home
- Projects
- Blog
- Hobbies
- History
- BUT Informatique

Each page must:

- replicate V1 layout and behavior
- be built as an aggregate of infonodes
- reuse Card rendering where applicable

## Feature scope limits

### Explicitly allowed

- Cleaning up layout code
- Clear infonode types and abstractions designed intentionally
- SOLID principles
- Improving accessibility where it does not change behavior
- Simplifying logic while preserving output
- Replacing PHP helpers with Astro/TS equivalents

### Explicitly forbidden

- New features not present in V1
- Yggdrasil graph visualization (unless V1 already had it)
- Global search (unless V1 already had it)
- Design reinterpretation
- Rewriting content or inventing data

This is a **refactor**, not a platform.

## Execution strategy

You may internally plan the work in phases, but you must:

- implement incrementally
- keep changes focused
- avoid sweeping rewrites that obscure intent

After completing the implementation, provide:

1. A summary of what was reimplemented
2. A list of V1 features covered
3. Any V1 behaviors that could not be replicated exactly (with reasons)

If you encounter ambiguity or missing information that affects correctness:

- STOP.
- explain the issue
- propose 2–3 reasonable options
- wait for direction

Do not guess.
