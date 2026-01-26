import { getRelativeLocaleUrl } from 'astro:i18n';
import { normalizeLocale } from '../i18n/site';

export function pageHref(locale: string | undefined, pageName: string): string {
    const path = pageName === 'index' ? '' : ensureHtml(pageName);
    return getRelativeLocaleUrl(normalizeLocale(locale), path);
}

export function detailHref(locale: string | undefined, kind: string, id: string): string {
    return getRelativeLocaleUrl(normalizeLocale(locale), `${kind}/${ensureHtml(id)}`);
}

function ensureHtml(path: string): string {
    return path.endsWith('.html') ? path : `${path}.html`;
}
