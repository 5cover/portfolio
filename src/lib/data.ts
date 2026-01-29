import { getCollection } from "astro:content";
import { getDefinitions, getProjects, getTags, getTypes, type Locale } from "./content";
import type { Item } from "../content/config";

export async function anchors() {
  const anchors = await getCollection('anchors');
  const data = anchors.reduce<Record<string, Item<'anchors'>>>((acc, entry) => {
    acc[entry.id] = entry.data;
    return acc;
  }, {});

  return jsonResponse(data);
}

export const definitions = async(locale: Locale) => jsonResponse(indexById(await getDefinitions(locale)))
export const projects = async(locale: Locale) => jsonResponse(indexById(await getProjects(locale)))
export const tags = async(locale: Locale) => jsonResponse(indexById(await getTags(locale)))
export const types = async(locale: Locale) => jsonResponse(indexById(await getTypes(locale)))

function jsonResponse(data: unknown): Response {
    return new Response(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

function indexById<T extends { id: string; data: unknown }>(entries: T[]): Record<string, unknown> {
    return entries.reduce<Record<string, unknown>>((acc, entry) => {
        acc[entry.id] = entry.data;
        return acc;
    }, {});
}