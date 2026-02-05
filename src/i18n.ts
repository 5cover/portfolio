import astroConfig from '../astro.config.mjs';
import type { Translation } from './i18n/Translation';

export const literatureKinds = ['passion', 'blog', 'story'] as const;
export type LiteratureKind = (typeof literatureKinds)[number];
export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const navItemPages = ['projects', 'history', ...literatureKinds, 'history/history-but'] as const;
export type NavItemPage = (typeof navItemPages)[number];

type HasLoc<T> = Extract<T, Loc<unknown>> extends never ? false : true;
type UnwrapLoc<T> = Extract<T, Loc<unknown>> extends Loc<infer U> ? U : never;

export type Localize<T> =
    // si l'union contient une branche Loc<...>, on prend la valeur
    T extends Date
        ? T
        : HasLoc<T> extends true
          ? UnwrapLoc<T>
          : // arrays (évite que "object" attrape les tableaux)
            T extends readonly (infer I)[]
            ? readonly Localize<I>[]
            : // objets
              T extends object
              ? { [K in keyof T]: Localize<T[K]> }
              : // primitives
                T;

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
    return locales.includes(locale as Locale) ? (locale as Locale) : astroConfig.i18n!.defaultLocale!;
}

const modules = import.meta.glob('./i18n/*.ts', { eager: true });

export function translation(locale: string | undefined): Translation {
    return (modules[`./i18n/${normalizeLocale(locale)}.ts`] as { default: Translation }).default;
}
