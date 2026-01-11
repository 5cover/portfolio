import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = process.cwd();
const V1_DATA = join(ROOT, 'doc', 'v1', 'main', 'data');
const V1_FRAGMENTS = join(ROOT, 'doc', 'v1', 'main', 'fragments');
const OUT = join(ROOT, 'src', 'content');

const LANGS = readJson(join(V1_DATA, 'langs.json'));

const PIANO_TILES = [
  'hobbies.html#mountain',
  'hobbies.html#sandbox-videogames',
  'projects/tregoria.html',
  'projects/2l2w-french-rural-road.html',
  'projects/ethercrash.html',
  'projects/psdc.html',
  'projects/s1.02.html',
  'projects/winclean.html',
];

const HISTORY_MEDIA = [
  { year: 2020, img: '/portfolio/img/bossuet.jpeg', alt: 'Lycée Saint-Joseph-Bossuet' },
  { year: 2023, img: '/portfolio/img/cambridge-first.jpg', alt: 'Cambridge First Certificate' },
  { year: 2023, img: '/portfolio/img/iut-lannion.jpg', alt: "L'IUT de Lannion" },
  { year: 2024, img: '/portfolio/img/tro-breizh.jpg', alt: 'Le Tro Breizh' },
];

const CONTACTS = [
  {
    id: 'email',
    platform: 'E-mail',
    name: 'bardini.raphael@gmail.com',
    url: 'mailto:bardini.raphael@gmail.com',
    icon: { isThemedSvg: true, url: '/portfolio/img/social/email.svg' },
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    name: 'Raphaël Bardini',
    url: 'https://www.linkedin.com/in/rapha%C3%ABl-bardini-6238432b6/',
    icon: { isThemedSvg: true, url: '/portfolio/img/social/linkedin.svg' },
  },
  {
    id: 'instagram',
    platform: 'Instagram',
    name: 'bardiniraphael',
    url: 'https://www.instagram.com/bardiniraphael/',
    icon: { isThemedSvg: true, url: '/portfolio/img/social/instagram.svg' },
  },
  {
    id: 'github',
    platform: 'GitHub',
    name: '5cover',
    url: 'https://github.com/5cover',
    icon: { isThemedSvg: true, url: '/portfolio/img/social/github.svg' },
  },
];

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function writeYaml(filePath, data) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function localizedString(en, fr) {
  if (typeof en !== 'string' || typeof fr !== 'string') {
    throw new Error(`Expected localized strings, got: ${en} / ${fr}`);
  }
  return { en, fr };
}

function localizedNullableString(en, fr) {
  const enValue = typeof en === 'string' ? en : null;
  const frValue = typeof fr === 'string' ? fr : null;
  return { en: enValue, fr: frValue };
}

function localizedArray(en, fr) {
  const enValue = Array.isArray(en) ? en : [];
  const frValue = Array.isArray(fr) ? fr : [];
  return { en: enValue, fr: frValue };
}

function pickShared(en, fr, field) {
  if (en && en[field] !== undefined) {
    return en[field];
  }
  if (fr && fr[field] !== undefined) {
    return fr[field];
  }
  return null;
}

