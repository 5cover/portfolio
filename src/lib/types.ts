import type { CollectionKey } from 'astro:content';

export interface Context {
    level: number;
}
export interface PropsBase {
    c: Readonly<Context>;
}

export interface NavItem {
    page: string;
    label: string;
}

export interface LanguageInfo {
    code: string;
    name: string;
    flagClass: string;
    names: Record<string, string>;
}

export interface ThemeLabels {
    light: string;
    system: string;
    dark: string;
}

export type Patch<Parent, Child> = Omit<Parent, keyof Child> & Child;

export type ImplicitUndefined<T> = Patch<T, { [P in keyof T as undefined extends T[P] ? P : never]?: T[P] }>;

export type ExplicitUndefined<T> = { [P in keyof T & {}]: T[P] };
