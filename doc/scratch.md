# Scratch area

## Final release

- Minify HTML
- Minify CSS
- Minify JS

## Use typescript

it's better

## On firefox 128 release (9 juillet)

Take advantage of @property support. Replace *bg-img-project* and *bg-img-definition* by *bg-img*.

## definir équipe projets nsi

```json
    "nerzic-brevin": {
        "names": [
            "Brévin Nerzic"
        ],
        "type": "person",
        "logo": {
            "isThemedSvg": false,
            "url": ""
        },
        "synopsis": "",
        "wiki": ""
    },
    "dubouil-clea": {
        "names": [
            "Cléa Dubouil"
        ],
        "type": "person",
        "logo": {
            "isThemedSvg": false,
            "url": ""
        },
        "synopsis": "",
        "wiki": ""
    },
```

## Print CSS

Break-inside avoid and stuff

## windows classic theme

yes. It would be awesome. Use system colors.

need to put in theme

- border radius
- border widths
- transparency
- maybe more?

make content blocks appear like windows, with a (non-interactive) title bar (backround image?)

## thème "tableau craie" (chalkboard)

bordures : blanc brillant (*c.f.* cmd.exe)

niveaux : tous en noir

## Sort technologies

- Alphabetically: for consistent ordering (as json order may be inconsistent)
- Group by type: so we don't mix vs-code and programming languages. also this does our initial idea of having an "editors" section

## Take another photo

Something more customized than the class photo.

## Une page sur le sujet de grand oral?

Pourquoi pas

## Recommended projects

Compute similaritly index based on number of tags in common

At the bottom of each project page.

Show up to a row, so maybe 5? that feels like a good number. Of course it may span over multiple rows on mobile.

## Large image preview

for project gallery but not only

## C code syntax highlighting

## start loading jsons on page load

use maybe a map with cached jsons?

## js langs

format title based on value of the html lang attr

annoying we have to duplicate logic from php -> js.

## Formaliser le contexte

mettre dans un json traduit et utiliser des clés primaires dans projects (comme avec types pour les définiitons...)

## consistent whitespace around titles

currently it is a mess. sometimes we use margin, sometimes we use gap... i guess i should remove all margins on titles from base but put them in `.text`.

`.text` represents textual content. note that textual content may not only be text. it may be figures or other stuff as long as it is displayed in the "standard" way. it is used to enforce typygraphical conventions such as `text-indent`...

btw, should i put text-indent on all paragraphs or only the first one?

and also i should find a better name for `.text`.

## Fix accent color contrast

## Save.tf link?

Why not. In perspectives, "Team Fortress 2"

## Projects

- JSlave
- ztest
- FileSignatureDetector
- Portfolio
- Ethercrash
- Dialogs
- ED++
- Cori
- MyMalloc
- C-exCeptions
- WPFZard
- Demineur Python
- NormalizeVolume : an FFMPEG helper for volume normalization : histoire avec renault zoé
- UnixTimestamScreenSaver : why didn't this already exist
- NoMoreVehicles
- The Last Teacher : nouvelle

- S1.01 Implémentation d'un besoin client : lowlevel, C, dialogue client
- S1.02 Recherche Algorithmique &rarr; Sudone
- S1.03 Docker, Markdown parser, Bash, automatisation et scripting, sysadmin
- S1.04 BDD BUT
- S1.05 Site de steaming
- S1.06 Découverte du monde de l'entreprise
- S2.01 IHM & JavaFX
- S2.02 Découverte Algoritmique, problème des N reines
- S2.03 Apache HTTP Serveur
- S2.04 BDD + stat + data mining
- S2.05 Gestion de Projet
- S2.06 Teambuilding & film : Chevalier d'Un Jour

stories

s1.01 blockquote cite attribute

### Galleries

- S1.02, S1.01 : shells
- S1.01 : documentation

### Histoires

Reprendre la structure des compte rendus d'anglais

- \+ Livrables

### Project repositories

GitLab for SAÉs. Put the in a group called BUT.

S1.01 : host doxygen generated html on gh-pages, add link

## Perspectives page

My opiniated rants on some things

Structure:

liste verticale d'élements avec un border-radius élevé. Séparé en deux parties (gauche : image, droite : titre + abstract)

chacun mêne vers une page individuelle.

### Future of AI

On the future of AI : individualization after democratization

Won't replace programmers or most human jobs.

LM studio...

### The lie we tell ourselves

Capitalism realism, individual unability to change the world. But together we can make it better

### What makes a programming language good?

Your video about Zig prompted me to learn the language, and so far I absolutely love it! I''m implementing a clone of the test command to learn it. It fixes all the problems i have with C:

- generics (they are such a pain in C)
- explicit and exhaustive error handling (imagine putting every printf in an if statement)
- explicit integer sizes (seemed annoying at first; but it makes sense if you think about it: YOU give the values, so YOU should be the one who decides on the size, not the compiler)
- <span lang="en">defer</span> (best thing since sliced bread)
- an useful standard library (no need to download an stb lib for arena or hashtable - or feel too lazy to implement them myself)
- a simple build system (no more cmake or make; finally free!)
- compile time guarantees and invariants: Zig is much, much closer than C to the (ultimately unnatainable) ideal of "if it compiles, it works".
- encapsulation (no need to prefix internal functions with an underscore anymore; pub is all you'll need)

Some things I hope will be added to the language in the future

- Costless interfaces (duck typing can only get you so far - it's not because a type implements a method named Foo that this method does what you expect). They would only exist at compile-time to enforce a type respects a certain contract.

At then end of the day, everything that can be done in Zig can also be done in C, but the invariants and restrictions Zig enforces is stuff you don't have to worry about getting wrong, unlike when you do it manually in C.

I believe this is the goal of any language; to allow expressive code in order to give as much compile-time guarantees of correctness as posssible. Overall I feel C has run its course as a language.

Of course it will be around forever since so much stuff is written in it and it would be ludicrous to expect everything to be rewritten in Rust or Zig. But I wouldn't expect it to be used for any new projects.

However, I still think C is an invaluable language to learn. It forces you to leave your comfort zone of abstactions and face the actual challenge of implementating stuff that we use every day as programmers, such a lists or hash tables.

~~Learning C is better than any amount of Leetcode challenges.~~

### voyager's software

a marvel of engineering. a timeless lesson for all of us programmers.

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
