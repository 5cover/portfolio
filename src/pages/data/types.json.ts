import { getTypes } from '../../lib/content';
import { indexById, jsonResponse } from '../../lib/data';

export async function GET() {
    const entries = await getTypes('fr');
    return jsonResponse(indexById(entries));
}
