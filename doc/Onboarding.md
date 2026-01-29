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

- File based routing with i18n locale folders and dynamic routes (`[id]`).
- `getStaticPaths()` for prebuilding routes.
- Content collections (`astro:content`) with strict Zod schemas.
- MDX content for long-form body text.
- Layouts and components for shared UI.
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

Astro uses file based routing (with `routing.prefixDefaultLocale: false`):

- `src/pages/index.astro` -> `/` (default locale).
- `src/pages/en/index.astro` -> `/en/`.
- `src/pages/projects.html.astro` -> `/projects.html`.
- `src/pages/en/projects.html.astro` -> `/en/projects.html`.
- `src/pages/projects/[id].html.astro` -> `/projects/<id>.html`.
- `src/pages/en/projects/[id].html.astro` -> `/en/projects/<id>.html`.
- `src/pages/[section].html.astro` -> `/blog.html` and `/hobbies.html`.
- `src/pages/en/[section].html.astro` -> `/en/blog.html` and `/en/hobbies.html`.
- `src/pages/blog/[id].html.astro` -> `/blog/<id>.html`.
- `src/pages/en/blog/[id].html.astro` -> `/en/blog/<id>.html`.
- `src/pages/hobbies/[id].html.astro` -> `/hobbies/<id>.html`.
- `src/pages/en/hobbies/[id].html.astro` -> `/en/hobbies/<id>.html`.
- `src/pages/history.html.astro` -> `/history.html`.
- `src/pages/en/history.html.astro` -> `/en/history.html`.
- `src/pages/history/[id].html.astro` -> `/history/<id>.html`.
- `src/pages/en/history/[id].html.astro` -> `/en/history/<id>.html`.
- `src/pages/but-informatique.html.astro` -> `/but-informatique.html` (redirects to history).
- `src/pages/en/but-informatique.html.astro` -> `/en/but-informatique.html`.

Base path:

- The site is served under `/portfolio` (see `astro.config.mjs`).

Dynamic routes:

- Pages with `[id]` use `getStaticPaths()` to prebuild all content variants.
- Locale variants are handled by Astro i18n routing, not by `[lang]` params.

## Content Collections (Build Time Data)

Astro content collections live in `src/content` and are defined in `src/content/collections.ts`. This repo uses `type: 'data'` collections where each entry is a JSON object stored in a `.yaml` file. For most collections, there is one file per infonode (no per-language duplication) and localized strings are stored as `{ en: "...", fr: "..." }`.
Important collections:

- `projects`: project cards + detail content (localized fields inline).
- `literature`: blog and hobby entries (kind: `blog` or `passion`, localized fields inline).
- `definitions`: glossary terms used in tooltips and tech lists (localized fields inline).
- `tags`: tag metadata for filtering (localized fields inline).
- `types`: definition categories (localized fields inline).
- `history`: timeline entries (localized fields inline, body in MDX).
- `textual`: MDX bodies for projects, literature, and history.
- `piano-tiles`: home page tiles.
- `contacts`, `anchors` (supporting data).

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

MDX components are available:

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

## Linking and References in Textual Content

There are three ways to reference external pages from MDX. Use the one that matches intent.

1) **Definitions (`<Def>`)**  
Use when the term is in the glossary and you want the hover tooltip card.

```mdx
<Def id="zig">Zig</Def> is a systems language.
```

2) **External links (`<Link>`)**  
Use for normal outbound links that should open in a new tab without adding a citation in the references list.

```mdx
See the <Link href="https://ziglang.org" external>official website</Link>.
```

3) **References (`<Ref>`)**  
Use for formal citations that should appear in the references list at the bottom of the page.
The `[N]` marker is rendered inline and links to the matching item in the references list.

```mdx
This claim is documented in the spec<Ref id="1" />.
```

When you use `<Ref id="1" />`, ensure the corresponding item exists in the page references list
for that infonode (the YAML `references` array). The list item renders the icon, full title, and backlink.

## Styling

Styles are SCSS and track the V1 styles:

- `src/styles/base.scss` holds global styles and variables.
- Page specific SCSS files are imported by their pages.
- `.lvl` is used for layered backgrounds as in V1.

The build uses `sass` (dev dependency) to compile SCSS.

## Client Side Scripts

Client scripts are regular TypeScript modules in `src/scripts`.

```astro
<BaseLayout pageScript='../../scripts/projects.ts' />
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
- `src/pages/data/projects.json.ts`
- `src/pages/data/tags.json.ts`
- `src/pages/data/definitions.json.ts`
- `src/pages/data/types.json.ts`
- `src/pages/en/data/anchors.json.ts`
- `src/pages/en/data/projects.json.ts`
- `src/pages/en/data/tags.json.ts`
- `src/pages/en/data/definitions.json.ts`
- `src/pages/en/data/types.json.ts`

These endpoints output JSON at build time and are fetched by client scripts.

## Adding a Locale

1. Add the locale code to `i18n.locales` in `astro.config.mjs` and decide on `defaultLocale`.
2. Create `src/pages/<locale>/` and duplicate locale-specific pages.
3. Add MDX bodies in `src/content/textual/<locale>/<kind>/<id>.mdx`.
4. Add locale data endpoints under `src/pages/<locale>/data/`.
5. Update locale labels in `src/i18n/site.ts`.

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

1. Create a new entry in `src/content/projects/<id>.yaml`.
2. Fill localized fields as `{ en: \"...\", fr: \"...\" }`.
3. Add the body in `src/content/textual/<lang>/projects/<id>.mdx`.
4. Add images to `public/img/projects/<id>/`.

Add a blog or hobby entry:

1. Add a file in `src/content/literature/<id>.yaml`.
2. Set `kind` to `blog` or `passion`.
3. Fill localized fields as `{ en: \"...\", fr: \"...\" }`.
4. Add the body in `src/content/textual/<lang>/literature/<id>.mdx`.

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
