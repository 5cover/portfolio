import type { LanguageInfo, NavItem, ThemeLabels } from '../lib/ui-types';

export type Locale = 'fr' | 'en';
export const locales = ['fr', 'en'] as const;

export function normalizeLocale(locale: string | undefined): Locale {
    return locale === 'en' ? 'en' : 'fr';
}

type LocaleLabels = {
    flagClass: string;
    names: Record<Locale, string>;
    siteDescription: string;
    footerGitHubAnchorTitle: string;
    nav: {
        projects: string;
        history: string;
        hobbies: string;
        blog: string;
        but: string;
    };
    theme: ThemeLabels;
    labels: {
        fmtTitle: string;
        ongoing: string;
        links: string;
        team: string;
        story: string;
        references: string;
        technologies: string;
        gallery: string;
        refJumpUp: string;
    };
};

const labelsByLocale: Record<Locale, LocaleLabels> = {
    fr: {
        flagClass: 'fi-fr',
        names: {
            en: 'French',
            fr: 'Français',
        },
        siteDescription:
            "Bonjour\u00a0! Je m'appelle Raphaël Bardini. Ceci est mon portfolio. Faites come chez vous\u00a0!",
        footerGitHubAnchorTitle: 'Dépôt GitHub de ce site',
        nav: {
            projects: 'Projets',
            history: 'Parcours',
            hobbies: 'Hobbies',
            blog: 'Blog',
            but: 'BUT Informatique',
        },
        theme: {
            light: 'Thème clair',
            system: 'Thème système',
            dark: 'Thème sombre',
        },
        labels: {
            fmtTitle: 'Logo %s',
            ongoing: 'en cours',
            links: 'Liens',
            team: 'Équipe',
            story: 'Histoire',
            references: 'Références',
            technologies: 'Technologies',
            gallery: 'Galerie',
            refJumpUp: 'Revenir plus haut',
        },
    },
    en: {
        flagClass: 'fi-us',
        names: {
            en: 'English',
            fr: 'Anglais',
        },
        siteDescription: 'Hello! My name is Raphaël Bardini. This is my portfolio website. Make yourself at home!',
        footerGitHubAnchorTitle: "This site's GitHub repository",
        nav: {
            projects: 'Projects',
            history: 'History',
            hobbies: 'Hobbies',
            blog: 'Blog',
            but: 'BUT Computer Science',
        },
        theme: {
            light: 'Light theme',
            system: 'System theme',
            dark: 'Dark theme',
        },
        labels: {
            fmtTitle: '%s logo',
            ongoing: 'ongoing',
            links: 'Links',
            team: 'Team',
            story: 'Story',
            references: 'References',
            technologies: 'Technologies',
            gallery: 'Gallery',
            refJumpUp: 'Jump up',
        },
    },
};

export function getLabels(locale: string | undefined): LocaleLabels {
    return labelsByLocale[normalizeLocale(locale)];
}

export function getNavItems(locale: string | undefined): NavItem[] {
    const labels = getLabels(locale);
    return [
        { page: 'projects', label: labels.nav.projects },
        { page: 'history', label: labels.nav.history },
        { page: 'hobbies', label: labels.nav.hobbies },
        { page: 'blog', label: labels.nav.blog },
        { page: 'history/history-but', label: labels.nav.but },
    ];
}

export function getThemeLabels(locale: string | undefined): ThemeLabels {
    return getLabels(locale).theme;
}

export function getLanguages(): LanguageInfo[] {
    return locales.map(code => {
        const { flagClass, names } = labelsByLocale[code];
        return {
            code,
            name: names[code] ?? code,
            flagClass,
            names,
        };
    });
}
