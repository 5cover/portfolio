import { getRelativeLocaleUrl } from 'astro:i18n';
import { normalizeLocale } from '../i18n';

export const pageHref = (locale: string | undefined, pageName: string) =>
    getRelativeLocaleUrl(normalizeLocale(locale), pageName === 'index' ? '' : pageName);

export const detailHref = (locale: string | undefined, kind: string, id: string) =>
    getRelativeLocaleUrl(normalizeLocale(locale), `${kind}/${id}`);
