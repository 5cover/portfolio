# Pages

(NavBar) indicates the pages are to be included in the navbar, in this orderMore detail on each page in [Pages.md](./Pages.md).

## Locale routing

- Default locale is served from `src/pages/*` (no locale prefix in URLs).
- Other locales live under `src/pages/<locale>/*` (e.g. `src/pages/en`).
- Use Astro i18n helpers to build links; do not hardcode locale prefixes.

## (NavBar) Home

from top to bottom

- Piano tiles
- Definition: of myself (intro + picture)
- List of underway projects
- All my projects linkbutton
- Contact card

## (NavBar) Projects

Filter on project title and tags and technology Definitions

## (NavBar) Blog

Filter on article title, type, tags

Hobbies not shown or selectable, they belong in the Hobbies page, even if they are the same content, the semantics differ. Hobbies are what i want to share, and blogs are what is worth knowing or sharing. Mixing the two could make me look arrogant. Putting a Zig essay on the same level as my GregTech playthrough

## (NavBar) Hobbies

The Hobbies page lists my hobby articles

They give me personality. i'm not just a machine that produces but a playful individual.

i could add stuff about tf2, etc

## (NavBar) History

Timeline view of root history items (history items that are not linked to by any another history items), newest is top, oldest is bottom

since histories can be recursive, make it so larger histories contain smaller one, though they are still on the same timeline (no subtimelines)

## (NavBar) Yggdrasil

A graph rendering of all public infonode as clickable cards. Edges are displayed, the view can be panned and zoomed. Statistics are displayed with the total number of infonodes and the number of indonodes of each type.

Optional: filters on infonode type and a search bar that hide non matching infonodes.

## (NavBar) Search

A global search page that searches for contents in Yggdrasil by text keywords and tags. displays results as cards. updates incrementally.

## BUT Informatique

we need to represent

- personnalité
- goûts
- coméptences du BUT
- mes compétences avancées
- ce que j'ai acquis durant le BUT?

reproduire la page du BUT de la V1

- projects will be tagged per year of the BUT they were made in (BUT1, BUT2, BUT3)

vue en accordéon dépliable

- BUT 1ère année (2023-2024)
  - Compétence 1. Réaliser
    - ...cartes de projets ayant le tab BUT1 et le tag (BUT) Réaliser
  - Compétence 2. Optimiser
    - ...cartes de projets ayant le tab BUT1 et le tag (BUT) Optimiser
- BUT 2ème année (2024-2025)
  - ...
- BUT 3ème année (2025-2026)
  - ...

a switch button above the accordion to toggle between "Group by year" or "Group by competence" to select between grouping by year or competence at the first level of the accordion.
