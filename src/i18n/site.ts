import { LiteratureKinds, type LiteratureKind } from '../content/config';
import type { LanguageInfo, NavItem, ThemeLabels } from '../lib/types';

export type Localized<T> = Record<Locale, T>;
export type Locale = 'fr' | 'en';
export const locales = ['fr', 'en'] as const;

export function normalizeLocale(locale: string | undefined): Locale {
    return locale === 'en' ? 'en' : 'fr';
}

export interface LocaleLabels {
    flagClass: string;
    names: Record<Locale, string>;
    siteDescription: string;
    footerGitHubAnchorTitle: string;
    nav: {
        projects: string;
        history: string;
        but: string;
        literature: Record<LiteratureKind, string>;
    };
    theme: ThemeLabels;
    copy: {
        details: string;
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
}

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
            but: 'BUT Informatique',
            literature: {
                blog: 'Blog',
                passion: 'Hobbies',
                story: 'Histoires',
            },
        },
        theme: {
            light: 'Thème clair',
            system: 'Thème système',
            dark: 'Thème sombre',
        },
        copy: {
            details: 'Détails',
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
            but: 'BUT Computer Science',
            literature: {
                blog: 'Blog',
                passion: 'Hobbies',
                story: 'Histoire',
            },
        },
        theme: {
            light: 'Light theme',
            system: 'System theme',
            dark: 'Dark theme',
        },
        copy: {
            details: 'Details',
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
        ...LiteratureKinds.map(k => ({ page: k, label: labels.nav.literature[k] }) as const),
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
