import { getEntry } from 'astro:content';
import { getLangs } from '../../../lib/content';

export async function getStaticPaths() {
  const langs = await getLangs();
  return langs.map((lang) => ({ params: { lang } }));
}

export async function GET({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const entry = await getEntry('lang', lang);
  if (!entry) {
    return new Response(JSON.stringify({}), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(entry.data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
