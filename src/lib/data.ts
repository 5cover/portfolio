import * as content from './content';
import { tagKeys, tag } from '../catalog/tag';
import { defType, defTypesKeys } from '../catalog/def-type';
import { anchors as a } from '../catalog/anchor';
import type { Locale } from '../const';

export const defs = async (l: Locale) => jsonResponse(Object.fromEntries(content.def(l)));
export const projects = async (l: Locale) => jsonResponse(Object.fromEntries(content.project(l)));
export const tags = async (l: Locale) => jsonResponse(Object.fromEntries(tagKeys.map(k => [k, tag(l, k)])));
export const defTypes = async (l: Locale) =>
    jsonResponse(Object.fromEntries(defTypesKeys.map(k => [k, defType(l, k)])));
export const anchors = async () => jsonResponse(a);

function jsonResponse(data: unknown): Response {
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
