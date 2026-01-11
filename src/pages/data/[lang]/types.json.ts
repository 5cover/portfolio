import { getCollection } from 'astro:content';
import { getLangs } from '../../../lib/content';

export async function getStaticPaths() {
  const langs = await getLangs();
  return langs.map((lang) => ({ params: { lang } }));
}

export async function GET({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const entries = await getCollection('types');
  const data = entries
    .filter((entry) => entry.data.lang === lang)
    .reduce<Record<string, unknown>>((acc, entry) => {
      acc[entry.data.id] = entry.data;
      return acc;
    }, {});

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
