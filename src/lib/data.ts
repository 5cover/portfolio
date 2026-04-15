import { get } from './infonodes';
import { tagKeys, tag } from '../catalog/tag';
import { defType, defTypesKeys } from '../catalog/def-type';
import { anchors as a } from '../catalog/anchor';
import type { Locale } from '../const';

export const defs = (l: Locale) => jsonResponse(get.def(l));
export const projects = (l: Locale) => jsonResponse(get.project(l));
export const tags = (l: Locale) => jsonResponse(Object.fromEntries(tagKeys.map(k => [k, tag(l, k)])));
export const defTypes = (l: Locale) => jsonResponse(Object.fromEntries(defTypesKeys.map(k => [k, defType(l, k)])));
export const anchors = () => jsonResponse(a);

function jsonResponse(data: unknown): Response {
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
