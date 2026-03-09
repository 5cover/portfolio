# Scratch

LIFO.

## PSC syntax highlighting

Noan Perrot did one

## Follow Astro audit recommendations in every page

## Trégoria: Galerie

## Towrite

- portfolio.mdx
- s2-05.mdx
- s2-06.mdx
- sae3.mdx (complete)
- history items

## Fixes

- Vertical search bar
- Remove background/border on logos in project cards
- cleanup but informatique: proper title margin, place the introductory paragraph below the def and in normal size, remove useless flexes
- fix but informatique badge v alignment in tags
- fix list padding in textual content -> through a list component or maybe a plugin that adds classes so i can keep writing prose but it doesn't have to be unstyled?

## Samedi

- EN translation

## Vendrdi

- Hosting
- send URL to prof
- engie internship and alternance textualsspecif
- clickable history items

## Use YAML instead of JSON sytax in yaml file

we can probably automate it.

Use proper dates for start and end instead of strings

## A blog about the Scratch & Done method

LIFO task lists

solo working, complements kanban words, serializes technical thought.

represent's each person "stack trace of though". not only tasks, but maybe ideas and things to explore once the stuff below is taken care of.

## Formalize the desired tone for AI blog-writing

(recover it from the web chat (section stuff))

## Formalize context

enforce correctness, specify our data model, avoid repetition of translations

## Remove content from `<Def>` components

There is no need to put the title inside the Def tags every time since the def knows the title so Def can become a contentless component like img.

## More projects

more bUT3/but2 projects, personal projects

## ~~Read and implement prof requirements~~

Les requirements se centrent autour du BUT informatique

## Clickable history items

Stage & alternance

We make history items clickable, they lead to a long-form textual body (detail render)

Then we can go in depth about the internship and the apprenticeship

## ~~Standardized MDX content~~. Currently markup is everwyhere. Image components

## Install linters and stuff

stylelint, eslint etc specific astro linting /formatting tools?

## Image optimization

move them away from content

can we do optimization once?

see astro docs

## Section component

Automatically generate heading levels

reset heading styles sizes etc. the number is now arbitrary

## compute history year and sort by date span

use yaml native dates?

## typed css

classes

## remove formatting copy

fmtX

with C style

it's outdated

what's the modern idiomatic way?

## Dialogs -- go into more details about the philosophy, rationale, arch and design

## fix clientside scripts and reuse cards

and find a solution for defs

## A "see all {infonode type}" that goes back to the list of cards in each detail page

## @ in imports instead of relative everuwhere

## infonode content model

collections as an implementation detail
unified `<Infonode>` component.

## problem

I don't like having to deal with astro and preact incompatibilities.

going full preact is possible, maybe i should just do that.

look, i'm tired. the project is stagnating, time is slipping by, and i'm starting to hate this project because of what Astro cannot do.

If i switch to Preact, i give up on astro useful features : slots, client directives, many convenience feature like class:list, `<style>` and `<script>` parsing and processing, image optimization, builtin components like `<Image>`. i don't know how much of this Preact tooling can replicate.

If i keep using astro, I give up on contexts, meaning my Section and Heading system is not usable unless i pass levels explicitly everywhere.

which ... well, i don't want to do without. without it, how am i supposed to know at which heading level to put the title of a definition tooltip card, for instance, since it may appear anywhere? it's just not... acceptable. dammit.

I don't know what to do. Keep using astro? Switch to preact entirely? Switch to another SSG platform? Feels like i'm spending my time trying to stitch frameworks rather than making a site, and it's frankly annoying.

how does everyone else do it.

how can you live without relative headings. the more i think about headings the more i realize in the v1 my levels were incorrect or just accidentally correct. which is the worse kind of correct.

Section/Heading is not just about heading hierarchies, outline and semantics. it's about styling. i already have a .lvl .lvl .lvl with 8% themed color steps generated in SASS. i could use Section instead and tie colors to structure.

Section would represent a semantic depth break.

Solution: keep Astro, pass context prop explicitly. use preact only when necessary.

regarding another thing i had started making before, i guess i could call this initiative object oriented components

basically components/infonodes/{type}/{card,detail}.astro and related module-based CSS instead of components/{LiteratureCard, ProjectCard} etc and global css

the file organization in itself isn't bad though it will require import discipline since it fills in the filename from the default export, we don't want ominous "Card" imports everywhere

astro philosophy is 1 component = 1 file

hierarchical directories make module css cleaner
assuming it works (we'll have to test that)

what we could do is one Card component, one Link component, one Detail component

that accepts a localized "infonode" which type is encoded as a string (no more `Entry<LocalizedItem<''>>` mess)
