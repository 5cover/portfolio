import {
    defineCollection,
    reference,
    z,
    type BaseSchema,
    type CollectionEntry,
    type CollectionKey,
} from 'astro:content';
import type { ExplicitUndefined } from './lib/types';
import { Locales, type Locale } from './i18n';
import { glob } from 'astro/loaders';
import type { CollectionConfig } from 'astro/content/config';
import { typedObjectFromEntries } from './lib/util';
import { AnchorKeys } from './catalog/anchor';
import { DefTypesKeys } from './catalog/def-type';
import { zCopy, type Copy } from './lib/copy';
import { TagKeys } from './catalog/tags';
import type { ZodTypeAny, ZodTypeDef } from 'astro:schema';

export const LiteratureKinds = ['passion', 'blog', 'story'] as const;
export type LiteratureKind = (typeof LiteratureKinds)[number];

const zUrl = z.string(); // .url() does not support relatve
const zSrc = z.string().refine(src => src); // todo (check exists?)
const zText = zLocalized(zCopy);

export type Item<C extends CollectionKey> = CollectionEntry<C>['data'];

const zGraphic = z.object({
    src: zSrc,
    kind: z.enum(['img', 'svg']).nullish(),
});
export type Graphic = z.infer<typeof zGraphic>;

const zLink = z.object({
    label: zText,
    anchor: zDefault(z.enum(AnchorKeys), 'website'),
    href: zLocalized(z.string().url()),
});
export type Link = z.infer<typeof zLink>;

const zReference = z.object({
    caption: zText,
    anchor: z.string(),
    href: zText,
});
export type Reference = z.infer<typeof zReference>;

// todo: redo this cleanly and typedly
const zGalleryItem = z.object({
    caption: zText,
    src: zSrc.optional(),
    iframeSrc: zSrc.optional(),
    content: z.string().optional(),
});

export type GalleryItem = z.infer<typeof zGalleryItem>;

export const collections = defCollections({
    contact: z.object({
        platform: z.string(),
        name: z.string(),
        href: zUrl,
        icon: zGraphic,
    }),
    def: z.object({
        type: z.enum(DefTypesKeys),
        name: z.object({
            full: zText,
            abbr: zText.optional(),
            short: zText.optional(),
        }),
        synopsis: zText,
        wiki: zText,
        background: zSrc.optional(),
        logo: zGraphic.optional(),
    }),
    history: z.object({
        title: zText,
        meta: zText,
        year: z.number(),
        media: z
            .object({
                img: zSrc,
                alt: zText,
            })
            .optional(),
    }),
    literature: z.object({
        kind: z.enum(LiteratureKinds),
        title: zText,
        abstract: zText,
        links: zArray(zLink),
        references: zArray(zReference),
        gallery: zArray(zGalleryItem),
        logo: zGraphic.optional(),
        background: zSrc,
        tags: zArray(z.enum(TagKeys)),
    }),
    'piano-tile': z.object({
        title: zText,
        summary: zText,
        backgroundImage: zSrc,
        href: zUrl,
    }),
    project: z.object({
        title: zText,
        abstract: zText,
        context: zText.optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        tags: zArray(z.enum(TagKeys)),
        technologies: zArray(reference('def')),
        team: zArray(reference('def')),
        links: zArray(zLink),
        references: zArray(zReference),
        gallery: zArray(zGalleryItem),
        logo: zGraphic.optional(),
        background: zSrc,
    }),
    textual: z.unknown(),
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

function zArray<Z extends ZodTypeAny>(schema: Z) {
    return zDefault(z.array(schema), []);
}

function zLocalized<Z extends ZodTypeAny>(schema: Z) {
    return schema.or(z.strictObject(typedObjectFromEntries(Locales.map(l => [l, schema] as const))));
}

function zDefault<O, D extends ZodTypeDef, I>(schema: z.ZodType<O, D, I>, def: O) {
    return schema.nullish().transform(x => x ?? def);
}
