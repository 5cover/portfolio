import { LiteratureKinds } from './content.config';
import type { ThemeLabels } from './lib/types';

export const Locales = ['fr', 'en'] as const;
export type Locale = (typeof Locales)[number];
export type Localized<T> = Record<Locale, T>;
export const NavItemPages = ['projects', 'history' /* , ...LiteratureKinds */, 'history/history-but'] as const;
export type NavItemPage = (typeof NavItemPages)[number];

export interface Translation {
    flagClass: string;
    locales: Record<Locale, string>;
    siteDescription: string;
    footerGitHubAnchorTitle: string;
    nav: Record<NavItemPage, string>;
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

export function normalizeLocale(locale: string | undefined): Locale {
    return locale === 'en' ? 'en' : 'fr';
}

const modules = import.meta.glob('./i18n/*.tsx', { eager: true });

export function getLabels(locale: string | undefined): Translation {
    return (modules[`./i18n/${normalizeLocale(locale)}.tsx`] as { default: Translation }).default;
}