function writeTextual(lang, kind, id, body) {
  const filePath = join(OUT, 'textual', lang, kind, `${id}.mdx`);
  mkdirSync(dirname(filePath), { recursive: true });
  const content = body.endsWith('\n') || body.length === 0 ? body : `${body}\n`;
  writeFileSync(filePath, content, 'utf8');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(value) {
  return value.replace(/"/g, '&quot;');
}

function parseHeredoc(raw) {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('<<<')) {
    return null;
  }
  const labelMatch = /^<<<(\w+)\n([\s\S]*?)\n\1\s*$/.exec(trimmed);
  if (!labelMatch) {
    throw new Error(`Unsupported heredoc format: ${raw}`);
  }
  return labelMatch[2];
}

function splitArgs(raw) {
  const args = [];
  let current = '';
  let inSingle = false;
  let inDouble = false;
  let depth = 0;

  for (let i = 0; i < raw.length; i += 1) {
    const char = raw[i];
    const prev = raw[i - 1];

    if (inSingle) {
      current += char;
      if (char === "'" && prev !== '\\') {
        inSingle = false;
      }
      continue;
    }

    if (inDouble) {
      current += char;
      if (char === '"' && prev !== '\\') {
        inDouble = false;
      }
      continue;
    }

    if (char === "'") {
      inSingle = true;
      current += char;
      continue;
    }

    if (char === '"') {
      inDouble = true;
      current += char;
      continue;
    }

    if (char === '(') {
      depth += 1;
      current += char;
      continue;
    }

    if (char === ')') {
      depth = Math.max(0, depth - 1);
      current += char;
      continue;
    }

    if (char === ',' && depth === 0) {
      args.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  if (current.trim().length > 0) {
    args.push(current.trim());
  }

  return args;
}

function parseStringLiteral(raw) {
  const trimmed = raw.trim();
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    const inner = trimmed.slice(1, -1);
    return inner
      .replace(/\\'/g, "'")
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\\\/g, '\\');
  }
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    const inner = trimmed.slice(1, -1);
    return inner
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\\\/g, '\\');
  }
  return trimmed;
}

function parseArgs(raw) {
  const heredoc = parseHeredoc(raw);
  if (heredoc !== null) {
    return [heredoc];
  }

  if (raw.trim() === '') {
    return [];
  }

  return splitArgs(raw).map((arg) => {
    const heredocArg = parseHeredoc(arg);
    if (heredocArg !== null) {
      return heredocArg;
    }

    if (/^\d+$/.test(arg.trim())) {
      return Number.parseInt(arg.trim(), 10);
    }

    return parseStringLiteral(arg);
  });
}

function buildDefinitionTerm(definition) {
  const name = definition?.name ?? {};
  const abbr = name.abbr;
  const short = name.short;
  const full = name.full ?? '';
  return {
    term: abbr ?? short ?? full,
    title: abbr ? `${full} (${abbr})` : full,
  };
}

function renderFragment({ lang, relativePath, definitions, projects }) {
  const filePath = join(V1_FRAGMENTS, lang, relativePath);
  const raw = readFileSync(filePath, 'utf8');
  let refNum = 1;
  const defined = new Map();

  const withoutPhp = raw.replace(/<\?php[\s\S]*?\?>/g, '');

  return withoutPhp.replace(/<\?=([\s\S]*?)\?>/g, (_match, expr) => {
    const trimmed = expr.trim();
    const match = /^\$f->([a-zA-Z_]+)\((([\s\S]*))\)$/.exec(trimmed);
    if (!match) {
      return '';
    }

    const func = match[1];
    const args = parseArgs(match[2] ?? '');

    if (func === 'term') {
      const [content, termLang, translation] = args;
      const langAttr = termLang ? ` lang=\"${escapeAttr(String(termLang))}\"` : '';
      const em = `<em${langAttr}>${content}</em>`;
      if (translation) {
        return `<abbr title=\"${escapeAttr(String(translation))}\">${em}</abbr>`;
      }
      return em;
    }

    if (func === 'code') {
      const [content] = args;
      return `<code>${escapeHtml(String(content ?? ''))}</code>`;
    }

    if (func === 'codeblock') {
      const [content] = args;
      return `<pre>${`<code>${escapeHtml(String(content ?? ''))}</code>`}</pre>`;
    }

    if (func === 'year') {
      const [year] = args;
      return `<time datetime=\"${year}\">${year}</time>`;
    }

    if (func === 'a') {
      const [content, href] = args;
      return `<a class=\"link\" href=\"/portfolio/${lang}/${href}\">${content}</a>`;
    }

    if (func === 'a_project') {
      const [id, name] = args;
      const projectTitle = projects[id]?.title ?? id;
      const label = name ?? projectTitle;
      return `<a class=\"link\" href=\"/portfolio/${lang}/projects/${id}.html\">${label}</a>`;
    }

    if (func === 'blank') {
      const [content, href] = args;
      return `<a class=\"link\" target=\"_blank\" rel=\"noopener noreferrer\" href=\"${href}\">${content}</a>`;
    }

    if (func === 'ref') {
      const id = refNum;
      refNum += 1;
      return `<sup id=\"cite-ref-${id}\"><a class=\"link\" href=\"#ref-${id}\">[${id}]</a></sup>`;
    }

    if (func === 'def') {
      const [id, name] = args;
      const defId = String(id);
      const existing = defined.get(defId);
      const { term } = existing ?? buildDefinitionTerm(definitions[defId]);
      if (!existing) {
        defined.set(defId, { term });
        const wiki = definitions[defId]?.wiki ?? '#';
        const label = name ?? term;
        return `<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"${wiki}\" data-definition-id=\"${defId}\" class=\"link definition-tooltip-trigger\">${label}</a>`;
      }
      return name ?? term;
    }

    return '';
  });
}

