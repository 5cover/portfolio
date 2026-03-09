import type { GalleryItem, Link, Reference } from '../content.config';
import { loc, locopy, normalizeLocale, type Localize } from '../i18n';
import { getCollection, getEntry, render, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import * as mdx from '@mdx-js/mdx';
import { readFileSync } from 'fs';
import { Fragment } from 'preact/jsx-runtime';
import type { Locale } from '../const';

export type TextualKind = 'history' | 'history/body' | 'literature' | 'project';
type Item<C extends CollectionKey> = CollectionEntry<C>['data'];

type LocalizableCollections = 'project' | 'literature' | 'def' | 'history' | 'piano-tile';
type ResolvedItem<C extends CollectionKey> = C extends LocalizableCollections ? Localize<Item<C>> : Item<C>;
type ResolvedItems = {
    [C in CollectionKey]: ResolvedItem<C>;
};
type InfonodeOf<C extends CollectionKey> = {
    id: string;
    type: C;
    data: ResolvedItems[C];
};
type Infonodes = {
    [C in CollectionKey]: InfonodeOf<C>;
};

export type Infonode<C extends CollectionKey = CollectionKey> = Infonodes[C];

const x: Infonode = { id: 'a', data: {} as Infonode<'project'>['data'], type: 'project' };
switch (x.type) {
    case 'project':
        x.data satisfies ResolvedItem<'project'>;
}

export const contact = await getter('contact', (_, d) => d);

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

export const project = await getter('project', (l, d) => ({
    ...d,
    title: locopy(l, d.title),
    abstract: locopy(l, d.abstract),
    context: locopy(l, d.context),
    links: d.links.map(locLink(l)),
    references: d.references.map(locRef(l)),
    gallery: d.gallery.map(locGalleryItem(l)),
}));

export const literature = await getter('literature', (l, d) => ({
    ...d,
    title: locopy(l, d.title),
    abstract: locopy(l, d.abstract),
    links: d.links.map(locLink(l)),
    references: d.references.map(locRef(l)),
    gallery: d.gallery.map(locGalleryItem(l)),
}));
export const def = await getter('def', (l, d) => ({
    ...d,
    name: {
        full: locopy(l, d.name.full),
        abbr: locopy(l, d.name.abbr),
        short: locopy(l, d.name.short),
    },
    synopsis: locopy(l, d.synopsis),
    wiki: loc(l, d.wiki),
}));
export const history = await getter('history', (l, d) => ({
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
}));

export const pianoTile = await getter('piano-tile', (l, d) => ({
    ...d,
    title: locopy(l, d.title),
    summary: locopy(l, d.summary),
}));

export type Textual = Promise<AstroComponentFactory>;
export async function textual(locale: string | undefined, kind: TextualKind, id: string): Textual {
    const entryId = buildTextualId(locale, kind, id);
    const entry = await getEntry('textual', entryId);
    if (!entry) {
        throw new Error(`Missing textual body ${entryId}`);
    }
    return (await render(entry)).Content;
}

export function textual2(locale: string | undefined, kind: TextualKind, id: string) {
    const entryId = buildTextualId(locale, kind, id);
    return mdx.evaluateSync(readFileSync('src/content/textual/' + entryId), { Fragment }).default;
}

function buildTextualId(locale: string | undefined, kind: TextualKind, id: string): string {
    return `${normalizeLocale(locale)}/${kind}/${id}`;
}

async function getter<C extends CollectionKey>(type: C, resolve: (locale: Locale, data: Item<C>) => ResolvedItems[C]) {
    const raw = await getCollection(type);
    type I = InfonodeOf<C>;
    function get(locale: string | undefined, id: string): I;
    function get(locale: string | undefined): readonly I[];
    function get(locale: string | undefined, id?: string): I | readonly I[] {
        const l = normalizeLocale(locale);
        if (id === undefined) {
            return raw.map(({ id, data }) => ({ type, id, data: resolve(l, data) }) as const);
        }
        const item = raw.find(e => e.id === id);
        if (item === undefined) {
            throw new Error(`${type} of id '${id}' does not exist`);
        }
        return { type, id, data: resolve(l, item.data) };
    }
    return get;
}
