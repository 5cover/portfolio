import { getCollection } from 'astro:content';
import { jsonResponse } from '../../../lib/data';
import type { Item } from '../../../content/collections';

export async function GET() {
    const anchors = await getCollection('anchors');
    const data = anchors.reduce<Record<string, Item<'anchor'>>>((acc, entry) => {
        acc[entry.id] = entry.data;
        return acc;
    }, {});

    return jsonResponse(data);
}
