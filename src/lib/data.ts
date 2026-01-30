import { getCollection } from 'astro:content';
import { getAnchors, getDefinitions, getProjects, getTags, getTypes, mapById } from './content';
import type { Item } from '../content/config';
import type { Locale } from '../i18n/site';

export const definitions = async (locale: Locale) => jsonResponse(mapById(await getDefinitions(locale)));
export const projects = async (locale: Locale) => jsonResponse(mapById(await getProjects(locale)));
export const tags = async (locale: Locale) => jsonResponse(mapById(await getTags(locale)));
export const types = async (locale: Locale) => jsonResponse(mapById(await getTypes(locale)));
export const anchors = async () => jsonResponse(mapById(await getAnchors()));

function jsonResponse(data: unknown): Response {
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
