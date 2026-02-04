import type { Translation } from './i18n/Translation';

export const literatureKinds = ['passion', 'blog', 'story'] as const;
export type LiteratureKind = (typeof literatureKinds)[number];
export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const navItemPages = ['projects', 'history', ...literatureKinds, 'history/history-but'] as const;
export type NavItemPage = (typeof navItemPages)[number];

type Equals<A, B> = A extends B ? (B extends A ? true : false) : false;

export type Localize<T> = {
    [K in keyof T]: Equals<keyof T[K], Locale> extends true
        ? T[K] extends Localized<infer U>
            ? U
            : Localize<T[K]>
        : Localize<T[K]>;
};
type Loc<T> = Record<Locale, T>;
export type Localized<T> = T | Loc<T>;
export function loc<T>(l: Locale, c: Localized<T>): T {
    const isLocalized = (c: Localized<T>): c is Loc<T> =>
        c !== null && typeof c === 'object' && locales.every(l => l in c);
    if (isLocalized(c)) {
        return c[l];
    }
    return c;
}

export function normalizeLocale(locale: string | undefined): Locale {
    return locale === 'en' ? 'en' : 'fr';
}

const modules = import.meta.glob('./i18n/*.ts', { eager: true });

export function translation(locale: string | undefined): Translation {
    return (modules[`./i18n/${normalizeLocale(locale)}.ts`] as { default: Translation }).default;
}
