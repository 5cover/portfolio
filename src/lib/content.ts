import type { Item, Link } from '../content.config';
import { Locales, normalizeLocale, type Locale } from '../i18n';
import { getCollection, getEntry, render, type CollectionKey } from 'astro:content';
import type { Copy } from './copy';

export type TextualKind = 'history' | 'history/body' | 'literature' | 'project';
export type Entry<T> = readonly [id: string, d: T];

export const contact = await getter('contact');

export const localizeLink = (d: Link)

export const project = await getterLocalized('project', (d, l) => ({
    ...d,
    title: loc(l, d.title),
    abstract: loc(l, d.abstract),
    context: loc(l, d.context),
    links: loc(l, d.links),
    references: loc(l, d.references),
    gallery: loc(l, d.gallery),
}));
export const literature = await getterLocalized('literature', (d, l) => ({
    ...d,
    title: loc(l, d.title),
    abstract: loc(l, d.abstract),
    links: loc(l, d.links),
    references: loc(l, d.references),
    gallery: loc(l, d.gallery),
}));
export const def = await getterLocalized('def', (d, l) => ({
    ...d,
    name: {
        full: loc(l, d.name.full),
        abbr: loc(l, d.name.abbr),
        short: loc(l, d.name.short),
    },
    synopsis: loc(l, d.synopsis),
    wiki: loc(l, d.wiki),
}));
export const history = await getterLocalized('history', (d, l) => ({
    ...d,
    title: loc(l, d.title),
    meta: loc(l, d.meta),
    year: d.year,
    media: d.media
        ? {
              img: d.media.img,
              alt: loc(l, d.media.alt),
          }
        : undefined,
}));
export const pianoTile = await getterLocalized('piano-tile', (d, l) => ({
    ...d,
    title: loc(l, d.title),
    summary: loc(l, d.summary),
}));

type Localized<T> = Record<Locale, T>;
function loc<T>(l: Locale, c: T | Localized<T>): T {
    const isLocalized = (c: T | Localized<T>): c is Localized<T> =>
        c !== null && typeof c === 'object' && Locales.every(l => l in c);
    if (isLocalized(c)) {
        return c[l];
    }
    return c;
}

export async function textual(locale: string, kind: TextualKind, id: string) {
    const entryId = buildTextualId(locale, kind, id);
    const entry = await getEntry('textual', entryId);
    if (!entry) {
        throw new Error(`Missing textual body ${entryId}`);
    }
    return (await render(entry)).Content;
}

function buildTextualId(locale: string, kind: TextualKind, id: string): string {
    return `${normalizeLocale(locale)}/${kind}/${id}`;
}

async function getterLocalized<K extends CollectionKey, U>(k: K, localize: (data: Item<K>, locale: Locale) => U) {
    const raw = await getCollection(k);
    type I = Readonly<U>;
    function get(locale: string | undefined, id: string): I;
    function get(locale: string | undefined): readonly Entry<I>[];
    function get(locale: string | undefined, id?: string): I | readonly Entry<I>[] {
        const l = normalizeLocale(locale);
        if (id === undefined) {
            return raw.map(e => [e.id, localize(e.data, l)] as const);
        }
        const item = raw.find(e => e.id === id);
        if (item === undefined) {
            throw new Error(`${k} of id '${id}' does not exist`);
        }
        return localize(item.data, l);
    }
    return get;
}

async function getter<K extends CollectionKey>(k: K) {
    const all = (await getCollection(k)).map(e => [e.id, e.data] as const as Entry<I>);
    type I = Readonly<Item<K>>;
    function get(id: string): I;
    function get(): readonly Entry<I>[];
    function get(id?: string): I | readonly Entry<I>[] {
        if (id === undefined) {
            return all;
        }
        const item = all.find(([eid]) => eid === id);
        if (item === undefined) {
            throw new Error(`${k} of id '${id}' does not exist`);
        }
        return item[1];
    }
    return get;
}
