import { getCollection } from 'astro:content';
import { jsonResponse } from '../../lib/data';

export async function GET() {
  const anchors = await getCollection('anchors');
  const data = anchors.reduce<Record<string, unknown>>((acc, entry) => {
    acc[entry.id] = {
      url: entry.data.url,
      isThemedSvg: entry.data.isThemedSvg,
    };
    return acc;
  }, {});

  return jsonResponse(data);
}
