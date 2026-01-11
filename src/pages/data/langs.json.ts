import { getEntry } from 'astro:content';

export async function GET() {
  const entry = await getEntry('meta', 'langs');
  const data = entry?.data.langs ?? [];

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
