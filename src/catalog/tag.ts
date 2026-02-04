import { loc, type Locale, type Localized } from '../i18n';
import type { copy } from '../lib/copy';

export const tagKeys = [
    '3d-modeling',
    'algorithms',
    'art',
    'asset-creation',
    'but-1',
    'but-2',
    'but-3',
    'but-administrer',
    'but-collaborer',
    'but-conduire',
    'but-gerer',
    'but-optimiser',
    'but-realiser',
    'cli',
    'communication',
    'compiler',
    'data',
    'db',
    'full-stack',
    'game',
    'high-level',
    'idea',
    'library',
    'low-level',
    'oop',
    'software',
    'sysadmin',
    'ui',
    'ux',
    'web',
] as const;

export type TagKey = (typeof tagKeys)[number];

export interface Tag {
    title: Localized<copy>;
}

export const localizeTag = (l: Locale) => (d: Tag) => ({
    title: loc(l, d.title),
});

export default {
    '3d-modeling': {
        title: {
            en: '3D',
            fr: '3D',
        },
    },
    algorithms: {
        title: {
            en: 'Algorithms',
            fr: 'Algorithmes',
        },
    },
    art: {
        title: {
            en: 'Art',
            fr: 'Art',
        },
    },
    'asset-creation': {
        title: {
            en: 'Assets',
            fr: 'Assets',
        },
    },
    'but-1': {
        title: {
            en: { key: 'but-informatique', badge: 'BUT 1' },
            fr: { key: 'but-informatique', badge: 'BUT 1' },
        },
    },
    'but-2': {
        title: {
            en: { key: 'but-informatique', badge: 'BUT 2' },
            fr: { key: 'but-informatique', badge: 'BUT 2' },
        },
    },
    'but-3': {
        title: {
            en: { key: 'but-informatique', badge: 'BUT 3' },
            fr: { key: 'but-informatique', badge: 'BUT 3' },
        },
    },
    'but-administrer': {
        title: {
            en: { key: 'but-informatique', badge: 'Administer' },
            fr: { key: 'but-informatique', badge: 'Administrer' },
        },
    },
    'but-collaborer': {
        title: {
            en: { key: 'but-informatique', badge: 'Collaborate' },
            fr: { key: 'but-informatique', badge: 'Collaborer' },
        },
    },
    'but-conduire': {
        title: {
            en: { key: 'but-informatique', badge: 'Conduct' },
            fr: { key: 'but-informatique', badge: 'Conduire' },
        },
    },
    'but-gerer': {
        title: {
            en: { key: 'but-informatique', badge: 'Manage' },
            fr: { key: 'but-informatique', badge: 'Gérer' },
        },
    },
    'but-optimiser': {
        title: {
            en: { key: 'but-informatique', badge: 'Optimize' },
            fr: { key: 'but-informatique', badge: 'Optimiser' },
        },
    },
    'but-realiser': {
        title: {
            en: { key: 'but-informatique', badge: 'Create' },
            fr: { key: 'but-informatique', badge: 'Réaliser' },
        },
    },
    cli: {
        title: {
            en: { title: 'Command-line interface', abbr: 'CLI' },
            fr: { title: 'Interface en ligne de commande', abbr: 'CLI' },
        },
    },
    communication: {
        title: {
            en: 'Communication',
            fr: 'Communication',
        },
    },
    compiler: {
        title: {
            en: 'Compiler',
            fr: 'Compilateur',
        },
    },
    data: {
        title: {
            en: 'Data',
            fr: 'Data',
        },
    },
    db: {
        title: {
            en: 'Databases',
            fr: { title: 'Base de données', abbr: 'BdD' },
        },
    },
    'full-stack': {
        title: {
            en: 'Full-stack',
            fr: 'Full-stack',
        },
    },
    game: {
        title: {
            en: 'Game',
            fr: 'Jeu',
        },
    },
    'high-level': {
        title: {
            en: 'High level',
            fr: 'Haut niveau',
        },
    },
    idea: {
        title: {
            en: {
                title: "Something that hasn't yet led to a concrete realization but has a lot of potential",
                abbr: 'Idea',
            },
            fr: {
                title: "Quelquechose n'ayant pas encore mené à de réalisation concrète mais a beaucoup de potentiel",
                abbr: 'Idée',
            },
        },
    },
    library: {
        title: {
            en: 'Library',
            fr: 'Bibliothèque',
        },
    },
    'low-level': {
        title: {
            en: 'Low level',
            fr: 'Bas niveau',
        },
    },
    oop: {
        title: {
            en: { title: 'Object Oriented Programming', abbr: 'OOP' },
            fr: { title: 'Programmation Orientée Objet', abbr: 'POO' },
        },
    },
    software: {
        title: {
            en: 'Software',
            fr: 'Logiciel',
        },
    },
    sysadmin: {
        title: {
            en: 'Sysadmin',
            fr: 'Sysadmin',
        },
    },
    ui: {
        title: {
            en: { title: 'User Interface', abbr: 'UI' },
            fr: { title: 'Interface utilisateur', abbr: 'IU' },
        },
    },
    ux: {
        title: {
            en: { title: 'User Experience', abbr: 'UX' },
            fr: { title: 'Expérience utilisateur', abbr: 'UX' },
        },
    },
    web: {
        title: {
            en: 'Web',
            fr: 'Web',
        },
    },
} as const satisfies Record<TagKey, Tag>;
