import type { Translation } from './Translation';

export default {
    flagClass: 'fi-fr',
    locales: {
        en: 'French',
        fr: 'Français',
    },
    siteDescription:
        "Bonjour\u00a0! Je m'appelle Raphaël Bardini. Ceci est mon portfolio. Faites come chez vous\u00a0!",
    footerGitHubAnchorTitle: 'Dépôt GitHub de ce site',
    nav: {
        projects: 'Projets',
        history: 'Parcours',
        'history/history-but': 'BUT Informatique',
        blog: 'Blog',
        passion: 'Hobbies',
        story: 'Histoires',
    },
    theme: {
        light: 'Thème clair',
        system: 'Thème système',
        dark: 'Thème sombre',
    },
    details: 'Détails',
    logoTitle: title => `Logo ${title}`,
    ongoing: 'en cours',
    links: 'Liens',
    team: 'Équipe',
    story: 'Histoire',
    references: 'Références',
    technologies: 'Technologies',
    gallery: 'Galerie',
    refJumpUp: 'Revenir plus haut',
} as const satisfies Translation;
