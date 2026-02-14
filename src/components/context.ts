import { createContext } from 'preact';
import { useContext } from 'preact/hooks';
import { throwf } from '../lib/util';
import type { AstroGlobal } from 'astro';

export const outlineDepth = createContext<number>(0);
export const astroCtx = createContext<AstroGlobal | null>(null);

export const astro = () => useContext(astroCtx) ?? throwf(new Error('astro global context unset'));
