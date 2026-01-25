import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export type AnchorEntry = CollectionEntry<'anchors'>;
export type ContactEntry = CollectionEntry<'contacts'>;
export type DefinitionEntry = CollectionEntry<'definitions'>;
export type HistoryEntry = CollectionEntry<'history'>;
export type LangEntry = CollectionEntry<'lang'>;
export type LiteratureEntry = CollectionEntry<'literature'>;
export type PianoTileEntry = CollectionEntry<'piano-tiles'>;
export type ProjectEntry = CollectionEntry<'projects'>;
export type TagEntry = CollectionEntry<'tags'>;
export type TextualEntry = CollectionEntry<'textual'>;
export type TypeEntry = CollectionEntry<'types'>;

export type TextualKind = 'history' | 'history-body' | 'literature' | 'projects';
export type Locale = 'en' | 'fr';
export type Localized<T> = Record<Locale, T>;

export type ProjectData = ProjectEntry['data'];
export type ProjectLink = ProjectData['links']['en'][number];
export type ProjectReference = ProjectData['references']['en'][number];
export type ProjectGalleryItem = ProjectData['gallery']['en'][number];

export type ProjectLocalizedData = Omit<
    ProjectData,
    'title' | 'abstract' | 'context' | 'links' | 'references' | 'gallery'
> & {
    title: string;
    abstract: string;
    context: string | null;
    links: ProjectLink[];
    references: ProjectReference[];
    gallery: ProjectGalleryItem[];
};

export type LocalizedProjectEntry = Omit<ProjectEntry, 'data'> & {
    data: ProjectLocalizedData;
};

export type LiteratureData = LiteratureEntry['data'];
export type LiteratureLink = LiteratureData['links']['en'][number];
export type LiteratureReference = LiteratureData['references']['en'][number];
export type LiteratureGalleryItem = LiteratureData['gallery']['en'][number];

export type LiteratureLocalizedData = Omit<
    LiteratureData,
    'title' | 'abstract' | 'links' | 'references' | 'gallery'
> & {
    title: string;
    abstract: string;
    links: LiteratureLink[];
    references: LiteratureReference[];
    gallery: LiteratureGalleryItem[];
};

export type LocalizedLiteratureEntry = Omit<LiteratureEntry, 'data'> & {
    data: LiteratureLocalizedData;
};

export type DefinitionData = DefinitionEntry['data'];
export type DefinitionLocalizedData = Omit<DefinitionData, 'name' | 'synopsis' | 'wiki'> & {
    name: {
        full: string;
        abbr: string | null;
        short: string | null;
    };
    synopsis: string;
    wiki: string;
};

export type LocalizedDefinitionEntry = Omit<DefinitionEntry, 'data'> & {
    data: DefinitionLocalizedData;
};

export type TagData = TagEntry['data'];
export type TagLocalizedData = Omit<TagData, 'title'> & { title: string };
export type LocalizedTagEntry = Omit<TagEntry, 'data'> & { data: TagLocalizedData };

export type TypeData = TypeEntry['data'];
export type TypeLocalizedData = Omit<TypeData, 'title'> & { title: string };
export type LocalizedTypeEntry = Omit<TypeEntry, 'data'> & { data: TypeLocalizedData };

export type HistoryData = HistoryEntry['data'];
export type HistoryLocalizedData = Omit<HistoryData, 'title' | 'meta' | 'media'> & {
    title: string;
    meta: string;
    media: {
        year: number;
        img: string;
        alt: string;
    } | null;
};

export type LocalizedHistoryEntry = Omit<HistoryEntry, 'data'> & {
    data: HistoryLocalizedData;
};

export type PianoTileData = PianoTileEntry['data'];
export type PianoTileLocalizedData = Omit<PianoTileData, 'title' | 'summary'> & {
    title: string;
    summary: string;
};

export type LocalizedPianoTileEntry = Omit<PianoTileEntry, 'data'> & {
    data: PianoTileLocalizedData;
};

export function buildTextualId(lang: string, kind: TextualKind, id: string): string {
    return `${lang}/${kind}/${id}`;
}

function normalizeLang(lang: string): Locale {
    return lang === 'fr' ? 'fr' : 'en';
}

function localizeValue<T>(value: Localized<T>, lang: string): T {
    const key = normalizeLang(lang);
    return value[key];
}

function localizeProjectData(data: ProjectData, lang: string): ProjectLocalizedData {
    return {
        ...data,
        title: localizeValue(data.title, lang),
        abstract: localizeValue(data.abstract, lang),
        context: localizeValue(data.context, lang),
        links: localizeValue(data.links, lang),
        references: localizeValue(data.references, lang),
        gallery: localizeValue(data.gallery, lang),
    };
}

function localizeLiteratureData(data: LiteratureData, lang: string): LiteratureLocalizedData {
    return {
        ...data,
        title: localizeValue(data.title, lang),
        abstract: localizeValue(data.abstract, lang),
        links: localizeValue(data.links, lang),
        references: localizeValue(data.references, lang),
        gallery: localizeValue(data.gallery, lang),
    };
}

