# Master Plan: Portfolio v2 (Astro, infonodes, Yggdrasil)

## 0. Scope and non-goals

### Core goal

Build a clean, performant, accessible, semantic portfolio site that is “contentful” and narrative-driven, centered on a directed graph of **infonodes** (Yggdrasil).

### Non-goals (explicit)

- No backend, no database, no runtime server requirements (static deploy friendly).
- No “design system rebuild” or brand-new look. Preserve V1 look and behavior as closely as practical.  
- No generating real content data (only generate examples/placeholders so I can author content later).
- Optional features are optional; do not force them into the architecture unless they are immediately beneficial.

## 1. Hard invariants (laws)

### 1.1 Infonode graph model

- The graph is **directed**. Talk about edges as `A --> B`, with B a successor of A and A a predecessor of B.
- Every infonode has:

  - a string type (e.g. `Project`, `History`, `Page`)
  - a role: `content` or `layout`
  - a visibility: `public` or `private`
  - a `successors` iterable/list (outgoing links), derived from “relationship properties” and/or explicit successor lists.
- `layout` infonodes **may not be successors** (no edges should target them). They exist as programmed arrangement nodes.
- `public` infonodes appear in Yggdrasil and global search; `private` infonodes do not.
- Each infonode can render itself:

  - as a **Card** (always available) and optionally
  - as a **Detail** `<main>` (may not exist for some types).

### 1.2 Property-authored relationships

- Authoring should be intuitive in YAML: special relationships like `mainMedia`, `gallery`, `image`, `backgroundImage` are stored as properties.
- The infonode’s `successors` iterable must include those referenced infonodes so the Yggdrasil renderer can traverse the complete graph without knowing per-type property names.

### 1.3 Textual content

- “Textual” is semantic rich text that can include emphasis, images/figures, and definition tooltips; effectively HTML, but without styling baked in.
- Textual is localized (FR/EN initially) and may be implemented with MDX.

### 1.4 Display invariants

These must hold everywhere (unless `prefers-reduced-motion` prevents it):

- Cards/pages can have background images rendered with reduced opacity.
- Clickable “anchor-like UI elements” grow on hover and gain an accent background (accent = interactivity signal), except:

  - basic hypertext links (normal underlined hover behavior)
  - users with reduced motion preferences.
- Abbreviations use `<abbr>`.
- `target="_blank"` is reserved to hypertext links (no styled button-links), and show an “arrow glyph” and underline on hover.
- Preserve V1 style: colors, sizes, fonts, layout.

### 1.5 V1 style fidelity targets

From V1 audit, preserve at minimum:

- Font stack: `Ubuntu, system-ui`
- Base font size: `:root { font-size: 1.1em; }`
- Accent: `#a66144` (and its fg `#ffffff`)
- Theme model with `data-theme` and `color-scheme`
- Level backgrounds with `.lvl` style and progressive shading
- Breakpoints around 570px / 700px and timeline breakpoints (approximate matching is OK, behavior must be comparable).
- Core component interaction behaviors (hover states, accent background usage).  

## 2. Site surface: pages and routes

Implement the following pages (navbar order matters):

1. Home
2. Projects
3. Blog
4. Hobbies
5. History
6. Yggdrasil
7. Search
   Plus:

- BUT Informatique page (not necessarily in navbar unless you want it there; spec requires it exist).

## 3. Architecture strategy (Codex may choose within these boundaries)

### 3.1 Astro usage

- Use Astro + TypeScript.
- Prefer static generation and build-time content loading.
- Use “islands” only when interactivity is needed (filters, Yggdrasil pan/zoom, tooltips).

### 3.2 Content storage

- Source infonode data from YAML + MDX (and media files), decoupled from generation logic.
- Localized content is grouped per language (FR/EN).
- Do not auto-generate real content; only create minimal example infonodes to demonstrate wiring.

### 3.3 Rendering layering

- Infonode model layer: types, loading, validation, linking.
- Rendering layer:

  - Card renderer per infonode type (consistent card shell)
  - Detail renderer per infonode type (consistent detail shell)
  - Shared layout components (Header, Footer, Page shells)
- Pages are “views/aggregates” and should reuse CardList rendering from infonodes when possible.

### 3.4 Interactivity

- Minimal JS, progressive enhancement.
- Respect `prefers-reduced-motion` for hover scaling and animations.

