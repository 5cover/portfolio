# Home page

## Title & Piano tiles

Images in vertical rectangles that represent the differents facets of me. With a CSS animations they successfully appear. Reduce opacity. Title in white centered over them.

Images :

\#|title|subtitle|description|lien
-|-|-|-|-
1|Au grand air|Val d'Isère|Station de ski dans les Alpes|intérets # Montagne
2|Jeux-vidéo bac-à-sable|Minecraft|L'art et la fonctionnalité conjointes|intérets # jeux-vidéos bac à sable
3|Un monde virtuel|Trégoria|Une infinité de possbilités|projet Trégoria
4|Modélisation 3D|Blender|Modélisation 3D et montage vidéo|projet 2L2W French Rural Road
5|Science des données|NumPy & Matplotlib|Data science|Projet Ethercrash
6|Théorie des grammaires|PSDC|Sur les traces de Noam Chomsky...|Projet PSDC
7|Optimisation|Sudone|L'optimisation ne se termine jamais|Projet Sudone
8|Expérience utilisateur|WinClean|Mon projet "best-seller"|Projet WinClean

Order : from most personal (videogame, art) to most profesionnal

It would be like some sort of piano with tiles you could press to learn more about me.

We have 8 of them. At 1920px that makes them 240px width each. For smaller width we can strecth them. Maybe rearrange in multiple rows if it looks too small on mobile width

Image dimensions : 240*480

240px 12.5% of 1920 so CSS size would be 12.5vw * 480px

On tile hover : bring to foreground (in front of my name), slightly larger, show piano tile title (smallcaps), subtitle (indented) and description

## Block "Me"

> A paragraph to briefly introduce myself

Blablablabla...

## Block "My ongoing projects"

Horizontal scrolling card of ongoing projects (arrow if overflow)

### Project cards

Width : ~260px, 50px spacing, margin 60px

- there's no point. we're not concerned by height (i could add a max-height to prevent the card from getting huge)
- it limits how much text can be put
- it forces every project to have a logo, even if it is a meaningless one

So let's put the text and other informations down below the image. And make the whole card a link to the project page (red when hovered)

Conside arranging vertically for smaller screens (might be hard to scroll on phone).

Informations to show :

- Title
- Background
- Logo
- Abstract
- Date
- Context
- Underway?
- Tags

Something like

```text
Application // mst: bg fill gray with border-radius

[Lologo]
[Lologo] WinClean
[Lologo]
 
En cours - depuis Août 2021 - personnel // meta: in gray (less accent than main text)

Utilitaire de nettoyage et optimisation
Windows.
```

Logo size : letter of the title

3 levels for project informtion

- Card : image and logo, title
- Card hovered : collapse image from bottom up, show logo, title, abstract, date, context, underway? tags
- Project page : EVERYTHING

(add main image field) - background will serve for the project page

Tags are links that lead to a search for that tag.

### Contact

Resume button - increase opacity and sigly embiggen on hover.
