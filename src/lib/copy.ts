import z from 'astro/zod';
import { badgeKeys, type BadgeKey } from '../catalog/badge';
import { locales, type Locale } from '../i18n';
import { capitalize as capitalizeStr } from './util';
import { astroParser, preactParser } from './Parser';

// Rich text "HTML as object" format for copy with inline formatting.

export type CompiledCopy =
    | null
    | string
    | CompiledCopy[]
    | { [K in keyof CopyNodes]: CompiledCopyNode<K> }[keyof CopyNodes];
export type copy =
    | null
    | string
    | copy[]
    | { [K in keyof CopyNodes]: CopyNodes[K] & { [T in K]: copy } }[keyof CopyNodes];

export interface CopyNodes {
    abbr: { title: string };
    time: { datetime: Date };
    badge: { key: BadgeKey };
    copy: { lang: Locale };
    p: object;
}

export interface CompiledCopyNode<K extends keyof CopyNodes> {
    /** Type */
    t: K;
    /** Properties */
    p: CopyNodes[K];
    /** Children */
    c: CompiledCopy;
}

export function copy(c: copy) {
    return new CopyClass(compile(c));
}

export type { CopyClass as Copy };

class CopyClass {
    constructor(readonly copy: CompiledCopy) {}
    capitalize() {
        return new CopyClass(capitalize(this.copy));
    }
    toString() {
        return stringify(this.copy);
    }
    astro() {
        return () => astroParser.parse(this.copy);
    }
    preact() {
        return preactParser.parse(this.copy);
    }
}

export const zCopy: z.ZodType<copy> = z
    .lazy(() =>
        z.union([
            z.string(),
            z.array(zCopy),
            z.strictObject({
                title: z.string(),
                abbr: zCopy,
            }),
            z.strictObject({
                datetime: z.date(),
                time: zCopy,
            }),
            z.strictObject({
                key: z.enum(badgeKeys),
                badge: zCopy,
            }),
            z.strictObject({
                lang: z.enum(locales),
                copy: zCopy,
            }),
            z.strictObject({
                p: zCopy,
            }),
        ])
    )
    .nullable();

function compile(c: copy): CompiledCopy {
    if (c === null) return null;
    if (typeof c === 'string') return c;
    if (Array.isArray(c)) return c.map(compile);
    const node = <K extends keyof CopyNodes>(k: K, c: Record<K, copy>, p: CopyNodes[K]): CompiledCopyNode<K> => ({
        // Must contain only declared keys (since later the parser uses object spread)
        p,
        t: k,
        c: compile(c[k]),
    });
    if ('abbr' in c) return node('abbr', c, { title: c.title });
    if ('time' in c) return node('time', c, { datetime: c.datetime });
    if ('badge' in c) return node('badge', c, { key: c.key });
    if ('copy' in c) return node('copy', c, { lang: c.lang });
    if ('p' in c) return node('p', c, {});
    throw new Error(`unknown copy node: ${JSON.stringify(c)}`);
}

function capitalize(c: CompiledCopy): CompiledCopy {
    if (c === null) return null;
    if (typeof c === 'string') return capitalizeStr(c);
    if (Array.isArray(c)) {
        const first = c.at(0);
        return first === undefined ? c : [capitalize(first), ...c.slice(1)];
    }
    return { ...c, c: capitalize(c.c) };
}
function stringify(c: CompiledCopy): string {
    if (c === null) return '';
    if (typeof c === 'string') return c;
    if (Array.isArray(c)) return c.map(stringify).join('');
    return stringify(c.c);
}

export function c(c: copy) {
    return copy(c).preact();
}
