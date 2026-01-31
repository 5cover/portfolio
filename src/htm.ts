import htm from 'htm';
import { jsx } from 'astro/jsx-runtime';
const innerHtml = htm.bind((type, prop, children) => jsx(type, { ...prop, children }));
export const html =
    (strings: TemplateStringsArray, ...values: unknown[]) =>
    () =>
        innerHtml(strings, values);
