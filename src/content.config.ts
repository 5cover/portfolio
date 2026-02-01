import { defineCollection, z, type BaseSchema, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { ExplicitUndefined } from './lib/types';
import { Locales, type Locale, type Localized } from './i18n';
import { glob } from 'astro/loaders';
import type { CollectionConfig } from 'astro/content/config';
import { typedObjectFromEntries } from './lib/util';
import { zCopy } from './lib/copy';

export const LiteratureKinds = ['passion', 'blog', 'story'] as const;
export type LiteratureKind = (typeof LiteratureKinds)[number];

export type Item<C extends CollectionKey> = CollectionEntry<C>['data'];
type Delocalize<T> = { [P in keyof T]: ExplicitUndefined<T[P]> extends Localized<infer U> ? U : Delocalize<T[P]> };
export type LocalizedItem<C extends CollectionKey> = Delocalize<Item<C>>;

const zGraphic = z.object({
    src: z.string(),
    kind: z.enum(['img', 'svg']).default('img'),
});
export type Graphic = z.infer<typeof zGraphic>;

const zLink = z.object({
    label: z.string(),
    anchor: z.string(),
    href: z.string(),
});
export type Link = z.infer<typeof zLink>;

const zReference = z.object({
    caption: z.string(),
    anchor: z.string(),
    href: z.string(),
});
export type Reference = z.infer<typeof zReference>;

const zGalleryItem = z.object({
    caption: z.string(),
    src: z.string().optional(),
    iframeSrc: z.string().optional(),
    content: z.string().optional(),
});

export type GalleryItem = z.infer<typeof zGalleryItem>;

export const collections = defCollections({
    anchor: zGraphic,
    contact: z.object({
        platform: z.string(),
        name: z.string(),
        src: z.string(),
        icon: zGraphic,
    }),
    def: z.object({
        type: z.string(),
        name: z.object({
            full: zLocalized(z.string()),
            abbr: zLocalized(z.string()).optional(),
            short: zLocalized(z.string()).optional(),
        }),
        synopsis: zLocalized(z.string()),
        wiki: zLocalized(z.string()),
        background: z.string().optional(),
        logo: zGraphic.optional(),
    }),
    history: z.object({
        body: z.string(),
        title: zLocalized(z.string()),
        meta: zLocalized(z.string()),
        year: z.number(),
        media: z
            .object({
                img: z.string(),
                alt: zLocalized(z.string()),
            })
            .optional(),
    }),
    literature: z.object({
        kind: z.enum(LiteratureKinds),
        title: zLocalized(z.string()),
        abstract: zLocalized(z.string()),
        links: z.array(zLink),
        references: z.array(zReference),
        gallery: z.array(zGalleryItem),
        logo: zGraphic.optional(),
        background: z.string().optional(),
        tags: z.array(z.string()),
    }),
    'piano-tile': z.object({
        title: zLocalized(z.string()),
        summary: zLocalized(z.string()),
        backgroundImage: z.string(),
        href: z.string(),
        order: z.number(),
    }),
    project: z.object({
        title: zLocalized(z.string()),
        abstract: zLocalized(z.string()),
        context: zLocalized(z.string()).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        tags: z.array(z.string()),
        technologies: z.array(z.string()),
        team: z.array(z.string()),
        links: z.array(zLink),
        references: z.array(zReference),
        gallery: z.array(zGalleryItem),
        logo: zGraphic.optional(),
        background: z.string().optional(),
    }),
    tag: z.object({
        title: zLocalized(zCopy),
    }),
    textual: z.object({}),
    'def-type': z.object({
        title: zLocalized(z.string()),
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

const zLocales: z.ZodType<Locale> = z.enum(Locales);
function zLocalized<T>(schema: z.ZodType<T>) {
    return z.record(zLocales, schema);
}
