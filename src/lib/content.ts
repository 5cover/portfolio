import type { GalleryItem, Item, Link, LocalizedItem, Reference } from '../content/config';
import type { Locale, Localized } from '../i18n/site';
import { normalizeLocale } from '../i18n/site';
import { getCollection, getEntry, type CollectionEntry, type CollectionKey } from 'astro:content';

export type TextualKind = 'history' | 'history-body' | 'literature' | 'projects';

export function buildTextualId(loc: string, kind: TextualKind, id: string): string {
    return `${loc}/${kind}/${id}`;
}

function localizeProjectData(data: Item<'projects'>, loc: Locale): LocalizedItem<'projects'> {
    return {
        ...data,
        title: data.title[loc],
        abstract: data.abstract[loc],
        context: data.context[loc],
        links: data.links[loc],
        references: data.references[loc],
        gallery: data.gallery[loc],
    };
}

function localizeLiteratureData(data: Item<'literature'>, loc: Locale): LocalizedItem<'literature'> {
    return {
        ...data,
        title: data.title[loc],
        abstract: data.abstract[loc],
        links: data.links[loc],
        references: data.references[loc],
        gallery: data.gallery[loc],
    };
}

function localizeDefinitionData(data: Item<'definitions'>, loc: Locale): LocalizedItem<'definitions'> {
    return {
        ...data,
        name: {
            full: data.name.full[loc],
            abbr: data.name.abbr[loc],
            short: data.name.short[loc],
        },
        synopsis: data.synopsis[loc],
        wiki: data.wiki[loc],
    };
}

function localizeTagData(data: Item<'tags'>, loc: Locale): LocalizedItem<'tags'> {
    return {
        ...data,
        title: data.title[loc],
    };
}

function localizeTypeData(data: Item<'types'>, loc: Locale): LocalizedItem<'types'> {
    return {
        ...data,
        title: data.title[loc],
    };
}

function localizeHistoryData(data: Item<'history'>, loc: Locale): LocalizedItem<'history'> {
    return {
        ...data,
        title: data.title[loc],
        meta: data.meta[loc],
        year: data.year,
        media: data.media
            ? {
                  img: data.media.img,
                  alt: data.media.alt[loc],
              }
            : undefined,
    };
}

function localizePianoTileData(data: Item<'piano-tiles'>, loc: Locale): LocalizedItem<'piano-tiles'> {
    return {
        ...data,
        title: data.title[loc],
        summary: data.summary[loc],
    };
}

export type Entry<T> = readonly [id: string, data: T];

export async function getAnchors() {
    return (await getCollection('anchors')).map(e => [e.id, e.data] as const);
}

export async function getContacts() {
    return (await getCollection('contacts')).map(e => [e.id, e.data] as const);
}

export async function getProjects(loc: Locale) {
    return (await getCollection('projects')).map(e => [e.id, localizeProjectData(e.data, loc)] as const);
}

export async function getLiterature(loc: Locale) {
    return (await getCollection('literature')).map(e => [e.id, localizeLiteratureData(e.data, loc)] as const);
}

export async function getDefinitions(loc: Locale) {
    return (await getCollection('definitions')).map(e => [e.id, localizeDefinitionData(e.data, loc)] as const);
}

export async function getTags(loc: Locale) {
    return (await getCollection('tags')).map(e => [e.id, localizeTagData(e.data, loc)] as const);
}

export async function getTypes(loc: Locale) {
    return (await getCollection('types')).map(e => [e.id, localizeTypeData(e.data, loc)] as const);
}

export async function getHistory(loc: Locale) {
    return (await getCollection('history')).map(e => [e.id, localizeHistoryData(e.data, loc)] as const);
}

export async function getPianoTiles(loc: Locale) {
    return (await getCollection('piano-tiles')).map(e => [e.id, localizePianoTileData(e.data, loc)] as const);
}

export async function getTextualEntry(loc: string, kind: TextualKind, id: string) {
    const entryId = buildTextualId(loc, kind, id);
    const entry = await getEntry('textual', entryId);
    if (!entry) {
        throw new Error(`Missing textual body ${entryId}`);
    }
    return entry;
}

export function at<T>(entries: readonly Entry<T>[], id: string) {
    return entries.find(([eid]) => eid === id)?.[1];
}

export function mapById<T>(entries: readonly Entry<T>[]): Record<string, T> {
    return entries.reduce<Record<string, T>>((acc, [id, data]) => {
        acc[id] = data;
        return acc;
    }, {});
}