function localizeDefinitionData(data: DefinitionData, lang: string): DefinitionLocalizedData {
    return {
        ...data,
        name: {
            full: localizeValue(data.name.full, lang),
            abbr: localizeValue(data.name.abbr, lang),
            short: localizeValue(data.name.short, lang),
        },
        synopsis: localizeValue(data.synopsis, lang),
        wiki: localizeValue(data.wiki, lang),
    };
}

function localizeTagData(data: TagData, lang: string): TagLocalizedData {
    return {
        ...data,
        title: localizeValue(data.title, lang),
    };
}

function localizeTypeData(data: TypeData, lang: string): TypeLocalizedData {
    return {
        ...data,
        title: localizeValue(data.title, lang),
    };
}

function localizeHistoryData(data: HistoryData, lang: string): HistoryLocalizedData {
    return {
        ...data,
        title: localizeValue(data.title, lang),
        meta: localizeValue(data.meta, lang),
        media: data.media
            ? {
                  year: data.media.year,
                  img: data.media.img,
                  alt: localizeValue(data.media.alt, lang),
              }
            : null,
    };
}

function localizePianoTileData(data: PianoTileData, lang: string): PianoTileLocalizedData {
    return {
        ...data,
        title: localizeValue(data.title, lang),
        summary: localizeValue(data.summary, lang),
    };
}

export async function getLangs(): Promise<string[]> {
    const meta = await getEntry('meta', 'langs');
    return meta?.data.langs ?? [];
}

export async function getLangData(lang: string): Promise<LangEntry['data']> {
    const entry = await getEntry('lang', lang);
    if (!entry) {
        throw new Error(`Missing lang data for ${lang}`);
    }
    return entry.data;
}

export async function getAnchors(): Promise<AnchorEntry[]> {
    return getCollection('anchors');
}

export async function getContacts(): Promise<ContactEntry[]> {
    return getCollection('contacts');
}

export async function getProjects(lang: string): Promise<LocalizedProjectEntry[]> {
    const entries = await getCollection('projects');
    return entries.map(entry => ({
        ...entry,
        data: localizeProjectData(entry.data, lang),
    }));
}

export async function getProjectById(lang: string, id: string): Promise<LocalizedProjectEntry> {
    const entries = await getProjects(lang);
    const match = entries.find(entry => entry.id === id);
    if (!match) {
        throw new Error(`Missing project ${id} for ${lang}`);
    }
    return match;
}

export async function getLiterature(lang: string): Promise<LocalizedLiteratureEntry[]> {
    const entries = await getCollection('literature');
    return entries.map(entry => ({
        ...entry,
        data: localizeLiteratureData(entry.data, lang),
    }));
}

export async function getLiteratureById(lang: string, id: string): Promise<LocalizedLiteratureEntry> {
    const entries = await getLiterature(lang);
    const match = entries.find(entry => entry.id === id);
    if (!match) {
        throw new Error(`Missing literature ${id} for ${lang}`);
    }
    return match;
}

export async function getDefinitions(lang: string): Promise<LocalizedDefinitionEntry[]> {
    const entries = await getCollection('definitions');
    return entries.map(entry => ({
        ...entry,
        data: localizeDefinitionData(entry.data, lang),
    }));
}

export async function getTags(lang: string): Promise<LocalizedTagEntry[]> {
    const entries = await getCollection('tags');
    return entries.map(entry => ({
        ...entry,
        data: localizeTagData(entry.data, lang),
    }));
}

export async function getTypes(lang: string): Promise<LocalizedTypeEntry[]> {
    const entries = await getCollection('types');
    return entries.map(entry => ({
        ...entry,
        data: localizeTypeData(entry.data, lang),
    }));
}

export async function getHistory(lang: string): Promise<LocalizedHistoryEntry[]> {
    const entries = await getCollection('history');
    return entries
        .map(entry => ({
            ...entry,
            data: localizeHistoryData(entry.data, lang),
        }))
        .sort((a, b) => a.data.order - b.data.order);
}

export async function getPianoTiles(lang: string): Promise<LocalizedPianoTileEntry[]> {
    const entries = await getCollection('piano-tiles');
    return entries
        .map(entry => ({
            ...entry,
            data: localizePianoTileData(entry.data, lang),
        }))
        .sort((a, b) => a.data.order - b.data.order);
}

export async function getTextualEntry(lang: string, kind: TextualKind, id: string): Promise<TextualEntry> {
    const entryId = buildTextualId(lang, kind, id);
    const entry = await getEntry('textual', entryId);
    if (!entry) {
        throw new Error(`Missing textual body ${entryId}`);
    }
    return entry;
}

export function mapById<T extends { id: string; data: U }, U = T['data']>(
    entries: T[]
): Record<string, U> {
    return entries.reduce<Record<string, U>>((acc, entry) => {
        acc[entry.id] = entry.data;
        return acc;
    }, {});
}
