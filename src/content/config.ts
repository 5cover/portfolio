import { defineCollection, z } from 'astro:content';

const graphicSchema = z.object({
  url: z.string(),
  isThemedSvg: z.boolean(),
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
    id: z.string(),
    lang: z.string(),
    title: z.string(),
    abstract: z.string(),
    story: z.string(),
    context: z.string().nullable(),
    startDate: z.string().nullable(),
    endDate: z.string().nullable(),
    tags: z.array(z.string()),
    technologies: z.array(z.string()),
    team: z.array(z.string()),
    links: z.array(linkSchema),
    references: z.array(referenceSchema),
    gallery: z.array(galleryItemSchema),
    logo: graphicSchema.nullable(),
    background: z.string().nullable(),
  }),
});

const literatureCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    lang: z.string(),
    kind: z.enum(['passion', 'blog', 'story']),
    title: z.string(),
    abstract: z.string(),
    story: z.string(),
    links: z.array(linkSchema),
    references: z.array(referenceSchema),
    gallery: z.array(galleryItemSchema),
    logo: graphicSchema.nullable(),
    background: z.string().nullable(),
    tags: z.array(z.string()),
  }),
});

const definitionCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    lang: z.string(),
    type: z.string(),
    name: z.object({
      full: z.string(),
      abbr: z.string().optional(),
      short: z.string().optional(),
    }),
    synopsis: z.string(),
    wiki: z.string(),
    background: z.string().nullable(),
    logo: graphicSchema.nullable(),
  }),
});

const tagCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    lang: z.string(),
    title: z.string(),
  }),
});

const typeCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    lang: z.string(),
    title: z.string(),
  }),
});

const anchorCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    url: z.string(),
    isThemedSvg: z.boolean(),
  }),
});

const historyCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    lang: z.string(),
    title: z.string(),
    meta: z.string(),
    body: z.string(),
    media: z
      .object({
        year: z.number(),
        img: z.string(),
        alt: z.string(),
      })
      .nullable(),
    order: z.number(),
  }),
});

const pianoTileCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    lang: z.string(),
    title: z.string(),
    summary: z.string(),
    backgroundImage: z.string(),
    href: z.string(),
    order: z.number(),
  }),
});

const contactCollection = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    platform: z.string(),
    name: z.string(),
    url: z.string(),
    icon: graphicSchema,
  }),
});

const langCollection = defineCollection({
  type: 'data',
  schema: z.object({
    but: z.object({
      h1: z.string(),
      description: z.string(),
      'but-logo-alt': z.string(),
      'h2-skills': z.string(),
      'skills-abstract': z.string(),
      'fmt-h3-skill': z.string(),
      skills: z.array(
        z.object({
          name: z.string(),
          desc: z.string(),
        })
      ),
      'iut-alt': z.string(),
      'h2-result': z.string(),
      'h3-why': z.string(),
      why: z.string(),
      'h3-assessment': z.string(),
      assessment: z.string(),
      conclusion: z.string(),
      'iut-caption': z.string(),
      'link-text-syllabus': z.string(),
    }),
    flagClass: z.string(),
    footerGitHubAnchorTitle: z.string(),
    fmtTitle: z.string(),
    gallery: z.string(),
    indexAllMyProjects: z.string(),
    indexContact: z.string(),
    indexVideoCv: z.string(),
    indexMe: z.string(),
    indexMyPhoto: z.string(),
    indexMyResume: z.string(),
    indexMyResumePreview: z.string(),
    indexOngoingProjects: z.string(),
    links: z.string(),
    nameDarkTheme: z.string(),
    nameLightTheme: z.string(),
    namePageButInformatique: z.string(),
    namePageHistory: z.string(),
    namePagePassions: z.string(),
    namePagePerspectives: z.string(),
    namePageProjects: z.string(),
    nameSystemTheme: z.string(),
    ongoing: z.string(),
    pianoTile1Desc: z.string(),
    pianoTile1Title: z.string(),
    pianoTile2Desc: z.string(),
    pianoTile2Title: z.string(),
    pianoTile3Desc: z.string(),
    pianoTile3Title: z.string(),
    pianoTile4Desc: z.string(),
    pianoTile4Title: z.string(),
    pianoTile5Desc: z.string(),
    pianoTile5Title: z.string(),
    pianoTile6Desc: z.string(),
    pianoTile6Title: z.string(),
    pianoTile7Desc: z.string(),
    pianoTile7Title: z.string(),
    pianoTile8Desc: z.string(),
    pianoTile8Title: z.string(),
    projectSearchPlaceholder: z.string(),
    projectSearchSearch: z.string(),
    projectSearchSort: z.string(),
    projectSearchTags: z.string(),
    references: z.string(),
    refJumpUp: z.string(),
    siteDescription: z.string(),
    story: z.string(),
    team: z.string(),
    technologies: z.string(),
    indexAboutMeContent: z.string(),
    history: z.array(
      z.object({
        title: z.string(),
        meta: z.string(),
        body: z.string(),
      })
    ),
    names: z.record(z.string()),
  }),
});

const metaCollection = defineCollection({
  type: 'data',
  schema: z.object({
    langs: z.array(z.string()),
  }),
});

export const collections = {
  anchors: anchorCollection,
  contacts: contactCollection,
  definitions: definitionCollection,
  history: historyCollection,
  lang: langCollection,
  literature: literatureCollection,
  meta: metaCollection,
  'piano-tiles': pianoTileCollection,
  projects: projectCollection,
  tags: tagCollection,
  types: typeCollection,
};
