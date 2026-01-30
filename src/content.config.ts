import { defineCollection, z, type BaseSchema, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { ExplicitUndefined } from './lib/types';
import type { Localized } from './i18n/site';
import { glob } from 'astro/loaders';
import type { CollectionConfig } from 'astro/content/config';
import { typedObjectFromEntries } from './lib/util';

export type Item<C extends CollectionKey> = CollectionEntry<C>['data'];
type Delocalize<T> = { [P in keyof T]: ExplicitUndefined<T[P]> extends Localized<infer U> ? U : Delocalize<T[P]> };
export type LocalizedItem<C extends CollectionKey> = Delocalize<Item<C>>;

const graphicSchema = z.object({
    src: z.string(),
    kind: z.enum(['img', 'svg']).default('img'),
});
export type Graphic = z.infer<typeof graphicSchema>;

const localizedString = z.object({
    en: z.string(),
    fr: z.string(),
});

const localizedOptionalString = z.object({
    en: z.string().optional(),
    fr: z.string().optional(),
});

const localizedArray = <T extends z.ZodTypeAny>(schema: T) =>
    z.object({
        en: z.array(schema),
        fr: z.array(schema),
    });

const linkSchema = z.object({
    label: z.string(),
    anchor: z.string(),
    href: z.string(),
});
export type Link = z.infer<typeof linkSchema>;

const referenceSchema = z.object({
    caption: z.string(),
    anchor: z.string(),
    href: z.string(),
});
export type Reference = z.infer<typeof referenceSchema>;

const galleryItemSchema = z.object({
    caption: z.string(),
    src: z.string().optional(),
    iframeSrc: z.string().optional(),
    content: z.string().optional(),
});

export type GalleryItem = z.infer<typeof galleryItemSchema>;

export const LiteratureKinds = ['passion', 'blog', 'story'] as const;
export type LiteratureKind = (typeof LiteratureKinds)[number];

export const collections = defCollections({
    anchor: graphicSchema,
    contact: z.object({
        platform: z.string(),
        name: z.string(),
        src: z.string(),
        icon: graphicSchema,
    }),
    def: z.object({
        type: z.string(),
        name: z.object({
            full: localizedString,
            abbr: localizedOptionalString,
            short: localizedOptionalString,
        }),
        synopsis: localizedString,
        wiki: localizedString,
        background: z.string().optional(),
        logo: graphicSchema.optional(),
    }),
    history: z.object({
        body: z.string(),
        title: localizedString,
        meta: localizedString,
        year: z.number(),
        media: z
            .object({
                img: z.string(),
                alt: localizedString,
            })
            .optional(),
    }),
    literature: z.object({
        kind: z.enum(LiteratureKinds),
        title: localizedString,
        abstract: localizedString,
        links: localizedArray(linkSchema),
        references: localizedArray(referenceSchema),
        gallery: localizedArray(galleryItemSchema),
        logo: graphicSchema.optional(),
        background: z.string().optional(),
        tags: z.array(z.string()),
    }),
    'piano-tile': z.object({
        title: localizedString,
        summary: localizedString,
        backgroundImage: z.string(),
        href: z.string(),
        order: z.number(),
    }),
    project: z.object({
        title: localizedString,
        abstract: localizedString,
        context: localizedOptionalString,
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        tags: z.array(z.string()),
        technologies: z.array(z.string()),
        team: z.array(z.string()),
        links: localizedArray(linkSchema),
        references: localizedArray(referenceSchema),
        gallery: localizedArray(galleryItemSchema),
        logo: graphicSchema.optional(),
        background: z.string().optional(),
    }),
    tag: z.object({
        title: localizedString,
    }),
    textual: z.object({}),
    'def-type': z.object({
        title: localizedString,
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
