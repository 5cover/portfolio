import { jsx as preactJsx, Fragment as preactFragment } from 'preact/jsx-runtime';
import { jsx as astroJsx, Fragment as astroFragment } from 'astro/jsx-runtime';
import z from 'astro/zod';
import type { BadgeKey } from '../catalog/badges';
import Badge from '../components/Badge';

// Rich text "HTML as object" format for copy with inline formatting.

export type Copy = null | string | CopyNode | Copy[];
type CopyNode = { title: string; abbr: Copy } | { datetime: Date; time: Copy } | { key: BadgeKey; badge: Copy };

export const zCopy: z.ZodType<Copy> = z
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
        ])
    )
    .nullable();

type JsxFn = typeof astroJsx | typeof preactJsx;

class Parser<Jsx extends JsxFn> {
    constructor(
        private readonly jsx: Jsx,
        private readonly fragment: Parameters<Jsx>[0]
    ) {}

    parse(c: Copy): ReturnType<JsxFn> | null {
        if (c === null) return null;
        if (typeof c === 'string') return this.jsx(this.fragment, { children: c });
        if (Array.isArray(c)) {
            return this.jsx(this.fragment, { children: c.map(r => this.parse(r)) });
        }

        if ('abbr' in c) return this.node(c, 'abbr', { title: c.title });
        if ('time' in c) return this.node(c, 'time', { datetime: c.datetime.toISOString() });
        if ('badge' in c) return Badge({ of: c.key, children: this.parse(c.badge) });

        throw new Error(`unknown node: ${JSON.stringify(c)}`);
    }

    private node<K extends string>(c: Record<K, Copy>, k: K, attrs: Record<string, string>) {
        return this.jsx(k, { ...attrs, children: this.parse(c[k]) });
    }
}

const preactParser = new Parser(preactJsx, preactFragment);
export const preact = (c: Copy) => preactParser.parse(c);
const astroParser = new Parser(astroJsx, astroFragment);
export const astro = (c: Copy) => () => astroParser.parse(c);
