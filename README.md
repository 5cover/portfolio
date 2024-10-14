# Portfolio

Idée : car on crée toujours plus de projets, il peut devenir fastidueux de les ajouter à no créer un programme qui génère le site de manière automatique à partir d'une liste de projets et de paramètres de configuration.

## Brainstorming

- Liste des projets
- Projets favoris
- Projets ordonnées chronologiquement
- Infos contact
- Aperçu CV (avec possibilité de téléchargement)
- Partie moi (présentation, version web du cv +-)
- liens vers but, iut lannion, programme, 6 compétences
- associer chaque projet à des compétences avec justification

Localisation (français, anglais)

### Projet

JSON

- Nom
- Description
- Date de début
- Logo
- Contexte (Personnel / Terminale Spé NSI / 1re année BUT Informatique...)
- Status (en cours / terminé)
- Compétences liées
- Tags
- Outils
  - Logiciels
  - Langages de prog.
- Liens
  - Git{hub, lab}
  - Articles
- Gallerie

### Page d'acceuil

Mes projets en cours

### autre types de projets

ce serait bien de présenter aussi

- les routes sur CS
- trégoria?
- island maps
- ...?

on sortira un peu de l'optique du développement logiciel, c'est important de se diversifier

## étapes

- json cible
- arborescence
- maquette
- conception

## Arborescence

Chaque projet est sur une "carte" qui est aussi un lien vers sa page de détail.

Pourquoi avoir des pages de détail ? Parce que cela permet de vraiment détailler les projets, d'insister sur leur qualité plutôt que la quantité de projets. On est plus limité par l'espace comme sur le CV. Je dois raconter des choses passionantes, et ajouter beaucoup de contenu pour inciter le visiteur à passer le plus de temps possible sur mon site. Plus il passe de temps, plus il y a de chances qu'il me recrute, non?

Le site a 4 + N pages (N étant le nombre de projets)

- Page d'acceuil
    1. Qui suis-je (Bonjour, je m'apelle raphaël bardini. Pour moi, le chemin vers un monde meilleur est pavé de logiciels de qualité.)
    2. Mes projets en cours
    3. Lien "Tous mes projets"
    4. Intéressé.e? \[Mon CV\] (PDF overt avec le navigateur)
    5. Contact en fixed bottom

- Page recherche projet
    1. barre de recherche en haut
    2. liste des projets comme sur site de streaming

- Parcours

- Mes passions

- Pages détail projet

<https://www.gloomaps.com/jRov4mvZd4>

## définitions

Pour les termes techniques, les logiciels et les jeux, on peut avoir un encadré en hoover avec une définition courte, des liens...

Définis en JSON,

Puis on search dans le texte de contenu et on remplace les occurences par des liens

champ|contrainte
-|-
Synopsis|pas plus d'une phrase
Type|nom de type dans type.json

Les noms sont case-insensitive.
