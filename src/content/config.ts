import { defineCollection, z } from 'astro:content';

const graphicSchema = z.object({
  url: z.string(),
  isThemedSvg: z.boolean(),
});

const localizedString = z.object({
  en: z.string(),
  fr: z.string(),
});

const localizedNullableString = z.object({
  en: z.string().nullable(),
  fr: z.string().nullable(),
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

const referenceSchema = z.object({
  caption: z.string(),
  anchor: z.string(),
  href: z.string(),
});

const galleryItemSchema = z.object({
  caption: z.string(),
  url: z.string().nullable(),
  iframeSrc: z.string().nullable(),
  content: z.string().nullable(),
});

const projectCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: localizedString,
    abstract: localizedString,
    context: localizedNullableString,
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
    tags: z.array(z.string()),
    technologies: z.array(z.string()),
    team: z.array(z.string()),
    links: localizedArray(linkSchema),
    references: localizedArray(referenceSchema),
    gallery: localizedArray(galleryItemSchema),
    logo: graphicSchema.nullable(),
    background: z.string().nullable(),
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
    logo: graphicSchema.nullable(),
    background: z.string().nullable(),
    tags: z.array(z.string()),
  }),
});

const definitionCollection = defineCollection({
  type: 'data',
  schema: z.object({
    type: z.string(),
    name: z.object({
      full: localizedString,
      abbr: localizedNullableString,
      short: localizedNullableString,
    }),
    synopsis: localizedString,
    wiki: localizedString,
    background: z.string().nullable(),
    logo: graphicSchema.nullable(),
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
  schema: z.object({
    url: z.string(),
    isThemedSvg: z.boolean(),
  }),
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
      .nullable(),
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
    url: z.string(),
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
