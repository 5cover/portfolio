import { getTags } from '../../lib/content';
import { indexById, jsonResponse } from '../../lib/data';

export async function GET() {
    const entries = await getTags('fr');
    return jsonResponse(indexById(entries));
}
