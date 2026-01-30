import { projects } from '../../../lib/data';
export function GET() {
    return projects('fr');
}
