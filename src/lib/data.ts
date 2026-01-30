import * as content from './content';
import type { Locale } from '../i18n/site';
import { mapById } from './util';

export const def = async (locale: Locale) => jsonResponse(mapById(content.def(locale)));
export const project = async (locale: Locale) => jsonResponse(mapById(content.project(locale)));
export const tag = async (locale: Locale) => jsonResponse(mapById(content.tag(locale)));
export const defType = async (locale: Locale) => jsonResponse(mapById(content.defType(locale)));
export const anchor = async () => jsonResponse(mapById(content.anchor()));

function jsonResponse(data: unknown): Response {
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
