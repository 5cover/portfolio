import * as content from './content';
import type { Locale } from '../i18n';
import { tagKeys, tag } from '../catalog/tag';
import { defType, defTypesKeys } from '../catalog/def-type';

export const defs = async (l: Locale) => jsonResponse(Object.fromEntries(content.def(l)));
export const projects = async (l: Locale) => jsonResponse(Object.fromEntries(content.project(l)));
export const tags = async (l: Locale) => jsonResponse(Object.fromEntries(tagKeys.map(k => [k, tag(l, k)])));
export const defTypes = async (l: Locale) =>
    jsonResponse(Object.fromEntries(defTypesKeys.map(k => [k, defType(l, k)])));
export const anchors = async () => jsonResponse(anchors);

function jsonResponse(data: unknown): Response {
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
