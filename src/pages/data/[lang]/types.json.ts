import { getLangs, getTypes } from '../../../lib/content';

export async function getStaticPaths() {
  const langs = await getLangs();
  return langs.map((lang) => ({ params: { lang } }));
}

export async function GET({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const entries = await getTypes(lang);
  const data = entries.reduce<Record<string, unknown>>((acc, entry) => {
    acc[entry.id] = entry.data;
    return acc;
  }, {});

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
