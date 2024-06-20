# Scratch area

## windows classic theme

yes. It would be awesome. Use system colors.

## Link to iut lannion website in parcours

and other relevant links as well, to connect myself to my parcours.

## Une page sur le sujet de grand oral?

Pourquoi pas

## Recommended projects

Compute similaritly index based on number of tags in common

At the bottom of each project page.

Show up to a row, so maybe 5? that feels like a good number. Of course it may span over multiple rows on mobile.

## Put *.SCSS in main/

That way, they won't be on the website. Also I won't need the extension anymore, i can simply compiler them in *generate.sh*.

## Large image preview

for project gallery

## C code syntax highlighting

### Save.tf link?

Why not. In perspectives, "Team Fortress 2"

## Perspectives page

My opiniated rants on some things

### Future of AI

On the future of AI : individualization after democratization

Won't replace programmers or most human jobs.

### The lie we tell ourselves

Capitalism realism, individual unability to change the world. But together we can make it better

### What makes a programming language good?

Your video about Zig prompted me to learn the language, and so far I absolutely love it! I''m implementing a clone of the test command to learn it. It fixes all the problems i have with C:

- generics (they are such a pain in C)
- explicit and exhaustive error handling (imagine putting every printf in an if statement)
- explicit integer sizes (seemed annoying at first; but it makes sense if you think about it: YOU give the values, so YOU should be the one who decides on the size, not the compiler)
- defer (best thing since sliced bread)
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

Learning C is better than any amount of Leetcode challenges.

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

Mettre le numéro de la SAÉ dans le contexte

### Gallerie

- S1.02, S1.01 : shells
- S1.01 : documentation

## Rechercher/remplacer les définitions

Préprocesser toutes les pages en PHP. Ajouter le tooltip dans tout les contenus où il y a un nom de définition.

Est-ce que ce serait pas mieu de le faire manuellement? Comme ça on évit tout faux positif. Et puis on peut choisir si on autorise une tooltip ou non.

Oui peut-être bien qu'il faudrait le faire manuellement.

## Page BUT Informatique

Présente chaque compétence et la tête de liste des projets associés (entre 4 et 6)

## Changer la couleur de scrollbar

Suggéré par Malo &mdash; moins casser le color scheme &mdash; utiliser la couleur d'accent.

## Put colors in separate rulesets

Because we don't know where the element is, we don't know if we should use lvl1, 2 or 3. So the site looks a bit inconsistent. We can use selectors like `main > * > *` for lvl2? i don't know we'll see. We're kind of in an emergency right now.

What is the meaning of `main * *` ? What is the difference with `main > * > *`?

## Fix CSS problems

- Arrière plan des projets dans la page de but
- Liens z-index dans les cartes de projet.
- responsivité (tester sur mobile)
- arrière plan pour le pre > code (voir markdown css)
- taille des images dans story (voir psdc)

## Amérorations des pages de projet

### Plus de détails sur les liens et les technologies (& futurs coéqupiers)

Au lieu d'afficher que des logos, on fait une liste verticale avec le nom (pour les liens).

Aussi pour les technologies et les copéquipiers il faudrait une version non-tooltip du détail à afficher en permanence et non pas en hover.

Le plus gros problème c'est qu'on aura pas les infobulles de définitions sur mobile, donc il faut afficher les plus importantes en permanence.

### Section coéquipiers

Présente les coéquipiers pour le projet, leur photo et un lien vers leur portfolio.

(non affiché si je suis tout seul)

### Separate anchors and references

Les références numérotées (style académiques), != des anchors (point d'ancrage du projet : ses connexions au monde : github, article, ...)

### Fusion de statut et contexte

Aussi valable pour les cartes de projet. Les avoir sur des lignes différentes n'a pas de sense. Je pense les mettre dans un div avec un flex row wrap et un gap.

### Limiter le nombre de tags dans le cartes

Quand il y en a trop, ça prend trop de place, ça va sur plusieurs lignes

## Définir mes amis

Ajouter une définition pour les coéquipiers.

Logo = leur tête

Plus d'informations = leur portfolio

