# PSDC

Arrière-plan = formal grammar

*Compilateur pseudocode.*

Novembre 2023 &mdash; en cours &mdash; Personnel

## Tags

- Logiciel
- POO
- Compilateur

## Logiciels & langages

- Visual Studio Code
- C#

## Histoire

PSDC répond à un besoin. Celui d'automatiser la tâche fastidieuse de traduire des programmes entre différents langages de programmation.

Au cours de ma formation de BUT Informatique, j'ai appris l'algorithmie avec le Pseudocode, un pseudolangage de programmation inventée pour les besoins de l'IUT de Lannioon. Inspiré du Pascal, le Pseudocode permet d'énoncer un algorithme dans un langage plus proche de celui de l'homme que de celui de l'ordinateur, tout en gardant l'aspect exhaustif de tout langage de programmation.

Au cours de nos TP, nous avons très souvent dû traduire des programmes en pseudocode vers le C. Cette tâche est assez réberbative, d'où mon désir de l'automatiser. Et c'est ce qui ma mené à découvrir la conception de compilateurs.

À titre d'exemple, voici un simple programme en pseudocode qui affiche "Bonjour" à l'écran&nbsp;:

```text
programme AfficherBonjour c'est début
    écrireÉcran("Bonjour");
fin
```

Voici un programme équivalent en C&nbsp;:

```c
#include <stdio.h>

int main() {
    printf("Bonjour\n");
    return 0;
}
```

Comment peut-on automatiser cette transformation&nbsp;? Et bien, en réalité, ce n'est pas si complexe. Le livre [*Crafting Interpreters*](#liens) métaphorise le problème par l'ascension d'une montagne&nbsp;:

![Métaphore de la montagne](https://craftinginterpreters.com/image/a-map-of-the-territory/mountain.png)
*Robert Nystrom &mdash; &copy; 2015 &ndash; 2021, license MIT*

Commencons avec le code source original, au pied de la montagne. Au fil des étapes (*scanning*, *parsing*, *analysis*), la représentation du code devient de plus en plus haut niveau, c'est-à-dire qu'elle se focalise plus sur la sémantique exprimée que par les détails d'implémentation.

Une fois le sommet atteint, on est à mi-chemin de la compilation. On a une vue imprenable sur la sémantique du code, soit le sens que l'utilisateur lui donne à travers la syntaxe de notre langage.

Alors entamons notre descente. Convertissons successivement notre représentation de haut niveau en des formes se rapprochant de notre objectif final &nbsp;: le langage machine, qui sera exécuté directement par le processeur.

Je n'ai découvert *Crafing Interpreters* qu'assez tard dans le projet. À l'origine, je me suis basé sur la playlist [*Creating a Compiler*](#liens) de Pixeled sur YouTube, où on assiste à la conception et à l'implémentation d'un compilateur pour un language *ex-nihilo* nommé *Hydrogen* vers l'assembleur.

C'est dans ces vidéos que j'ai appris les bases de l'[analyse lexicale](#liens), des [grammaires formelles](#liens), ou encore de l'[analyse syntaxique](#liens).

## Liens

1. [Dépôt GitHub](https://github.com/5cover/psdc)
2. [Crafting Interpreters](https://craftinginterpreters.com)
3. [Creating a Compiler - Pixeled (YouTube)](https://www.youtube.com/playlist?list=PLUDlas_Zy_qC7c5tCgTMYq2idyyT241qs)
4. [Analyse lexicale - Wikipédia](https://fr.wikipedia.org/wiki/Analyse_lexicale)
5. [Grammaire formelle - Wikipédia](https://fr.wikipedia.org/wiki/Grammaire_formelle)
6. [Analyse syntaxique - Wikipédia](https://fr.wikipedia.org/wiki/Analyse_syntaxique)
