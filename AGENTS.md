# AGENTS.md

## Project intent

Build a clean, performant, accessible, semantic portfolio site in Astro. The site is content-driven and modeled as a directed graph of "infonodes".

## Non-goals (v1)

- No backend database
- No auth/admin UI
- No Tailwind or component libraries unless explicitly requested
- No heavy client-side frameworks except for isolated islands when required
- No Yggdrasil graph visualization until it is explicitly scheduled

## Architecture constraints

- Astro project, TypeScript.
- Content is loaded at build time.
- Infonodes are sourced from YAML/MD/MDX data files.
- Infonodes expose:
  - Card render (always)
  - Detail render (optional)
  - successors/outgoing links (directed)
- Relationships may be authored as explicit properties (e.g. mainMedia, gallery) and projected into `successors`.

## Code quality

- Prefer simple, explicit code over clever abstractions.
- No “framework within the framework”.
- Do not introduce a dependency unless necessary; justify each new dependency in the change description.
- Keep components small and semantic.
- Strict typescript, strict types, avoid type assertions unless strictly necessary.

## When blocked

If requirements are ambiguous, contradictory, or missing: STOP. Explain the issue and propose options. Do not guess.

## Output requirements per sprint

- Implement only the sprint scope.
- Provide a short summary of changes and a checklist of acceptance criteria status.
