# General styling guidelines

## Interactive elements

Effects:

name|explanation
-|-
accentBg(opacity)|accent background of the specified opacity. Implies *box*.
accentFg|accent foreground
arrowGlyph|an arrow glyph (`🡭`) is shown after the element
box|the element is on a new level with optionally a border and a border radius
browserTooltip|a browser tooltip is shown
dotted|`text-decoration: underline dotted`
italics|`font-style: italics`
lightenForeground|lightened foregroud clolor
scale($factor)|`transform: scale($factor)`
underline|`text-decoration: underline`

element|leads to a new page?|always|on domain hover
-|-|-|-
abbreviation|no|dotted|browserTooltip
link|no|accentFg|lightenForeground underline
link blank|yes|accentFg arrow-glyph|lightenForeground underline
link button|yes|box|accentBg(1) scale()
reference link|no|accentFg|lightenForeground underline
reference backlink|no|accentFg|lightenForeground
tooltip definition trigger|yes|accentFg italics arrow-glyph|lightenForeground
tooltip definitition|yes|box
definition card|yes|box|accentBg(1)
project card|yes|box|accentBg(1)
tag|! in *projects* page|accentBg|scale()
checkbox|no|box|accentBg(.5)
checkbox (checked)|no|accentBg(1)
radio|no|box|accentBg(.5)
radio (checked)|no|accentBg(1)

All: `cursor: pointer`

## Opt-in styling classes

Sometimes you don't want the basic style for an element. So, we have to opt-in our styles explicitly everywhere that we do. Or we could create classes like `not-link`, `not-figure`... but that's weird. Or is it? Not styling is the special case after all. I have to think about this more.

element|class
figure|figure
a|link

## Margins

- Between blocks
  - Vertical : 60px
  - Horizontal : 0,03125vw
- Between items : 50px

Base border radius : 25px

## Borders

1px #EEE .125 opacity

## Typefaces

Note: .5 opacity #EEE

## Font sizes

size|usage
-|-
42px|h1
36px|nav home link
28.8px (36/1.25)|h2
26.4px|h3
24px (36/1.5)|h4, nav link, piano-tile h2 min
20.57px (36/1.75)|base
18px (36/2)|rect
.8em|definition synopsis, reference backlink, input prompt
.6em|reference (cite-) link
.4em|external link arrow

size|usage
-|-
2em|h1
1.75em|nav home link, h2
1.5em|h3
1.25em|h4, nav link, piano-tile h2 min
**20px**|base
.9em|rect
.8em|synopsis, reference backlink, input prompt
.6em|reference (cite-) link
.4em|external link arrow

## Colors
