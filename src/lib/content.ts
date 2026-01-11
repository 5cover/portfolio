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
export type TypeEntry = CollectionEntry<'types'>;

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

export async function getProjects(lang: string): Promise<ProjectEntry[]> {
  const entries = await getCollection('projects');
  return entries.filter((entry) => entry.data.lang === lang);
}

export async function getProjectById(lang: string, id: string): Promise<ProjectEntry> {
  const entries = await getProjects(lang);
  const match = entries.find((entry) => entry.data.id === id);
  if (!match) {
    throw new Error(`Missing project ${id} for ${lang}`);
  }
  return match;
}

export async function getLiterature(lang: string): Promise<LiteratureEntry[]> {
  const entries = await getCollection('literature');
  return entries.filter((entry) => entry.data.lang === lang);
}

export async function getLiteratureById(lang: string, id: string): Promise<LiteratureEntry> {
  const entries = await getLiterature(lang);
  const match = entries.find((entry) => entry.data.id === id);
  if (!match) {
    throw new Error(`Missing literature ${id} for ${lang}`);
  }
  return match;
}

export async function getDefinitions(lang: string): Promise<DefinitionEntry[]> {
  const entries = await getCollection('definitions');
  return entries.filter((entry) => entry.data.lang === lang);
}

export async function getTags(lang: string): Promise<TagEntry[]> {
  const entries = await getCollection('tags');
  return entries.filter((entry) => entry.data.lang === lang);
}

export async function getTypes(lang: string): Promise<TypeEntry[]> {
  const entries = await getCollection('types');
  return entries.filter((entry) => entry.data.lang === lang);
}

export async function getHistory(lang: string): Promise<HistoryEntry[]> {
  const entries = await getCollection('history');
  return entries
    .filter((entry) => entry.data.lang === lang)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getPianoTiles(lang: string): Promise<PianoTileEntry[]> {
  const entries = await getCollection('piano-tiles');
  return entries
    .filter((entry) => entry.data.lang === lang)
    .sort((a, b) => a.data.order - b.data.order);
}

export function mapById<T extends { data: { id: string } }>(
  entries: T[]
): Record<string, T['data']> {
  return entries.reduce<Record<string, T['data']>>((acc, entry) => {
    acc[entry.data.id] = entry.data;
    return acc;
  }, {});
}