function transformLinks(links) {
  if (!links || typeof links !== 'object') {
    return [];
  }
  return Object.entries(links).map(([label, link]) => ({
    label,
    anchor: link.anchor,
    href: link.href,
  }));
}

function transformGallery(items) {
  if (!Array.isArray(items)) {
    return [];
  }
  return items.map((item) => ({
    caption: item.caption,
    url: item.url ?? null,
    iframeSrc: item['iframe-src'] ?? null,
    content: item.content ?? null,
  }));
}

function writeAnchors() {
  const anchors = readJson(join(V1_DATA, 'anchors.json'));
  Object.entries(anchors).forEach(([id, data]) => {
    writeYaml(join(OUT, 'anchors', `${id}.yaml`), {
      id,
      url: data.url,
      isThemedSvg: data.isThemedSvg,
    });
  });
}

function writeContacts() {
  CONTACTS.forEach((contact) => {
    writeYaml(join(OUT, 'contacts', `${contact.id}.yaml`), contact);
  });
}

function writeLangData(lang, langData, definitions, projects) {
  const aboutMe = langData.indexAboutMeContent;
  const aboutHtml =
    aboutMe && aboutMe['$include']
      ? renderFragment({
          lang,
          relativePath: aboutMe['$include'],
          definitions,
          projects,
        })
      : aboutMe ?? '';

  const history = Array.isArray(langData.history)
    ? langData.history.map((entry) => ({
        title: entry.title,
        meta: entry.meta,
        body:
          entry.body && entry.body['$include']
            ? renderFragment({
                lang,
                relativePath: entry.body['$include'],
                definitions,
                projects,
              })
            : entry.body ?? '',
      }))
    : [];

  const result = {
    ...langData,
    indexAboutMeContent: aboutHtml,
    history,
  };

  writeYaml(join(OUT, 'lang', `${lang}.yaml`), result);
}

function writeHistory(lang, historyItems, definitions, projects) {
  historyItems.forEach((entry, index) => {
    const media = HISTORY_MEDIA[index] ?? null;
    const body =
      entry.body && entry.body['$include']
        ? renderFragment({
            lang,
            relativePath: entry.body['$include'],
            definitions,
            projects,
          })
        : entry.body ?? '';
    const id = `history-${index}`;
    writeTextual(lang, 'history', id, body);
    writeYaml(join(OUT, 'history', lang, `history-${index}.yaml`), {
      id,
      lang,
      title: entry.title,
      meta: entry.meta,
      media,
      order: index,
    });
  });
}

function writeTagsAndTypes(lang, tags, types) {
  Object.entries(tags).forEach(([id, title]) => {
    writeYaml(join(OUT, 'tags', lang, `${id}.yaml`), {
      id,
      lang,
      title,
    });
  });

  Object.entries(types).forEach(([id, title]) => {
    writeYaml(join(OUT, 'types', lang, `${id}.yaml`), {
      id,
      lang,
      title,
    });
  });
}

function writeDefinitions(lang, definitions) {
  Object.entries(definitions).forEach(([id, definition]) => {
    writeYaml(join(OUT, 'definitions', lang, `${id}.yaml`), {
      id,
      lang,
      type: definition.type,
      name: definition.name,
      synopsis: definition.synopsis,
      wiki: definition.wiki,
      background: definition.background ?? null,
      logo: definition.logo ?? null,
    });
  });
}

