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

## tandardized MDX content. Currently markup is everwyhere.  Image components

turn HTML-as mdx quick&dirty content into proper markdown.

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

## typed modular css

typed classes

## Dialogs -- go into more details about the philosophy, rationale, arch and design

## A "see all {infonode type}" that goes back to the list of cards in each detail page

## formalize background image patterns

and use it everywhere consistently?

unless it's a v1 remnant and we can do it better now

## fix clientside scripts

and find a solution for defs

## resolve todos

## infonode content model

collections as an implementation detail
`<Card>`, `<Detail>`, and `<CardList>` components. switch on infonode type. of property. cardlist determines the list class from the type.
