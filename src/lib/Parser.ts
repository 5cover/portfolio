import { jsx as preactJsx, Fragment as preactFragment } from 'preact/jsx-runtime';
import { jsx as astroJsx, Fragment as astroFragment } from 'astro/jsx-runtime';
import Badge from '../components/Badge';
import type { CompiledCopy, CompiledElem, CopyElems } from './copy';
import Def from '../components/mdx/Def';
import { isArray } from './util';

type JsxFn = typeof astroJsx | typeof preactJsx;

export class Parser<Jsx extends JsxFn> {
    constructor(
        private readonly jsx: Jsx,
        private readonly fragment: Parameters<Jsx>[0]
    ) {}

    parse(c: CompiledCopy): ReturnType<JsxFn> | null {
        if (c === null) return null;
        if (typeof c === 'string') return this.jsx(this.fragment, { children: c });
        if (isArray(c)) {
            return this.jsx(this.fragment, {
                children: c.map(r => this.parse(r)),
            });
        }
        switch (c.t) {
            case 'badge':
                return Badge({ of: c.p.key, children: this.parse(c.c) });
            case 'copy':
                return this.jsx('span', { lang: c.p.lang, children: this.parse(c.c) });
            case 'def':
                return Def({ id: c.p });
            default:
                return this.ashtml(c);
        }
    }

    private ashtml<K extends keyof CopyElems>(n: CompiledElem<K>) {
        return this.jsx(n.t, { ...n.p, children: this.parse(n.c) });
    }
}

export const preactParser = new Parser(preactJsx, preactFragment);
export const astroParser = new Parser(astroJsx, astroFragment);