function writeProjects(lang, projects, definitions) {
  Object.entries(projects).forEach(([id, project]) => {
    const abstract = project.abstract && project.abstract['$include']
      ? renderFragment({
          lang,
          relativePath: project.abstract['$include'],
          definitions,
          projects,
        })
      : project.abstract ?? '';

    const body = project.story && project.story['$include']
      ? renderFragment({
          lang,
          relativePath: project.story['$include'],
          definitions,
          projects,
        })
      : project.story ?? '';

    writeTextual(lang, 'projects', id, body);
    writeYaml(join(OUT, 'projects', lang, `${id}.yaml`), {
      id,
      lang,
      title: project.title,
      abstract,
      context: project.context ?? null,
      startDate: project['start-date'] ?? null,
      endDate: project['end-date'] ?? null,
      tags: project.tags ?? [],
      technologies: project.technologies ?? [],
      team: project.team ?? [],
      links: transformLinks(project.links),
      references: project.references ?? [],
      gallery: transformGallery(project.gallery),
      logo: project.logo ?? null,
      background: project.background ?? null,
    });
  });
}

function writeLiterature(lang, passions, perspectives, definitions, projects) {
  const all = [
    ...Object.entries(passions).map(([id, value]) => ({ id, value, kind: 'passion' })),
    ...Object.entries(perspectives).map(([id, value]) => ({ id, value, kind: 'blog' })),
  ];

  all.forEach(({ id, value, kind }) => {
    const abstract = value.abstract && value.abstract['$include']
      ? renderFragment({
          lang,
          relativePath: value.abstract['$include'],
          definitions,
          projects,
        })
      : value.abstract ?? '';

    const body = value.story && value.story['$include']
      ? renderFragment({
          lang,
          relativePath: value.story['$include'],
          definitions,
          projects,
        })
      : value.story ?? '';

    writeTextual(lang, 'literature', id, body);
    writeYaml(join(OUT, 'literature', lang, `${id}.yaml`), {
      id,
      lang,
      kind,
      title: value.title,
      abstract,
      links: transformLinks(value.links),
      references: value.references ?? [],
      gallery: transformGallery(value.gallery),
      logo: value.logo ?? null,
      background: value.background ?? null,
      tags: value.tags ?? [],
    });
  });
}

function writePianoTiles(lang, langData) {
  PIANO_TILES.forEach((href, index) => {
    const num = index + 1;
    writeYaml(join(OUT, 'piano-tiles', lang, `tile-${num}.yaml`), {
      id: `tile-${num}`,
      lang,
      title: langData[`pianoTile${num}Title`],
      summary: langData[`pianoTile${num}Desc`],
      backgroundImage: `/portfolio/img/piano-tile/${num}.jpg`,
      href,
      order: index,
    });
  });
}

