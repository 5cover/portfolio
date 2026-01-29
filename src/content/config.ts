import { defineCollection, z, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { ExplicitUndefined, Patch } from '../lib/types';
import type { Locale, Localized } from '../i18n/site';

export type Item<C extends CollectionKey> = CollectionEntry<C>['data'];

export type LocalizedItem<C extends CollectionKey> = {
    [P in keyof Item<C>]: ExplicitUndefined<Item<C>[P]> extends Localized<infer T> ? T : Item<C>[P];
};

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

const galleryItemSchema = z.object({
    caption: z.string(),
    src: z.string().optional(),
    iframeSrc: z.string().optional(),
    content: z.string().optional(),
});

export type GalleryItem = z.infer<typeof galleryItemSchema>;

const projectCollection = defineCollection({
    type: 'data',
    schema: z.object({
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
});

const literatureCollection = defineCollection({
    type: 'data',
    schema: z.object({
        kind: z.enum(['passion', 'blog', 'story']),
        title: localizedString,
        abstract: localizedString,
        links: localizedArray(linkSchema),
        references: localizedArray(referenceSchema),
        gallery: localizedArray(galleryItemSchema),
        logo: graphicSchema.optional(),
        background: z.string().optional(),
        tags: z.array(z.string()),
    }),
});

const definitionCollection = defineCollection({
    type: 'data',
    schema: z.object({
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
});

const tagCollection = defineCollection({
    type: 'data',
    schema: z.object({
        title: localizedString,
    }),
});

const typeCollection = defineCollection({
    type: 'data',
    schema: z.object({
        title: localizedString,
    }),
});

const anchorCollection = defineCollection({
    type: 'data',
    schema: graphicSchema,
});

const historyCollection = defineCollection({
    type: 'data',
    schema: z.object({
        body: z.string(),
        title: localizedString,
        meta: localizedString,
        media: z
            .object({
                year: z.number(),
                img: z.string(),
                alt: localizedString,
            })
            .optional(),
        order: z.number(),
    }),
});

const pianoTileCollection = defineCollection({
    type: 'data',
    schema: z.object({
        title: localizedString,
        summary: localizedString,
        backgroundImage: z.string(),
        href: z.string(),
        order: z.number(),
    }),
});

const contactCollection = defineCollection({
    type: 'data',
    schema: z.object({
        platform: z.string(),
        name: z.string(),
        src: z.string(),
        icon: graphicSchema,
    }),
});

const textualCollection = defineCollection({
    type: 'content',
    schema: z.object({}),
});

export const collections = {
    anchors: anchorCollection,
    contacts: contactCollection,
    definitions: definitionCollection,
    history: historyCollection,
    literature: literatureCollection,
    'piano-tiles': pianoTileCollection,
    projects: projectCollection,
    tags: tagCollection,
    textual: textualCollection,
    types: typeCollection,
};
