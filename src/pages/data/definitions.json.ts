import { getDefinitions } from '../../lib/content';
import { indexById, jsonResponse } from '../../lib/data';

export async function GET() {
    const entries = await getDefinitions('fr');
    return jsonResponse(indexById(entries));
}