## 4. Implementation phases (single plan, phased execution)

Codex can execute this as one run, but must treat each phase as a checkpoint with its own acceptance tests.

### Phase 1: Skeleton + V1 design tokens

Deliverables:

- Global layout with header/footer structure consistent with V1.
- CSS variables and base typography matching V1.
- Theme switch framework (light/dark) with room for future themes.  

Acceptance tests:

- The site renders with `Ubuntu, system-ui` and base size 1.1em.
- Light and dark themes exist; switching updates `data-theme` and `color-scheme`.
- Accent color is `#a66144` and is used to signal interactivity.
- `.lvl` background layering exists and nested `.lvl` scopes visibly step brightness similar to V1.
- Hover scaling:

  - works on clickable “button-like” anchors
  - is disabled under `prefers-reduced-motion`.  
- Hypertext links:

  - underline on hover
  - use accent color
  - `target="_blank"` links show arrow glyph and remain “hypertexty,” not buttony.  
- Header contains navbar links (placeholders ok) and theme/language controls (can be minimal at first).

### Phase 2: Infonode core model + loaders

Deliverables:

- Typed infonode model with role/visibility/type, `successors`, Card/Detail render hooks.
- Load infonodes from YAML (and MDX where relevant).
- Validation: detect missing referenced ids, invalid types, etc.
- Localization: ability to build/render for FR and EN.

Acceptance tests:

- All infonodes have role+visibility; role is either `content` or `layout`.
- `layout` nodes cannot appear as a successor target (validator catches this).
- `public` vs `private` affects whether a node appears in global search/Yggdrasil index.
- Successor projection:

  - for an infonode with relationship properties (e.g. `image`, `backgroundImage`, `mainMedia`, `gallery`), those referenced nodes appear in `successors`.
- Build fails fast and clearly on:

  - missing referenced ids
  - duplicate ids
  - invalid YAML schema.

### Phase 3: Core content types (v1 minimal but complete)

Implement the type set described in `docs/Content.md`, at minimum:

- `Project` (public, detail)
- `Literature` (public, detail; kind: blog/passion/story; chapters)
- `History` (public, detail; nesting supported conceptually)
- `Definition` (public, card/tooltip; no detail)
- `Image` (private, no detail; modal on click in contexts that want it)
- `Document` (public, card; opens viewer in new tab)
- `Connector` (private)
- `Tag` (private)
- `PianoTile` (private)
- Layout types: `Page`, `Header`, `Footer` (as programmed layout infonodes).

Acceptance tests:

- Each type has a Card renderer.
- Types with detail rendering (`Project`, `Literature`, `History`, `Page`) provide a detail `<main>` that is semantically structured (headings, sections).
- `Definition` cards render synopsis and (optionally) an external “trusted wiki” connector rendered at bottom if present.
- `Image` usage:

  - `<img>` has `alt`
  - optional caption appears in `<figcaption>`
  - click opens modal (where used as a figure).
- `Document` usage:

  - PDF card opens a viewer in a new tab
  - video card renders video with controls.
- `Connector` cards are never treated as “pages,” they’re external links.

### Phase 4: Routing and detail pages

Deliverables:

- Route scheme for detail pages (slug/id based) for infonodes with detail rendering.
- “See in Yggdrasil” link on every detail page, opening Yggdrasil with the node selected.

Acceptance tests:

- Clicking a Card for a detail-capable infonode navigates to its detail page.
- Cards for infonodes without detail are not “fake clickable” (no dead links).
- Every detail page contains a working “See in Yggdrasil” link that:

  - navigates to `/yggdrasil?selected=<id>` (or equivalent)
  - highlights the node.

### Phase 5: Implement pages per `docs/Pages.md`

Deliverables:

- All required pages exist and match their content requirements.

Acceptance tests per page:

Home (navbar)

- Shows, top to bottom:

  1. Piano tiles
  2. Definition of yourself (intro + picture)
  3. List of underway projects
  4. “All projects” linkbutton
  5. Contact card
- Piano tiles match V1 feel: image tiles with caption overlay on hover and hover scaling (respect reduced motion).  

Projects (navbar)

- Renders list of `Project` cards.
- Filter UI:

  - by project title text
  - by tags
  - by technology Definitions.
- Filtering is incremental and fast (no full page reload required).
- Filter UI is accessible:

  - keyboard usable
  - clear focus states.

