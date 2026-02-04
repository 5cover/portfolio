import {
    defineCollection,
    reference,
    z,
    type BaseSchema,
    type CollectionEntry,
    type CollectionKey,
} from 'astro:content';
import { literatureKinds, locales } from './i18n';
import { glob } from 'astro/loaders';
import { typedObjectFromEntries } from './lib/util';
import { anchorKeys } from './catalog/anchor';
import { defTypesKeys } from './catalog/def-type';
import { zCopy } from './lib/copy';
import { tagKeys } from './catalog/tag';
import type { ZodTypeAny, ZodTypeDef } from 'astro:schema';

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
    anchor: zDefault(z.enum(anchorKeys), 'website'),
    href: zLocalized(z.string().url()),
});
export type Link = z.infer<typeof zLink>;

const zReference = z.object({
    caption: zText,
    anchor: z.enum(anchorKeys),
    href: zLocalized(zUrl),
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

export const collections = {
    contact: col(
        'contact',
        z.object({
            platform: z.string(),
            name: z.string(),
            href: zUrl,
            icon: zGraphic,
        })
    ),
    def: col(
        'def',
        z.object({
            type: z.enum(defTypesKeys),
            name: z.object({
                full: zText,
                abbr: zText.optional(),
                short: zText.optional(),
            }),
            synopsis: zText,
            wiki: zLocalized(zUrl),
            background: zSrc.optional(),
            logo: zGraphic.optional(),
        })
    ),
    history: col(
        'history',
        z.object({
            title: zText,
            meta: zText,
            year: z.number(),
            media: z
                .object({
                    img: zSrc,
                    alt: z.string(),
                })
                .optional(),
        })
    ),
    literature: col(
        'literature',
        z.object({
            kind: z.enum(literatureKinds),
            title: zText,
            abstract: zText,
            links: zArray(zLink),
            references: zArray(zReference),
            gallery: zArray(zGalleryItem),
            logo: zGraphic.optional(),
            background: zSrc.optional(),
            tags: zArray(z.enum(tagKeys)),
        })
    ),
    'piano-tile': col(
        'piano-tile',
        z.object({
            title: zText,
            summary: zText,
            backgroundImage: zSrc,
            href: zUrl,
        })
    ),
    project: col(
        'project',
        z.object({
            title: zText,
            abstract: zText,
            context: zText.optional(),
            startDate: z.date().optional(),
            endDate: z.date().optional(),
            tags: zArray(z.enum(tagKeys)),
            technologies: zArray(reference('def')),
            team: zArray(reference('def')),
            links: zArray(zLink),
            references: zArray(zReference),
            gallery: zArray(zGalleryItem),
            logo: zGraphic.optional(),
            background: zSrc.optional(),
        })
    ),
    textual: col('textual', z.unknown()),
} as const;

function col<S extends BaseSchema>(name: CollectionKey, schema: S) {
    return defineCollection({
        loader: glob({ base: `src/content/${name}`, pattern: ['**/*.yaml', '**/*.mdx'] }),
        schema,
    });
}

function zArray<Z extends ZodTypeAny>(schema: Z) {
    return zDefault(z.array(schema), []);
}

function zLocalized<Z extends ZodTypeAny>(schema: Z) {
    return schema.or(z.strictObject(typedObjectFromEntries(locales.map(l => [l, schema] as const))));
}

function zDefault<O, D extends ZodTypeDef, I>(schema: z.ZodType<O, D, I>, def: O) {
    return schema.nullish().transform(x => x ?? def);
}
