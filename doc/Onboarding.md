# Onboarding: Astro + Infonodes Portfolio

This document explains how the site works and how Astro is used in this repo.
Assume you are new to Astro.

## What Astro Is (Short Version)

Astro is a static site generator. It builds HTML at build time and ships very
little JavaScript by default. You author pages using `.astro` files that combine
HTML-like templates with a frontmatter script block.

Key ideas:

- File based routing: files in `src/pages` become routes.
- Build time data: content is loaded and rendered when you run `astro build`.
- Components and layouts: reusable UI parts in `src/components` and shared
  page skeletons in `src/layouts`.
- Minimal client JS: only scripts you explicitly include are shipped.

## How Astro Is Used Here

This site is a faithful refactor of a V1 static PHP site. The only intentional
architectural change is data loading: content is now loaded via Astro content
collections at build time and rendered into static HTML.

Astro features used:

- File based routing with dynamic routes (`[lang]`, `[id]`).
- `getStaticPaths()` for prebuilding routes.
- Content collections (`astro:content`) with strict Zod schemas.
- MDX content for long-form body text.
- Layouts and components for shared UI.
- Static asset bundling for client scripts via `?url` imports.
- Static JSON endpoints in `src/pages/data` to feed client JS (projects filter,
  definition tooltips).

Astro features not used:

- Islands / client hydration components.
- Server side rendering.
- API routes beyond build time JSON endpoints.

## Project Layout

Top level folders:

- `src/pages`: all routes. Each file becomes a URL.
- `src/layouts`: shared page wrappers (head, header, footer).
- `src/components`: reusable UI blocks.
- `src/styles`: SCSS styles, one base stylesheet and per page files.
- `src/content`: content collections (data files).
- `src/scripts`: client side scripts loaded per page.
- `public`: static assets (images, icons, CV files).
- `doc`: documentation, V1 audits, and this onboarding guide.

## Routing and URLs

Astro uses file based routing:

- `src/pages/index.astro` -> `/index.html` (root redirect script).
- `src/pages/[lang]/index.astro` -> `/<lang>/index.html`.
- `src/pages/[lang]/projects.html.astro` -> `/<lang>/projects.html`.
- `src/pages/[lang]/projects/[id].html.astro` -> `/<lang>/projects/<id>.html`.
- `src/pages/[lang]/blog.html.astro` -> `/<lang>/blog.html`.
- `src/pages/[lang]/blog/[id].html.astro` -> `/<lang>/blog/<id>.html`.
- `src/pages/[lang]/hobbies.html.astro` -> `/<lang>/hobbies.html`.
- `src/pages/[lang]/hobbies/[id].html.astro` -> `/<lang>/hobbies/<id>.html`.
- `src/pages/[lang]/history.html.astro` -> `/<lang>/history.html`.
- `src/pages/[lang]/but-informatique.html.astro` -> `/<lang>/but-informatique.html`.

Base path:

- The site is served under `/portfolio` (see `astro.config.mjs` and
  `src/lib/routes.ts`).

Dynamic routes:

- Pages with `[lang]` and `[id]` use `getStaticPaths()` to prebuild all
  language and content variants.

## Content Collections (Build Time Data)

Astro content collections live in `src/content` and are defined in
`src/content/config.ts`. This repo uses `type: 'data'` collections where each
entry is a JSON object stored in a `.yaml` file.

Important collections:

- `projects`: project cards + detail content.
- `literature`: blog and hobby entries (kind: `blog` or `passion`).
- `definitions`: glossary terms used in tooltips and tech lists.
- `tags`: tag metadata for filtering.
- `types`: definition categories.
- `history`: timeline entries.
- `textual`: MDX bodies for projects, literature, and history.
- `piano-tiles`: home page tiles.
- `contacts`, `anchors`, `lang`, `meta` (supporting data).

All content is validated by Zod at build time. If the schema does not match,
build fails.

## Infonode Model

The site data is treated as a graph of "infonodes" (see `doc/Content.md`).
Each infonode has:

- `id`, `type`, `role` (`content` or `layout`), `visibility`, and `successors`.

The graph is constructed in `src/lib/infonodes.ts`. This is used for consistent
data modeling and future features, even if the graph is not rendered yet.

## Layouts and Components

Layout:

- `src/layouts/BaseLayout.astro` is the main page wrapper. It loads base SCSS,
  renders `Header` and `Footer`, and injects per page scripts.

Components:

