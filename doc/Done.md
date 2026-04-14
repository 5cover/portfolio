# Done

## Fix Markdown def logo size

## Fix footer icon theming

## Idiomatic localization?

## Fallback to english strings when fr not specified but with a lang=en div

avoid duplicating

preserve accessibility

solution: simply import the original and wrap it in div lang

## Read and implement prof requirements

Les requirements se centrent autour du BUT informatique

## remove useless types

## rename collections to singular

## Cleanup types

## convert all yaml to json

## i18n

switch default language to en

deduplicate logic from pages

## remove locale props in preact

## standardize copy usage

remove tsx stuff.

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
