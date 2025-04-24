# Scratch area

## fix icons in tags misaligned

put them in the damn middle

## fix line spacing in text content

when a line contains inline code it becomes higher and creates an irregular structure

## show counts for every tag

that way we can get stats

## Final release

- Minify HTML
- Minify CSS
- Minify JS

## Use typescript

it's better

## After firefox 128 release (9 juillet)

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

maybe i could show them in a sidebar?

## Large image preview

for project gallery but not only

## C code syntax highlighting

## start loading jsons on page load

use maybe a map with cached jsons?

## custom 404

maybe http.cat?

I know it's possible with GitHub pages

## js langs

format title based on value of the html lang attr

annoying we have to duplicate logic from php -> js.

## Formaliser le contexte

mettre dans un json traduit et utiliser des clés primaires dans projects (comme avec types pour les définiitons...)

## idea for the portfolio project card

make its background a screenshot of the current page

if JS supports this, this will require making all project card generation dynamic

This will also mean no more project card HTML generation logic duplication between PHP and JS.

## make contact accessible on every page

This will increase the chance of actually getting contacted.

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

### failure is success

fail early. a program that crashes is better than a program that hides its failure

or why i don't like javascript

the compiler is your friend

### voyager's software

a marvel of engineering. a timeless lesson for all of us programmers.

## Project: The Mercs argue about programming languages

Script & video

## Psdc Blog

Some ideas for blog articles i want to make.

### Panic and synchronize: how a parser handles errors

### C#: functional programming, at the cost of performance

### The case of `nomFichierLog`: control flow analysis or quantum physics?

### The Child Combinator: A Double-Edged Sword in CSS

CSS, the language that brings style and structure to our web pages, has a plethora of tools. One such tool is the child combinator (`>`). But should we use it when combining selectors? Let's dive into this question with a fresh perspective.

#### The Allure of the Child Combinator

As a programmer, my instinct is to reach for the *least powerful tool* to get the job done. The child combinator, at first glance, seems less powerful than the descendant combinator. After all, the set of matching DOM elements is smaller with the child combinator.

```css
/* Child combinator: <ul> must be a direct child of <footer> */
footer > ul {
  /* styles */
}

/* Descendant combinator: Any level of nesting between <footer> and <ul> */
footer ul {
  /* styles */
}
```

So, I started using the child combinator everywhere. My rationale was that its restrictive nature would prevent over-matching (a selector matching too many elements). But this approach turned out to be a mistake, as it increased the coupling between HTML and CSS.

#### The Pitfall of Over-Restriction

Consider the following HTML structure:

```html
<footer>
  <div>
    <ul>
      <!-- list items -->
    </ul>
  </div>
</footer>
```

We've enclosed the `ul` element in a `div`. There could be many reasons for this: semantics, styling, etc.

Now, the `footer > ul` ruleset no longer matches. We have to change it to `footer > div > ul`, increasing specificity, size, and overall CSS complexity.

In practice, over-matching rarely happens. So, this whole approach was yet another case of premature optimization or over-engineering. I trusted my instincts to solve a problem before I had it (over-matching with the descendant combinator), and it turns out this problem didn't actually need solving. But I created other problems along the way (HTML/CSS coupling, DOM rigidity).

#### The Semantic Insight

I realized that an element being the direct child of another just isn't a connection of semantic significance. Using it where it's not necessary decreases CSS reusability and complicates development.

The child combinator does have legitimate uses, though. For instance, selecting a particular level in a nested list. I'm not saying it must be avoided like the plague. But it is actually more powerful than the descendant combinator, so it should only be used when necessary.

This challenges the notion of the "power" of a selector. I used to think that the more elements a selector matched, the more powerful it could be considered. But in retrospect, it's the opposite. *The power of a selector comes from its ability to control which elements it applies to*. This corroborates the notion of specificity as a measure of a selector's "power".

#### The Freedom of Semantic Neutrality

Since the `div` and `span` elements have no semantic value, they should be able to be inserted anywhere in the DOM without affecting its style. The child combinator can hinder this flexibility.

In conclusion, while the child combinator has its place, it should be used judiciously. Understanding its true power and impact can help us write more maintainable and flexible CSS.

Happy styling! 🎨💻

## Filter project by technology

So that a recruiter can see all projects I've made that use particular technology

## Make gallery better

- Show PDF files better?
- Caption: link?
- url: for `<img>`
- iframe-src: for `<iframe>`
- content: arbitrary HTML
