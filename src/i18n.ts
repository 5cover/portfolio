import type { ComponentChildren } from 'preact';
import { LiteratureKinds, type LiteratureKind } from './content.config';
import type { ThemeLabels } from './lib/types';

export const Locales = ['fr', 'en'] as const;
export type Locale = (typeof Locales)[number];
export type Localized<T> = Record<Locale, T>;
export type Copy = string;
export type Content = ComponentChildren;
export const NavItemPages = ['projects', 'history', ...LiteratureKinds, 'history/history-but'] as const;
export type NavItemPage = (typeof NavItemPages)[number];

export interface Translation {
    flagClass: Copy;
    locales: Record<Locale, Copy>;
    siteDescription: Copy;
    footerGitHubAnchorTitle: Copy;
    nav: Record<NavItemPage, Copy>;
    theme: ThemeLabels;
    copy: {
        details: Copy;
        fmtTitle: Copy;
        ongoing: Copy;
        links: Copy;
        team: Copy;
        story: Copy;
        references: Copy;
        technologies: Copy;
        gallery: Copy;
        refJumpUp: Copy;
    };
}

export function normalizeLocale(locale: string | undefined): Locale {
    return locale === 'en' ? 'en' : 'fr';
}

const modules = import.meta.glob('./i18n/*.tsx', { eager: true });

export function getLabels(locale: string | undefined): Translation {
    return (modules[`./i18n/${normalizeLocale(locale)}.tsx`] as { default: Translation }).default;
}
