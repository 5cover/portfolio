import { projects } from '../../../lib/data';
export function GET() {
    return projects('en');
}
