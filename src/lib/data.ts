import * as content from './content';
import type { Locale } from '../i18n';
import { mapById, mapValues } from './util';
import tags, { localizeTag as localizeTag } from '../catalog/tag';
import defTypes, { localizeDefType as localizeDefType } from '../catalog/def-type';
import anchors from '../catalog/anchor';

export const def = async (l: Locale) => jsonResponse(mapById(content.def(l)));
export const project = async (l: Locale) => jsonResponse(mapById(content.project(l)));
export const tag = async (l: Locale) => jsonResponse(mapValues(tags, localizeTag(l)));
export const defType = async (l: Locale) => jsonResponse(mapValues(defTypes, localizeDefType(l)));
export const anchor = async () => jsonResponse(anchors);

function jsonResponse(data: unknown): Response {
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
