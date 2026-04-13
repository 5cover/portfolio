import z from 'astro/zod';
import { badgeKeys, type BadgeKey } from '../catalog/badge';
import { capitalize as capitalizeStr, isArray } from './util';
import { locales, type Locale } from '../const';

// Rich text "HTML as object" format for copy with inline formatting.

export type copy =
    | null
    | string
    | readonly copy[]
    | (CommonElemAttrs &
          { [K in keyof CopyElems]: Readonly<CopyElems[K]> & { readonly [T in K]: copy } }[keyof CopyElems])
    | { [K in keyof CopyVoids]: Readonly<Record<K, CopyVoids[K]>> }[keyof CopyVoids]
    | CC; // for merging back compiled copy into new copy
type CompiledCopy =
    | null
    | string
    | readonly CC[]
    | (CommonElemAttrs & { [K in keyof CopyElems]: Readonly<CompiledElem<K>> }[keyof CopyElems])
    | { [K in keyof CopyVoids]: Readonly<CompiledVoid<K>> }[keyof CopyVoids];

type CommonElemAttrs = {
    lang?: Locale;
}

type CopyElems = {
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

type CopyVoids = {
    def: string;
}

type CompiledElem<K extends keyof CopyElems> = {
    /** Type */
    t: K;
    /** Properties */
    p: CommonElemAttrs & CopyElems[K];
    /** Children */
    c: CC;
}

type CompiledVoid<K extends keyof CopyVoids> = {
    /** Type */
    t: K;
    /** Properties */
    p: CopyVoids[K];
}

export function copy(c: copy) {
    return c instanceof CC ? c : new CC(compile(c));
}

export type { CC as Copy };

class CC {
    constructor(readonly copy: CompiledCopy) {}
    capitalize(): CC {
        if (this.copy === null) return new CC(null);
        if (typeof this.copy === 'string') return new CC(capitalizeStr(this.copy));
        if (isArray(this.copy)) {
            const first = this.copy.at(0);
            return first === undefined ? this : new CC([first.capitalize(), ...this.copy.slice(1)]);
        }
        return new CC({ ...this.copy, ...('c' in this.copy ? { c: this.copy.c.capitalize() } : null) });
    }
    toString(): string {
        if (this.copy === null) return '';
        if (typeof this.copy === 'string') return this.copy;
        if (Array.isArray(this.copy)) return this.copy.map(c => c.toString()).join('');
        return 'c' in this.copy ? this.copy.c.toString() : '';
    }
}

const commonAttrsElems = {
    lang: z.enum(locales).optional(),
} as const;

export const zCopy: z.ZodType<Exclude<copy, CC>> = z
    .lazy(() =>
        z.union([
            z.string(),
            z.array(zCopy),
            z.strictObject({
                ...commonAttrsElems,
                title: z.string(),
                abbr: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElems,
                datetime: z.string().optional(), // We could validate  We could. I won't.
                time: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElems,
                key: z.enum(badgeKeys),
                badge: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElems,
                copy: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElems,
                p: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElems,
                code: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElems,
                em: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElems,
                strong: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElems,
                href: z.string(),
                a: zCopy,
            }),
            z.strictObject({
                ...commonAttrsElems,
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
    if (c instanceof CC) return c.copy;
    if (isArray(c)) return c.map(copy);
    const nodeElem = <K extends keyof CopyElems>(
        k: K,
        c: CommonElemAttrs & Record<K, copy>,
        p: CopyElems[K]
    ): CompiledElem<K> => ({
        t: k,
        p: { lang: c.lang, ...p }, // Must contain only declared keys (since later the parser uses object spread)
        c: copy(c[k]),
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
