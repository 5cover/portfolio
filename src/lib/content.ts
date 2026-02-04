import type { GalleryItem, Item, Link, Reference } from '../content.config';
import { loc, normalizeLocale, type Locale, type Localize } from '../i18n';
import { getCollection, getEntry, render, type CollectionKey } from 'astro:content';

export type TextualKind = 'history' | 'history/body' | 'literature' | 'project';
export type Entry<T> = readonly [id: string, d: T];
export type LocalizedItem<C extends CollectionKey> = Localize<Item<C>>;

export const contact = await getter('contact');

const locLink = (l: Locale) => (d: Link) => ({
    ...d,
    href: loc(l, d.href),
    label: loc(l, d.label),
});

const locRef = (l: Locale) => (d: Reference) => ({
    ...d,
    caption: loc(l, d.caption),
    href: loc(l, d.href),
});

const locGalleryItem = (l: Locale) => (d: GalleryItem) => ({
    ...d,
    caption: loc(l, d.caption),
});

export const project = await getterLocalized('project', (l, d) => ({
    ...d,
    title: loc(l, d.title),
    abstract: loc(l, d.abstract),
    context: loc(l, d.context),
    links: d.links.map(locLink(l)),
    references: d.references.map(locRef(l)),
    gallery: d.gallery.map(locGalleryItem(l)),
}));

export const literature = await getterLocalized('literature', (l, d) => ({
    ...d,
    title: loc(l, d.title),
    abstract: loc(l, d.abstract),
    links: d.links.map(locLink(l)),
    references: d.references.map(locRef(l)),
    gallery: d.gallery.map(locGalleryItem(l)),
}));
export const def = await getterLocalized('def', (l, d) => ({
    ...d,
    name: {
        full: loc(l, d.name.full),
        abbr: loc(l, d.name.abbr),
        short: loc(l, d.name.short),
    },
    synopsis: loc(l, d.synopsis),
    wiki: loc(l, d.wiki),
}));
export const history = await getterLocalized('history', (l, d) => ({
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
export const pianoTile = await getterLocalized('piano-tile', (l, d) => ({
    ...d,
    title: loc(l, d.title),
    summary: loc(l, d.summary),
}));

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

async function getterLocalized<K extends CollectionKey, U>(k: K, localize: (locale: Locale, data: Item<K>) => U) {
    const raw = await getCollection(k);
    type I = Readonly<U>;
    function get(locale: string | undefined, id: string): I;
    function get(locale: string | undefined): readonly Entry<I>[];
    function get(locale: string | undefined, id?: string): I | readonly Entry<I>[] {
        const l = normalizeLocale(locale);
        if (id === undefined) {
            return raw.map(e => [e.id, localize(l, e.data)] as const);
        }
        const item = raw.find(e => e.id === id);
        if (item === undefined) {
            throw new Error(`${k} of id '${id}' does not exist`);
        }
        return localize(l, item.data);
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
