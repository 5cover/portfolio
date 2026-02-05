import { createContext } from 'preact';
import type { Locale } from '../i18n';
import type { AstroGlobal } from 'astro';
import { useContext } from 'preact/hooks';
import { throwf } from '../lib/util';

export const outlineDepth = createContext<number>(0);
export let astroGlobal: AstroGlobal | null = null;

export const astro = () => astroGlobal ?? throwf(new Error('astro global context unset'));
export const setAstro = (astro: AstroGlobal) => (astroGlobal = astro);
