import type { GalleryItem, Link, Reference } from '../content.config';
import { loc, locopy, normalizeLocale, type Localize } from '../i18n';
import { getCollection, render, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { Locale } from '../const';
import { throwf } from './util';

export type Textual = AstroComponentFactory;
export type InfonodeKey = Exclude<CollectionKey, 'textual'>;
export type HasDetail = 'project' | 'literature' | 'history';

type Item<C extends InfonodeKey> = CollectionEntry<C>['data'];
type LocalizableCollections = 'project' | 'literature' | 'def' | 'history' | 'pianoTile';
type ResolvedItem<C extends InfonodeKey> = C extends LocalizableCollections ? Localize<Item<C>> : Item<C>;
type ResolvedItems = {
    [C in InfonodeKey]: ResolvedItem<C> &
        (C extends keyof InfonodeTextualProps ? Record<InfonodeTextualProps[C], Textual> : unknown);
};
type InfonodeTextualProps = {
    history: 'body' | 'description';
    literature: 'body';
    project: 'body';
};

type InfonodeOf<C extends InfonodeKey> = {
    id: string;
    type: C;
    data: ResolvedItems[C];
};
type Infonodes = {
    [C in InfonodeKey]: InfonodeOf<C>;
};

export type Infonode<C extends InfonodeKey = InfonodeKey> = Infonodes[C];

const locLink = (l: Locale) => (d: Link) => ({
    ...d,
    href: loc(l, d.href),
    label: locopy(l, d.label),
});

const locRef = (l: Locale) => (d: Reference) => ({
    ...d,
    caption: locopy(l, d.caption),
    href: loc(l, d.href),
});

const locGalleryItem = (l: Locale) => (d: GalleryItem) => ({
    ...d,
    caption: locopy(l, d.caption),
});

export const get = {
    contact: await getter('contact', (_, d) => d),
    project: await getter('project', (l, d, id) => ({
        ...d,
        title: locopy(l, d.title),
        abstract: locopy(l, d.abstract),
        context: locopy(l, d.context),
        links: d.links.map(locLink(l)),
        references: d.references.map(locRef(l)),
        gallery: d.gallery.map(locGalleryItem(l)),
        body: textual(l, 'project', id, 'body'),
    })),
    literature: await getter('literature', (l, d, id) => ({
        ...d,
        title: locopy(l, d.title),
        abstract: locopy(l, d.abstract),
        links: d.links.map(locLink(l)),
        references: d.references.map(locRef(l)),
        gallery: d.gallery.map(locGalleryItem(l)),
        body: textual(l, 'literature', id, 'body'),
    })),
    def: await getter('def', (l, d) => ({
        ...d,
        name: {
            full: locopy(l, d.name.full),
            abbr: locopy(l, d.name.abbr),
            short: locopy(l, d.name.short),
        },
        synopsis: locopy(l, d.synopsis),
        wiki: loc(l, d.wiki),
    })),
    history: await getter('history', (l, d, id) => ({
        ...d,
        title: locopy(l, d.title),
        meta: locopy(l, d.meta),
        year: d.year,
        media: d.media
            ? {
                  img: d.media.img,
                  alt: loc(l, d.media.alt),
              }
            : undefined,
        body: textual(l, 'history', id, 'body'),
        description: textual(l, 'history', id, 'description'),
    })),
    pianoTile: await getter('pianoTile', (l, d) => ({
        ...d,
        title: locopy(l, d.title),
        summary: locopy(l, d.summary),
    })),
};

const textuals = Object.fromEntries(
    await Promise.all((await getCollection('textual')).map(async item => [item.id, (await render(item)).Content]))
);

function textual(locale: string | undefined, type: keyof InfonodeTextualProps, id: string, prop: string): Textual {
    const entryId = `${normalizeLocale(locale)}/${type}/${id}/${prop}`;
    const entry = textuals[entryId];
    return entry ?? throwf(`Missing textual body ${entryId}`);
}

async function getter<C extends InfonodeKey>(
    type: C,
    resolve: (locale: Locale, data: Item<C>, id: string) => ResolvedItems[C]
) {
    const raw = await getCollection(type);
    type I = InfonodeOf<C>;

    function get(locale: string | undefined, id: string): I;
    function get(locale: string | undefined): readonly I[];
    function get(locale: string | undefined, id?: string): I | readonly I[] {
        const l = normalizeLocale(locale);
        if (id === undefined) {
            return raw.map(({ id, data }) => ({ type, id, data: resolve(l, data, id) }) as const);
        }
        const item = raw.find(e => e.id === id);
        if (item === undefined) {
            throw new Error(`${type} of id '${id}' does not exist`);
        }
        return { type, id, data: resolve(l, item.data, id) };
    }
    return get;
}
