import type { Localized } from '../i18n';
import type { Copy } from '../lib/copy';

export const TagKeys = [
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
];

export type TagKey = (typeof TagKeys)[number];

export interface Tag {
    title: Localized<Copy>;
}

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
            en: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>BUT 1</span>',
            fr: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>BUT 1</span>',
        },
    },
    'but-2': {
        title: {
            en: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>BUT 2</span>',
            fr: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>BUT 2</span>',
        },
    },
    'but-3': {
        title: {
            en: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>BUT 3</span>',
            fr: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>BUT 3</span>',
        },
    },
    'but-administrer': {
        title: {
            en: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>Administer</span>',
            fr: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>Administrer</span>',
        },
    },
    'but-collaborer': {
        title: {
            en: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>Collaborate</span>',
            fr: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>Collaborer</span>',
        },
    },
    'but-conduire': {
        title: {
            en: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>Conduct</span>',
            fr: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>Conduire</span>',
        },
    },
    'but-gerer': {
        title: {
            en: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>Manage</span>',
            fr: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique">Gérer</span>',
        },
    },
    'but-optimiser': {
        title: {
            en: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>Optimize</span>',
            fr: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>Optimiser</span>',
        },
    },
    'but-realiser': {
        title: {
            en: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>Create</span>',
            fr: '<span class="iconed-text"><img src="/portfolio/img/but.webp" alt="BUT Informatique" width="95" height="96" title="BUT Informatique"><span>Réaliser</span>',
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
            fr: '<abbr title="Base de données">BdD</abbr>',
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
            en: '<abbr title="Something that hasn\'t yet led to a concrete realization but has a lot of potential">Idea</abbr>',
            fr: '<abbr title="Quelquechose n\'ayant pas encore mené à de réalisation concrète mais a beaucoup de potentiel">Idée</abbr>',
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
            en: '<abbr title="Object Oriented Programming">OOP</abbr>',
            fr: '<abbr title="Programmation Orientée Objet">POO</span></abbr>',
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
            en: '<abbr title="User Interface">UI</abbr>',
            fr: '<abbr title="Interface utilisateur">UI</span></abbr>',
        },
    },
    ux: {
        title: {
            en: '<abbr title="User Experience">UX</abbr>',
            fr: '<abbr title="Expérience utilisateur">UX</span></abbr>',
        },
    },
    web: {
        title: {
            en: 'Web',
            fr: 'Web',
        },
    },
} as const satisfies Record<TagKey, Tag>;
