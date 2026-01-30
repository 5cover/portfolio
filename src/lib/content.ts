import type { Item, LocalizedItem } from '../content.config';
import { normalizeLocale, type Locale } from '../i18n/site';
import { getCollection, getEntry, render, type CollectionKey } from 'astro:content';

export type TextualKind = 'history' | 'history-body' | 'literature' | 'projects';
export type Entry<T> = readonly [id: string, d: T];

export const anchor = await getter('anchor');
export const contact = await getter('contact');
export const project = await getterLocalized('project', (d, l) => ({
    ...d,
    title: d.title[l],
    abstract: d.abstract[l],
    context: d.context[l],
    links: d.links[l],
    references: d.references[l],
    gallery: d.gallery[l],
}));
export const literature = await getterLocalized('literature', (d, l) => ({
    ...d,
    title: d.title[l],
    abstract: d.abstract[l],
    links: d.links[l],
    references: d.references[l],
    gallery: d.gallery[l],
}));
export const def = await getterLocalized('def', (d, l) => ({
    ...d,
    name: {
        full: d.name.full[l],
        abbr: d.name.abbr[l],
        short: d.name.short[l],
    },
    synopsis: d.synopsis[l],
    wiki: d.wiki[l],
}));
export const tag = await getterLocalized('tag', (d, l) => ({
    ...d,
    title: d.title[l],
}));
export const defType = await getterLocalized('def-type', (d, l) => ({
    ...d,
    title: d.title[l],
}));
export const history = await getterLocalized('history', (d, l) => ({
    ...d,
    title: d.title[l],
    meta: d.meta[l],
    year: d.year,
    media: d.media
        ? {
              img: d.media.img,
              alt: d.media.alt[l],
          }
        : undefined,
}));
export const pianoTile = await getterLocalized('piano-tile', (d, l) => ({
    ...d,
    title: d.title[l],
    summary: d.summary[l],
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

async function getterLocalized<K extends CollectionKey>(
    k: K,
    localize: (data: Item<K>, locale: Locale) => LocalizedItem<K>
) {
    const raw = await getCollection(k);
    type I = Readonly<LocalizedItem<K>>;
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
