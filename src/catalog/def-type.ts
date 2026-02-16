import type { Locale } from '../const';
import { locopy, type Localized } from '../i18n';
import type { copy } from '../lib/copy';

export interface DefType {
    title: Localized<copy>;
}
export const defType = (l: Locale, d: DefTypeKey) => ({
    title: locopy(l, defTypes[d].title),
});

export const defTypesKeys = [
    'algorithm',
    'computer-language',
    'data-format',
    'dbms',
    'design-pattern',
    'game-mod',
    'game-server',
    'game',
    'high-school-specialized-teaching',
    'ide',
    'library',
    'markup-language',
    'paradigm',
    'person',
    'programming-language',
    'software',
    'ui',
    'website',
] as const;
export type DefTypeKey = (typeof defTypesKeys)[number];

export const defTypes = {
    algorithm: { title: { en: 'algorithm', fr: 'algorithme' } },
    'computer-language': { title: { en: 'computer language', fr: 'language informatique' } },
    'data-format': { title: { en: 'data format', fr: 'format de données' } },
    dbms: { title: { en: 'database management system', fr: 'système de gestion de base de données' } },
    'design-pattern': { title: { en: 'design pattern', fr: 'patron de conception' } },
    'game-mod': {
        title: {
            en: 'game mod',
            fr: 'modification de jeu',
        },
    },
    'game-server': {
        title: {
            en: 'game server',
            fr: 'serveur de jeu',
        },
    },
    game: {
        title: {
            en: 'videogame',
            fr: 'jeu-vidéo',
        },
    },
    'high-school-specialized-teaching': {
        title: {
            en: 'high school specialized teaching',
            fr: 'enseignement de spécialité au lycée',
        },
    },
    ide: {
        title: {
            en: 'integrated development environment',
            fr: 'environnement de développement intégré',
        },
    },
    library: {
        title: {
            en: 'library',
            fr: 'bibliothèque',
        },
    },
    'markup-language': {
        title: {
            en: 'markup language',
            fr: 'langage de balisage',
        },
    },
    paradigm: {
        title: {
            en: 'programming paradigm',
            fr: 'paradigme de programmation',
        },
    },
    person: {
        title: {
            en: 'person',
            fr: 'personne',
        },
    },
    'programming-language': {
        title: {
            en: 'programming language',
            fr: 'langage de programmation',
        },
    },
    software: {
        title: {
            en: 'software',
            fr: 'logiciel',
        },
    },
    ui: {
        title: {
            en: 'user interface component',
            fr: "composant d'interface utilisateur",
        },
    },
    website: {
        title: {
            en: 'website',
            fr: 'site Web',
        },
    },
} as const satisfies Record<DefTypeKey, DefType>;
