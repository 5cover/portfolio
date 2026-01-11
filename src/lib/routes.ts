export const BASE_PATH = '/portfolio';

export function pageHref(lang: string, pageName: string): string {
  return `${BASE_PATH}/${lang}/${pageName}.html`;
}

export function detailHref(lang: string, kind: string, id: string): string {
  return `${BASE_PATH}/${lang}/${kind}/${id}.html`;
}

export function assetHref(path: string): string {
  if (path.startsWith('/')) {
    return path;
  }
  return `${BASE_PATH}/${path}`;
}
