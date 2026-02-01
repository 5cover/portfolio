import { defineCollection, z, type BaseSchema, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { ExplicitUndefined } from './lib/types';
import { Locales, type Locale, type Localized } from './i18n';
import { glob } from 'astro/loaders';
import type { CollectionConfig } from 'astro/content/config';
import { typedObjectFromEntries } from './lib/util';
import { zCopy } from './lib/copy';
import { AnchorKeys } from './catalog/anchor';
import path from 'path';
import astroConfig from '../astro.config.mjs';

export const LiteratureKinds = ['passion', 'blog', 'story'] as const;
export type LiteratureKind = (typeof LiteratureKinds)[number];

const zLocales: z.ZodType<Locale> = z.enum(Locales);
const zText = zDefault(z.string(), '');
const zUrl = z.string().url();
const zSrc = z.string().refine(src => src); // todo (check exists?)

export type Item<C extends CollectionKey> = CollectionEntry<C>['data'];
type Delocalize<T> = { [P in keyof T]: ExplicitUndefined<T[P]> extends Localized<infer U> ? U : Delocalize<T[P]> };
export type LocalizedItem<C extends CollectionKey> = Delocalize<Item<C>>;

const zGraphic = z.object({
    src: zUrl,
    kind: z.enum(['img', 'svg']).nullish(),
});
export type Graphic = z.infer<typeof zGraphic>;

const zLink = z.object({
    label: zLocalized(zText),
    anchor: zDefault(z.enum(AnchorKeys), 'website'),
    href: zLocalizedMaybe(z.string().url()),
});
export type Link = z.infer<typeof zLink>;

const zReference = z.object({
    caption: zLocalized(zText),
    anchor: zText,
    href: zLocalizedMaybe(zText),
});
export type Reference = z.infer<typeof zReference>;

const zGalleryItem = z.object({
    caption: zLocalized(zText),
    src: zText.optional(),
    iframeSrc: zText.optional(),
    content: zText.optional(),
});

export type GalleryItem = z.infer<typeof zGalleryItem>;

export const collections = defCollections({
    contact: z.object({
        platform: zText,
        name: zText,
        href: zUrl,
        icon: zGraphic,
    }),
    def: z.object({
        type: z.string(),
        name: z.object({
            full: zLocalized(zText),
            abbr: zLocalized(zText).optional(),
            short: zLocalized(zText).optional(),
        }),
        synopsis: zLocalized(zText),
        wiki: zLocalized(zText),
        background: zText.optional(),
        logo: zGraphic.optional(),
    }),
    history: z.object({
        body: zText,
        title: zLocalized(zText),
        meta: zLocalized(zText),
        year: z.number(),
        media: z
            .object({
                img: zText,
                alt: zLocalized(zText),
            })
            .optional(),
    }),
    literature: z.object({
        kind: z.enum(LiteratureKinds),
        title: zLocalized(zText),
        abstract: zLocalized(zText),
        links: zArray(zLink),
        references: zArray(zReference),
        gallery: zArray(zGalleryItem),
        logo: zGraphic.optional(),
        background: zText.optional(),
        tags: zArray(zText),
    }),
    'piano-tile': z.object({
        title: zLocalized(zText),
        summary: zLocalized(zText),
        backgroundImage: zText,
        href: zText,
        order: z.number(),
    }),
    project: z.object({
        title: zLocalized(zText),
        abstract: zLocalized(zText),
        context: zLocalized(zText).optional(),
        startDate: zText.optional(),
        endDate: zText.optional(),
        tags: zArray(zText),
        technologies: zArray(zText),
        team: zArray(zText),
        links: zArray(zLink),
        references: zArray(zReference),
        gallery: zArray(zGalleryItem),
        logo: zGraphic.optional(),
        background: zText.optional(),
    }),
    tag: z.object({
        title: zLocalized(zCopy),
    }),
    textual: z.object({}),
    'def-type': z.object({
        title: zLocalized(zText),
    }),
});

function defCollections<T extends Record<CollectionKey, BaseSchema>>(x: T) {
    return typedObjectFromEntries(
        Object.entries(x).map(
            ([name, schema]) =>
                [
                    name,
                    defineCollection({
                        loader: glob({ base: `src/content/${name}`, pattern: ['**/*.yaml', '**/*.mdx'] }),
                        schema,
                    }),
                ] as const
        )
    ) as { [K in CollectionKey]: CollectionConfig<T[K]> };
}

function zArray<T>(schema: z.ZodType<T>) {
    return zDefault(z.array(schema), []);
}

function zLocalized<T>(schema: z.ZodType<T>) {
    return z.record(zLocales, schema);
}
function zLocalizedMaybe<T>(schema: z.ZodType<T>) {
    return schema.or(zLocalized(schema));
}

function zDefault<T>(schema: z.ZodType<T>, def: T) {
    return schema.nullish().transform(x => x ?? def);
}
