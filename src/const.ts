export const literatureKinds = ['passion', 'blog', 'story'] as const;
export type LiteratureKind = (typeof literatureKinds)[number];
export const locales = ['fr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const navItemPages = ['projects', 'history', ...literatureKinds, 'history/history-but'] as const;
export type NavItemPage = (typeof navItemPages)[number];
