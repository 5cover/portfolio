import z from 'astro/zod';
import { badgeKeys, type BadgeKey } from '../catalog/badge';
import { locales, type Locale } from '../i18n';
import { capitalize as capitalizeStr, isArray } from './util';
import { astroParser, preactParser } from './Parser';

// Rich text "HTML as object" format for copy with inline formatting.

export type CompiledCopy =
    | null
    | string
    | readonly CompiledCopy[]
    | (CommonElemAttrs & { [K in keyof CopyElems]: Readonly<CompiledElem<K>> }[keyof CopyElems])
    | { [K in keyof CopyVoids]: Readonly<CompiledVoid<K>> }[keyof CopyVoids];
export type copy =
    | null
    | string
    | readonly copy[]
    | (CommonElemAttrs &
          { [K in keyof CopyElems]: Readonly<CopyElems[K]> & { readonly [T in K]: copy } }[keyof CopyElems])
    | { [K in keyof CopyVoids]: Readonly<Record<K, CopyVoids[K]>> }[keyof CopyVoids];

interface CommonElemAttrs {
    lang?: Locale;
}

export interface CopyElems {
    abbr: { title: string };
    time: { datetime?: string };
    badge: { key: BadgeKey };
    copy: object;
    p: object;
    code: object;
    em: object;
    strong: object;
    a: { href: string };
    q: { cite?: string };
}

export interface CopyVoids {
    def: string;
}

export interface CompiledElem<K extends keyof CopyElems> {
    /** Type */
    t: K;
    /** Properties */
    p: CommonElemAttrs & CopyElems[K];
    /** Children */
    c: CompiledCopy;
}

export interface CompiledVoid<K extends keyof CopyVoids> {
    /** Type */
    t: K;
    /** Properties */
    p: CopyVoids[K];
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

const commonAttrsElemn = {
    lang: z.enum(locales).optional(),
} as const;

export const zCopy: z.ZodType<copy> = z
    .lazy(() =>
        z.union([
            z.string(),
            z.array(zCopy),
            z.strictObject({
                ...commonAttrsElemn,
                title: z.string(),
                abbr: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElemn,
                datetime: z.string().optional(), // We could validate this. We could. I won't.
                time: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElemn,
                key: z.enum(badgeKeys),
                badge: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElemn,
                copy: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElemn,
                p: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElemn,
                code: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElemn,
                em: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElemn,
                strong: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElemn,
                href: z.string(),
                a: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElemn,
                cite: z.string().optional(),
                q: zCopy,
            }),

            z.strictObject({
                def: z.string(),
            }),
        ])
    )
    .nullable();

function compile(c: copy): CompiledCopy {
    if (c === null) return null;
    if (typeof c === 'string') return c;
    if (isArray(c)) return c.map(compile);
    const nodeElem = <K extends keyof CopyElems>(
        k: K,
        c: CommonElemAttrs & Record<K, copy>,
        p: CopyElems[K]
    ): CompiledElem<K> => ({
        t: k,
        p: { lang: c.lang, ...p }, // Must contain only declared keys (since later the parser uses object spread)
        c: compile(c[k]),
    });
    const nodeVoid = <K extends keyof CopyVoids>(k: K, c: Record<K, CopyVoids[K]>): CompiledVoid<K> => ({
        t: k,
        p: c[k],
    });
    if ('abbr' in c) return nodeElem('abbr', c, { title: c.title });
    if ('time' in c) return nodeElem('time', c, { datetime: c.datetime });
    if ('badge' in c) return nodeElem('badge', c, { key: c.key });
    if ('copy' in c) return nodeElem('copy', c, {});
    if ('em' in c) return nodeElem('em', c, {});
    if ('strong' in c) return nodeElem('strong', c, {});
    if ('code' in c) return nodeElem('code', c, {});
    if ('p' in c) return nodeElem('p', c, {});
    if ('q' in c) return nodeElem('q', c, { cite: c.cite });
    if ('a' in c) return nodeElem('a', c, { href: c.href });
    if ('def' in c) return nodeVoid('def', c);
    return c satisfies never;
}

function capitalize(c: CompiledCopy): CompiledCopy {
    if (c === null) return null;
    if (typeof c === 'string') return capitalizeStr(c);
    if (isArray(c)) {
        const first = c.at(0);
        return first === undefined ? c : [capitalize(first), ...c.slice(1)];
    }
    return { ...c, ...('c' in c ? { c: capitalize(c.c) } : null) };
}
function stringify(c: CompiledCopy): string {
    if (c === null) return '';
    if (typeof c === 'string') return c;
    if (Array.isArray(c)) return c.map(stringify).join('');
    return 'c' in c ? stringify(c.c) : '';
}

export function c(c: copy) {
    return copy(c).preact();
}
