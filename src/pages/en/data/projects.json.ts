import { getProjects } from '../../../lib/content';
import { indexById, jsonResponse } from '../../../lib/data';

export async function GET() {
    const entries = await getProjects('en');
    return jsonResponse(indexById(entries));
}