Blog (navbar)

- Lists `Literature` of kind `blog` (and potentially `story/passion` if you decide, but spec separates hobbies).
- Filter by title, kind/type, tags.
- Hobbies are not mixed into Blog results.

Hobbies (navbar)

- Lists hobby articles (implementation choice: either `Literature(kind=passion/story)` tagged as hobby, or a distinct filter; must match your semantics).
- Content is presentationally similar to Blog but clearly separated by intent.

History (navbar)

- Timeline view of root history items (items not linked to by another history item), newest at top.
- Nested histories:

  - larger histories contain smaller ones
  - still appear on the same timeline (no separate sub-timelines).

Yggdrasil (navbar)

- Graph rendering of all `public` infonodes as clickable cards; supports pan and zoom.
- Edges are displayed.
- Statistics displayed:

  - total number of infonodes
  - number by type.
- Optional but desirable:

  - filter by infonode type
  - search bar that hides non-matching nodes.

Search (navbar)

- Global search across Yggdrasil (public infonodes only).
- Supports keyword and tags.
- Displays results as cards.
- Updates incrementally as you type (debounced, accessible).

BUT Informatique

- Reproduce the V1 BUT page behavior and structure (accordion + grouping toggle).
- Projects are tagged per BUT year: `BUT1`, `BUT2`, `BUT3`.
- Accordion structure supports:

  - Year grouping: year → competence → project cards
  - Competence grouping: competence → year → project cards
- A switch button toggles grouping mode.
- Accordion is keyboard accessible and supports reduced-motion.

### Phase 6: Textual (MDX) embedding features

Deliverables:

- MDX pipeline for Textual.
- Components to embed:

  - Definition tooltip triggers
  - Media figures
  - Maybe connectors/citations, if required by your content.  

Acceptance tests:

- Textual content renders with page typography (no inline styling required).
- Definition tooltip behavior exists (can be implemented without reproducing every V1 timing quirk, but must be usable and accessible). V1 shows/hides with delays, stacked z-index behavior.
- Definition tooltip does not break layout on small screens.
- `<abbr>` appears in HTML output for abbreviations.

### Phase 7: Polishing, parity, and deployment

Deliverables:

- Responsiveness parity with V1 (pragmatic match).
- Lighthouse-friendly perf/accessibility.
- CI/CD for static hosting.

Acceptance tests:

- Responsive behavior roughly matches V1 breakpoints and remains readable at mobile widths.
- `prefers-reduced-motion` disables hover scaling/animations.  
- No page requires JS to display basic content (filters/graph can enhance, but lists must render server-side/build-time).
- Build output is static deployable (GitHub Pages compatible).

## 5. Optional features (only if immediately beneficial)

From `docs/Optional.md`:

- Typographical normalization (quotes/apostrophes by language).
- Cohere/Mistral chat integration fed by infonode export.

Acceptance criteria if implemented:

- Typo normalization:

  - Input remains “plain quotes” in source
  - Output uses locale-appropriate typography per language
  - No broken Markdown/MDX semantics.
- Chat integration:

  - strictly opt-in
  - does not affect static site core
  - data export is deterministic and versioned.

## 6. Codex execution rules (so it doesn’t go feral)

These are instructions you put into `AGENTS.md` (or the prompt wrapper) so Codex can make choices safely:

- Implement phases in order.
- After each phase:

  - summarize what changed
  - list which acceptance tests are satisfied
  - list any ambiguity found and stop if it blocks correctness
- Do not invent new infonode types beyond `docs/Content.md`.
- Do not generate real infonode data (examples only).
- If V1 style is unclear, copy the closest behavior from `docs/V1.md` instead of redesigning.

## 7. “What the site should feel like” (design intent, grounded)

- It should read like a blog: sane line length (V1 uses ~60ch), generous vertical rhythm, headings that feel like sections not banners.
- Interactivity should be obvious and consistent: accent color + hover scale, except when motion is reduced.
- Background imagery should be present but subtle: “texture,” not “carousel.”
- The site is a story told through a graph: every detail page points back to the graph view.

## 8. Hosting

Site source hosted on GitHub.

Site will be hosted on github pages. The V1 used to generate to the gh-page branch.

Generation can be local for now (dist folder or whatever astro idiomatically supports)