function mergeLocalizedOutputs() {
  const collections = ['projects', 'literature', 'definitions', 'tags', 'types', 'history', 'piano-tiles'];

  const listIds = (dir) => {
    try {
      return new Set(
        readdirSync(dir)
          .filter((name) => name.endsWith('.yaml'))
          .map((name) => name.replace(/\.yaml$/, ''))
      );
    } catch {
      return new Set();
    }
  };

  collections.forEach((collection) => {
    const baseDir = join(OUT, collection);
    const enDir = join(baseDir, 'en');
    const frDir = join(baseDir, 'fr');
    const ids = new Set([...listIds(enDir), ...listIds(frDir)]);

    ids.forEach((id) => {
      const enPath = join(enDir, `${id}.yaml`);
      const frPath = join(frDir, `${id}.yaml`);
      const en = readJson(enPath);
      const fr = readJson(frPath);
      let merged = null;

      if (collection === 'projects') {
        merged = {
          id: en.id ?? fr.id,
          title: localizedString(en.title, fr.title),
          abstract: localizedString(en.abstract, fr.abstract),
          context: localizedNullableString(en.context, fr.context),
          startDate: pickShared(en, fr, 'startDate'),
          endDate: pickShared(en, fr, 'endDate'),
          tags: pickShared(en, fr, 'tags') ?? [],
          technologies: pickShared(en, fr, 'technologies') ?? [],
          team: pickShared(en, fr, 'team') ?? [],
          links: localizedArray(en.links, fr.links),
          references: localizedArray(en.references, fr.references),
          gallery: localizedArray(en.gallery, fr.gallery),
          logo: pickShared(en, fr, 'logo'),
          background: pickShared(en, fr, 'background'),
        };
      }

      if (collection === 'literature') {
        merged = {
          id: en.id ?? fr.id,
          kind: pickShared(en, fr, 'kind'),
          title: localizedString(en.title, fr.title),
          abstract: localizedString(en.abstract, fr.abstract),
          links: localizedArray(en.links, fr.links),
          references: localizedArray(en.references, fr.references),
          gallery: localizedArray(en.gallery, fr.gallery),
          logo: pickShared(en, fr, 'logo'),
          background: pickShared(en, fr, 'background'),
          tags: pickShared(en, fr, 'tags') ?? [],
        };
      }

      if (collection === 'definitions') {
        merged = {
          id: en.id ?? fr.id,
          type: pickShared(en, fr, 'type'),
          name: {
            full: localizedString(en.name?.full, fr.name?.full),
            abbr: localizedNullableString(en.name?.abbr, fr.name?.abbr),
            short: localizedNullableString(en.name?.short, fr.name?.short),
          },
          synopsis: localizedString(en.synopsis, fr.synopsis),
          wiki: localizedString(en.wiki, fr.wiki),
          background: pickShared(en, fr, 'background'),
          logo: pickShared(en, fr, 'logo'),
        };
      }

      if (collection === 'tags') {
        merged = {
          id: en.id ?? fr.id,
          title: localizedString(en.title, fr.title),
        };
      }

      if (collection === 'types') {
        merged = {
          id: en.id ?? fr.id,
          title: localizedString(en.title, fr.title),
        };
      }

      if (collection === 'history') {
        merged = {
          id: en.id ?? fr.id,
          title: localizedString(en.title, fr.title),
          meta: localizedString(en.meta, fr.meta),
          media: en.media || fr.media
            ? {
                year: pickShared(en.media ?? {}, fr.media ?? {}, 'year'),
                img: pickShared(en.media ?? {}, fr.media ?? {}, 'img'),
                alt: localizedString(en.media?.alt, fr.media?.alt),
              }
            : null,
          order: pickShared(en, fr, 'order') ?? 0,
        };
      }

      if (collection === 'piano-tiles') {
        merged = {
          id: en.id ?? fr.id,
          title: localizedString(en.title, fr.title),
          summary: localizedString(en.summary, fr.summary),
          backgroundImage: pickShared(en, fr, 'backgroundImage'),
          href: pickShared(en, fr, 'href'),
          order: pickShared(en, fr, 'order') ?? 0,
        };
      }

      if (!merged) {
        return;
      }

      writeYaml(join(baseDir, `${id}.yaml`), merged);
    });

    rmSync(enDir, { recursive: true, force: true });
    rmSync(frDir, { recursive: true, force: true });
  });
}

function writeMetaLangs() {
  writeYaml(join(OUT, 'meta', 'langs.yaml'), { langs: LANGS });
}

function run() {
  writeAnchors();
  writeContacts();
  writeMetaLangs();

  LANGS.forEach((lang) => {
    const langDir = join(V1_DATA, lang);
    const definitions = readJson(join(langDir, 'definitions.json'));
    const projects = readJson(join(langDir, 'projects.json'));
    const passions = readJson(join(langDir, 'passions.json'));
    const perspectives = readJson(join(langDir, 'perspectives.json'));
    const tags = readJson(join(langDir, 'tags.json'));
    const types = readJson(join(langDir, 'types.json'));
    const langData = readJson(join(langDir, 'lang.json'));

    writeDefinitions(lang, definitions);
    writeTagsAndTypes(lang, tags, types);
    writeProjects(lang, projects, definitions);
    writeLiterature(lang, passions, perspectives, definitions, projects);
    writeLangData(lang, langData, definitions, projects);
    writeHistory(lang, langData.history ?? [], definitions, projects);
    writePianoTiles(lang, langData);
  });

  mergeLocalizedOutputs();
}

run();