- `Header` and `Footer` match V1 markup and behavior.
- Card components render the reusable V1 cards (projects, literature, definition).
- Lists render sets of cards consistently.
- `TextualContent` renders MDX bodies with the shared inline components.

## Textual Content (MDX)

Long-form content lives in `src/content/textual/<lang>/<kind>/<id>.mdx`
where `kind` is `projects`, `literature`, or `history`.
These files render inside the `#story` sections and the history timeline.

Shared MDX components are available:

- `Def`: definition tooltip link, uses the definitions collection.
- `Link`: normal anchor with V1 `.link` styling.
- `Ref`: inline reference marker (`[1]`) linked to the references list.
- `Image`: Astro native image component (`astro:assets`). Import the image in the MDX file and pass `src={image}`.

Example:

```mdx
<Def id="zig">Zig</Def> is a systems language.
<Link href="https://ziglang.org" external>Official site</Link>.
See <Ref id="1" /> for sources.
```

## Styling

Styles are SCSS and track the V1 styles:

- `src/styles/base.scss` holds global styles and variables.
- Page specific SCSS files are imported by their pages.
- `.lvl` is used for layered backgrounds as in V1.

The build uses `sass` (dev dependency) to compile SCSS.

## Client Side Scripts

Client scripts are regular TypeScript modules in `src/scripts`.
They are loaded in pages using `?url` imports:

```astro
import pageScript from '../../scripts/projects.ts?url';
<BaseLayout pageScript={pageScript} />
```

Scripts:

- `base.ts`: theme switching, tooltips, current year update.
- `index.ts`: piano tile hover animation.
- `projects.ts`: project filtering and sorting UI.
- `history.ts`: timeline scroll animation.

Note: tooltips are attached to dynamic content via
`window.refreshDefinitionTooltips`.

## JSON Endpoints for JS

The V1 site used JSON fetched from `/portfolio/data/*.json`.
Astro recreates this using build time endpoints in `src/pages/data`:

- `src/pages/data/anchors.json.ts`
- `src/pages/data/langs.json.ts`
- `src/pages/data/[lang]/projects.json.ts`
- `src/pages/data/[lang]/tags.json.ts`
- `src/pages/data/[lang]/definitions.json.ts`
- `src/pages/data/[lang]/types.json.ts`
- `src/pages/data/[lang]/lang.json.ts`

These endpoints output JSON at build time and are fetched by client scripts.

## Assets

Static assets live in `public/`:

- Images under `public/img/` (copied from V1).
- CV files under `public/en/` and `public/fr/`.

Assets are referenced using absolute `/portfolio/...` URLs to match V1.

## Build and Dev

Commands:

- `npm run dev`: local dev server.
- `npm run build`: static build.
- `npm run preview`: preview build output.

Output:

- HTML is written to `dist/` and includes the `/portfolio` base path.

## Common Tasks

Add a project:

1. Create a new entry in `src/content/projects/<lang>/<id>.yaml`.
2. Ensure required fields match `src/content/config.ts`.
3. Add the body in `src/content/textual/<lang>/projects/<id>.mdx`.
4. Add images to `public/img/projects/<id>/`.

Add a blog or hobby entry:

1. Add a file in `src/content/literature/<lang>/<id>.yaml`.
2. Set `kind` to `blog` or `passion`.
3. Add the body in `src/content/textual/<lang>/literature/<id>.mdx`.

Add a definition:

1. Add a file in `src/content/definitions/<lang>/<id>.yaml`.
2. Add a type in `src/content/types/<lang>/<id>.yaml` if needed.
3. Add logo/background assets in `public/img/definition/<id>/`.

Add a tag:

1. Add a tag in `src/content/tags/<lang>/<id>.yaml`.
2. Reference it in project tags.

## Debugging Tips

- Build errors are usually schema mismatches in content.
- If client JS breaks, check the JSON endpoints in `src/pages/data`.
- If assets 404, confirm they exist under `public/` with the `/portfolio` path.

## Astro Syntax Basics (Quick Examples)

Frontmatter runs at build time:

```astro
---
const title = "Hello";
---
<h1>{title}</h1>
```

Dynamic routes:

```astro
export async function getStaticPaths() {
  return [{ params: { lang: "fr", id: "example" } }];
}
```

Content collections:

```ts
import { getCollection } from "astro:content";
const entries = await getCollection("projects");
```

This is enough to navigate and extend the site without prior Astro knowledge.
