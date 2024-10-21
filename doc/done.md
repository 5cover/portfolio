# Done

## New Project field: background image

Represents the environment of a project. Background with low opacity of project cards.

## New Project field: end date

Optional. If missing then project underway.

For done projects : we will show "Terminé - {START_DATE}/{END_DATE}"

For underway projects : "En cours - depuis {START_DATE}"

## Figma: components

Create components for

- Header
- Footer
- Project card
- Hovered project

## Contacts

LinkedIn, HelloWork...

Remove phone number (since i don't answer phone calls anyway)

## Underline current page in navbar

Would be nice

except home page since it is already bigger.

when nothing is underlined:

- we're on the home page
- we're on an page that is not on the navbar (the only one as of now are individual project pages)

## choose theme based on user preferences

with a media quary

## Definition test page

just a page with all the definitions to make sure they look right.

keep it in prod, nice easter egg.

## switch button

redo it. the current one is slightly innacurrate plus it doesnt support tab navigation

## Piano tiles wave on page load

CTA for hover.

Don't show text, just scale(1.05).

Creates some liveliness.

Left to right.

## JSON schemas

To avoid stupid errors. They look easy enough.

- Tags not present and empty tags array are considered equivalent

## Color scheme

Something mostly neutral but with some hue to give some expressivity.

## Smooth scrolling

scroll-behavior

## Référencer les compétences du BUT

Create tags for it. On hover will link the an article

## Fetch SVGS from PHP instead of inlining them in PHTML

Avoid all this duplication

## PHP generate project list

Generate project list dynamically from PHP

## .text-icon class

Intended to size an img or svg as the size of the text next to it. Just put height: 1lh and width: auto.

## Projects page

Have ai explain me how to do it

### Search UI html & css

### Search logic js

## Generate indivudal project pages

Soo, how will this work?

I can't really have a PHP that will generate every page. That would break the THIS_PAGE_NAME system.

Or maybe not? The filename doesn't define THIS_PAGE_NAME, the argument does. So if I parse the JSON from BASH and pass the project ID as the page name... This is weird.

The flaw in my design is that each PHP matches 1 page, whose name is passed as a single argument to the script.

Soo.. Instead i should just set the page name explicitly at the start of every script, and expose it as function and not a constant?

## project.scss

## Préparer l'oral

Un truc rapide, juste un plan

## Parcours

- Lycée
- BUT informatique
- Projets?

## Express translations as JSON

Right now this is a mess.

~~No need for lang class, just have an helper function that reads the JSON file in object mode.~~

Yes need for lang class, because translation is sometimes associated with more complex logic (*fmtTitle*...). Although i could use format strings for this, provided PHP has support for this. Look it up in the documentation I guess.

## Définir mes amis

Ajouter une définition pour les coéquipiers.

Logo = leur tête

Plus d'informations = leur portfolio

## Do not copy data jsons

It creates confusion. Once i modified the one in portfolio/, thinking i was on the one in main/. My changes were overwritten when i generated.

## Link to iut lannion website in parcours

and other relevant links as well, to connect myself to my parcours.

## Target blank et rel

`target="_blank" rel="noopener noreferrer" rel="noopener noreferrer"`

## Fix footer github logo

Currently it takes the full viewport width. what?

## Fix links not being the correct zindex in project cards

## Fix abusive absolute usage

- Project last updated
- Footer

## Definition tooltip redesign

Current problem: its hard to access the tooltip content with the mouse, because it disappears quickly when you leave the trigger.

Possible solutions:

### Give time before the tooltip disappears

Why not but it will feel sluggish when you **don't** want the tooltip.

### ~~No more tooltip, use an expander instead~~

You click on it to expand it over the content.

No more hover

This solves also the responsivity problem causes by hover interactions.

So how does it work? Because i still want to show the link as clickable directly, without going through the preview.

Well, we could show a small arrow on the right of the link. That's the one you'll click on the access the preview. But it may be quite small.

### What wikipedia does

They:

- Show the tooltip right below the trigger. The mouse can easily move to it without making the tooltip go away
- The tooltip is aligned with the current cursor position. It seems to be independent of the DOM and positioned absolutely in JS. I should do that too
- The whole tooltip is also a link
- The tooltip does not contain links or other content. It only contains text and images.

## Amérorations des pages de projet

### Separate links and references

Les références numérotées (style académiques), != des links (point d'ancrage du projet : ses connexions au monde : github, article, ...)

### Links

Link to a page i'm responsible for (github repo, steam workshop page...) or that is directly related to the project (article ccm...).

### Reference

Link to a resource that has helped in the realization or research of the project but that is not related to the project (wikipedia articles, online books, tutorial, resources...)

### Plus de détails sur les liens et les technologies

Au lieu d'afficher que des logos, on affiche tout le contenu des liens et des technologies.

### Section coéquipiers

Présente les coéquipiers pour le projet, leur photo et un lien vers leur portfolio.

(non affiché si je suis tout seul)

### Blockquote left border

### Project gallery types

for the current iframes: use shorter code, see for markdown

iframe should be last resort

## Fix CSS problems

- Arrière plan des projets dans la page de but
- Liens z-index dans les cartes de projet.
- responsivité (tester sur mobile)
- arrière plan pour le pre > code (voir markdown css), samp et kbd
- taille des images dans story (voir psdc)

## improve .text-icon

replace by class on the container element

display flex align items center

renamed to *.iconed-text*

## Changer la couleur de scrollbar

Suggéré par Malo &mdash; moins casser le color scheme &mdash; utiliser la couleur d'accent.

Finalement non. Il vaut mieux respecter l'agent utilisateur.

Finalement si. La scrollbar est vraiment moche sur Chromium.

## Page BUT Informatique

Présente chaque compétence et la tête de liste des projets associés (entre 4 et 6)

## parse project dates

would allow to show and sort by project duration

also (why not) show projects on a calendar

### update date format in javascript

do same as php

it's annoying to have the same logic expressed in 2 languages

## Put colors in separate rulesets

Because we don't know where the element is, we don't know if we should use lvl1, 2 or 3. So the site looks a bit inconsistent.

Maybe we could have a class, something like `.lvl`. So our selector would be like

- `main .lvl` for level 1
- `main .lvl .lvl` for level 2
- ...

Maybe we could base it on `:root`? Since header and footer are lvl 1

## Restyle history

- Proper border radius
- Better background color (current is too bright)

## reference const ant util

no longer forward

## Put *.SCSS in main/

That way, they won't be on the website. Also I won't need the extension anymore, i can simply compile them in *generate.sh*.

### The data linking phase

what i need to do:

1. update the json shemas and data: union html string with an object { isFragment: boolean; filename: string; }
2. write the fragments in php. require a library (fragment.php) that will provide the features that we want
3. write the json linker php script. it will read the jsons in the data directory, replace the fragment objects with strings (to run the php and collect stdout: exec?) and encode the final jsons to the website directory
4. call the linker in generate.sh before running the generation scripts.

## Put project story json in a separate file

It's kind of a pain having to write HTML in JSON manually. There's no support for newlines and double quotes need to be escaped.

it would be better to store them as fragments in another file.

List of JSON html properties

file|location|content category
-|-|-|
types|*|flow
tags|*|flow
projects|context|phrasing
projects|story|flow
projects|title|phrasing
projects|abstract|phrasing
projects|link keys|phrasing
projects|reference keys|phrasing
projects|gallery keys|phrasing
definition|synopsis|phrasing
definition|names items|phrasing
langs|all strings except indexAboutMeContent|phrasing
langs|indexAboutMeContent|flow

But then what about Javascript? I only want the fragments to take part in the generation. I'd like to avoid having to fetch them in JS or even hosting them online at all.

So... maybe i can preprocess the JSONs? and replace the fragment references with their actual content before running PHP?

Maybe there's a better solution to this I'm not seeing.

All I want is to express HTML content in an PHP file.

I'd lke to have to rely on my own conventions and concepts as little as possible.

I want to add as little complexity as possible to this project.

## JSON schema foreign keys

for types, definitions, tags, anchors

## Increase the contrast between lvl 1 and 2

currently it is too small, which result in small elements not standing out from the background enough. this is an accesssibility concern.

## Add title to all sections

such as story, technoligies, team...

some do not have titles. that's because we don't want to see a title. but it would be better if there was a title for semantics. so add a title and use a class like `.hide-title` that `display: none` the title.

## Passions page

même structure que pour les perspectives

## Passions, perspectives, projects... same thing?

Passions and perspectives could also use having references.

Although i probably won't need team, technologies. I could need gallery for passions though, if i want to pre.

I can reuse the generation code for projects. But i should change the name.

Proposed names:

- "content page": too generic
- "article": wrongly refers to the html element
- **"detail page"**

from now on, invidual project pages will be called detail pages. Passions and perspectives will also generate detail pages.

The only difference with projects is that the card HTML will differ.

Actually, what about status and context? Passions and perspectives have no use for those.

## show gallery after references

since references relate to the story, they should be close to it.

## single column layout for stories

center the text.

because it's annoying when you have to scroll back up to continue reading.

## consistent whitespace around titles

currently it is a mess. sometimes we use margin, sometimes we use gap... i guess i should remove all margins on titles from base but put them in `.text`.

`.text` represents textual content. note that textual content may not only be text. it may be figures or other stuff as long as it is displayed in the "standard" way. it is used to enforce typygraphical conventions such as `text-indent`...

btw, should i put text-indent on all paragraphs or only the first one? only the first one, since we already have marings to separate paragraphs.

## don't use key names for html content

i'm talking to you, references!

## use another target blank glyph

the current one doesn't display properly in all browsers (doesnt display correctly on samsung internet). because it was part of Supplemental Arrow-C. I picked one from Arrows which is more compatible.

## remove glyph on definition links

## consistent def titles

instead of using an array, give variants of titles

- full
- abbr

put it in an object

no plural because as the defined creation is unique and it doesn't make sense to put it at plural (Cs?, NASMs?)

## id/field.phtml fragment directory structure

instead of `field/id.phtml`

## fixed tooltip eternal show bug

Analyze what the current code does on:

- trigger enter: clear timeout, schedule show
- trigger leave: clear tiemout, hide
- tooltip enter: clear timeout
- tooltip leave: schedule hide

### Scenario 1

\#|event|delay before|what happens
-|-|-|-
1|trigger enter||show in 500
2|trigger leave|< 500|cancel show

### Scenario 2

\#|event|delay before|what happens
-|-|-|-
1|trigger enter||show in 500
2|trigger leave|> 500|hide in 250
3|tooltip enter|< 250|cancel hide
4|tooltip leave||hide in 250

### Scenario 3 (bug)

\#|event|delay before|what happens
-|-|-|-
1|trigger enter||show in 500
2|trigger leave|> 500|hide in 250
3|tooltip enter|< 250|cancel hide
4|tooltip leave||hide in 250
5|trigger enter|< 250|cancel hide, show in 500
6|trigger leave||cancel show, schedul hide

**Result**: since we didn't check if the tooltip was already show in `scheduleShowTooltip`, we overwrote the old tooltip with a new tooltip on 5, while is was not necessarily shown (depending on the delay between 5 and 6), it meant that the old tooltip was unreferenced and would not be hidden. this was as imple fix

## fix definition tooltips

sometimes they don't go away

fade transition

Fix bug: when you hover the card and go back to the tooltip, the definition doesn't go away

What we can do: add the tooltip to the DOM once when it's shown for the first time, and then never remove it, just hide it.

## fix contact link underlines

## Stop double columns

it's kind of annoying. i'm fine with the page being longer even though there are large horizontal margins.. this is fine and kind of trendy.. Better for the eyes.

## global index page: automatically redirects to the user's preferred language

## fix icon alignment in buttons

## English translation

currently translating definitions.json and adding missing keys

translate and add other files

- translate history
- translate but informatique

## Add anno designer definition

And update island-maps story. (and french translation)

## link only one data json at a time

so we don't need to link everything at the start in generate.bash. This will decrease generation time.

## use plural detail urls

so instead of project/winclean we have projects/winclean . i know i concatenate a hard 's' somewhere.

## remove bash

- remove bash script
- remove Page class (what the fuck)?

## merge put_doctype_html and put_head, put_head_light?

if there's nothing we insert in between, there's no reason not to.
