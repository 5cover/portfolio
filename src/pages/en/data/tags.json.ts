import { getTags } from '../../../lib/content';
import { indexById, jsonResponse } from '../../../lib/data';

export async function GET() {
    const entries = await getTags('en');
    return jsonResponse(indexById(entries));
}
