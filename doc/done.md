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

Yes need for lang class, because translation is sometimes associated with more complex logic (*fFormatTitle*...). Although i could use format strings for this, provided PHP has support for this. Look it up in the documentation I guess.

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
