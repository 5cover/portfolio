import { getTypes } from '../../../lib/content';
import { indexById, jsonResponse } from '../../../lib/data';

export async function GET() {
    const entries = await getTypes('en');
    return jsonResponse(indexById(entries));
}
