// @ts-check

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import preact from '@astrojs/preact';
import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
    site: 'https://5cover.github.io',
    base: '/portfolio',
    i18n: {
        locales: ['fr', 'en'],
        defaultLocale: 'fr',
        routing: {
            prefixDefaultLocale: false,
        },
    },
    integrations: [mdx(), sitemap(), preact()],
    vite: {
        plugins: [svgr()],
    },
});
