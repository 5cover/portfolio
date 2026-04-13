export type Context = {
    level: number;
}
export type PropsBase = {
    c: Readonly<Context>;
}

export type NavItem = {
    page: string;
    label: string;
}

export type LanguageInfo = {
    code: string;
    name: string;
    flagClass: string;
    names: Record<string, string>;
}

export type ThemeLabels = {
    light: string;
    system: string;
    dark: string;
}

export type Patch<Parent, Child> = Omit<Parent, keyof Child> & Child;

export type ImplicitUndefined<T> = Patch<T, { [P in keyof T as undefined extends T[P] ? P : never]?: T[P] }>;

export type ExplicitUndefined<T> = { [P in keyof T & {}]: T[P] };
