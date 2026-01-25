import {
  getAnchors,
  getContacts,
  getDefinitions,
  getHistory,
  getLiterature,
  getPianoTiles,
  getProjects,
  getTags,
} from './content';

export type InfonodeRole = 'content' | 'layout';
export type InfonodeVisibility = 'public' | 'private';

export type InfonodeType =
  | 'Project'
  | 'Literature'
  | 'History'
  | 'Definition'
  | 'Tag'
  | 'Connector'
  | 'Image'
  | 'Document'
  | 'PianoTile'
  | 'Contact'
  | 'Page'
  | 'Header'
  | 'Footer';

export type InfonodeRef = {
  id: string;
  type: InfonodeType;
  role: InfonodeRole;
  visibility: InfonodeVisibility;
};

export type Infonode = {
  id: string;
  type: InfonodeType;
  role: InfonodeRole;
  visibility: InfonodeVisibility;
  successors: InfonodeRef[];
  data?: unknown;
};

function nodeId(lang: string, type: InfonodeType, id: string): string {
  return `${lang}:${type}:${id}`;
}

function makeRef(
  lang: string,
  type: InfonodeType,
  id: string,
  role: InfonodeRole,
  visibility: InfonodeVisibility
): InfonodeRef {
  return {
    id: nodeId(lang, type, id),
    type,
    role,
    visibility,
  };
}

function uniqueRefs(refs: InfonodeRef[]): InfonodeRef[] {
  const seen = new Set<string>();
  return refs.filter((ref) => {
    if (seen.has(ref.id)) {
      return false;
    }
    seen.add(ref.id);
    return true;
  });
}

export async function buildInfonodeGraph(lang: string): Promise<Infonode[]> {
  const [projects, literature, definitions, tags, contacts, history, pianoTiles, anchors] = await Promise.all([
    getProjects(lang),
    getLiterature(lang),
    getDefinitions(lang),
    getTags(lang),
    getContacts(),
    getHistory(lang),
    getPianoTiles(lang),
    getAnchors(),
  ]);

  const nodes: Infonode[] = [];

  const addNode = (node: Infonode) => {
    nodes.push(node);
  };

  tags.forEach((tag) => {
    addNode({
      id: nodeId(lang, 'Tag', tag.id),
      type: 'Tag',
      role: 'content',
      visibility: 'private',
      successors: [],
      data: tag.data,
    });
  });

  definitions.forEach((definition) => {
    addNode({
      id: nodeId(lang, 'Definition', definition.id),
      type: 'Definition',
      role: 'content',
      visibility: 'public',
      successors: [],
      data: definition.data,
    });
  });

  contacts.forEach((contact) => {
    addNode({
      id: nodeId(lang, 'Contact', contact.id),
      type: 'Contact',
      role: 'content',
      visibility: 'private',
      successors: [],
      data: contact.data,
    });
  });

  history.forEach((entry) => {
    const successors: InfonodeRef[] = [];
    if (entry.data.media) {
      successors.push(makeRef(lang, 'Image', `${entry.id}:media`, 'content', 'private'));
    }
    addNode({
      id: nodeId(lang, 'History', entry.id),
      type: 'History',
      role: 'content',
      visibility: 'public',
      successors: uniqueRefs(successors),
      data: entry.data,
    });

    if (entry.data.media) {
      addNode({
        id: nodeId(lang, 'Image', `${entry.id}:media`),
        type: 'Image',
        role: 'content',
        visibility: 'private',
        successors: [],
        data: entry.data.media,
      });
    }
  });

  pianoTiles.forEach((tile) => {
    const successors: InfonodeRef[] = [];
    const href = tile.data.href;
    const projectMatch = href.match(/projects\/(.+)\.html/);
    const hobbyMatch = href.match(/hobbies\.html#(.+)/);
    const blogMatch = href.match(/blog\.html#(.+)/);

    if (projectMatch) {
      successors.push(makeRef(lang, 'Project', projectMatch[1], 'content', 'public'));
    } else if (hobbyMatch) {
      successors.push(makeRef(lang, 'Literature', hobbyMatch[1], 'content', 'public'));
    } else if (blogMatch) {
      successors.push(makeRef(lang, 'Literature', blogMatch[1], 'content', 'public'));
    }

    addNode({
      id: nodeId(lang, 'PianoTile', tile.id),
      type: 'PianoTile',
      role: 'content',
      visibility: 'private',
      successors: uniqueRefs(successors),
      data: tile.data,
    });
  });

  const anchorMap = anchors.reduce<Record<string, { url: string; isThemedSvg: boolean }>>(
    (acc, anchor) => {
      acc[anchor.id] = anchor.data;
      return acc;
    },
    {}
  );

  const createConnectorNodes = (
    parentId: string,
    links: Array<{ label: string; anchor: string; href: string }>
  ): InfonodeRef[] => {
    return links.map((link, index) => {
      const connectorId = `${parentId}:connector:${index}`;
      const icon = anchorMap[link.anchor] ?? null;
      const successors: InfonodeRef[] = [];

      if (icon) {
        successors.push(makeRef(lang, 'Image', `${connectorId}:icon`, 'content', 'private'));
        addNode({
          id: nodeId(lang, 'Image', `${connectorId}:icon`),
          type: 'Image',
          role: 'content',
          visibility: 'private',
          successors: [],
          data: icon,
        });
      }

      addNode({
        id: nodeId(lang, 'Connector', connectorId),
        type: 'Connector',
        role: 'content',
        visibility: 'private',
        successors: uniqueRefs(successors),
        data: link,
      });

      return makeRef(lang, 'Connector', connectorId, 'content', 'private');
    });
  };

  const createMediaRefs = (parentId: string, gallery: Array<{ url: string | null; iframeSrc: string | null; content: string | null }>) => {
    return gallery
      .map((item, index) => {
        const mediaId = `${parentId}:media:${index}`;
        if (item.url) {
          addNode({
            id: nodeId(lang, 'Image', mediaId),
            type: 'Image',
            role: 'content',
            visibility: 'private',
            successors: [],
            data: item,
          });
          return makeRef(lang, 'Image', mediaId, 'content', 'private');
        }
        if (item.iframeSrc) {
          addNode({
            id: nodeId(lang, 'Document', mediaId),
            type: 'Document',
            role: 'content',
            visibility: 'public',
            successors: [],
            data: item,
          });
          return makeRef(lang, 'Document', mediaId, 'content', 'public');
        }
        return null;
      })
      .filter((ref): ref is InfonodeRef => Boolean(ref));
  };

  projects.forEach((project) => {
    const projectId = project.id;
    const successors: InfonodeRef[] = [];

    successors.push(
      ...project.data.tags.map((tagId) => makeRef(lang, 'Tag', tagId, 'content', 'private'))
    );

    successors.push(
      ...project.data.technologies.map((defId) =>
        makeRef(lang, 'Definition', defId, 'content', 'public')
      )
    );

    successors.push(
      ...project.data.team.map((defId) => makeRef(lang, 'Definition', defId, 'content', 'public'))
    );

    successors.push(...createConnectorNodes(projectId, project.data.links));

    if (project.data.logo) {
      addNode({
        id: nodeId(lang, 'Image', `${projectId}:logo`),
        type: 'Image',
        role: 'content',
        visibility: 'private',
        successors: [],
        data: project.data.logo,
      });
      successors.push(makeRef(lang, 'Image', `${projectId}:logo`, 'content', 'private'));
    }

    if (project.data.background) {
      addNode({
        id: nodeId(lang, 'Image', `${projectId}:background`),
        type: 'Image',
        role: 'content',
        visibility: 'private',
        successors: [],
        data: { src: project.data.background },
      });
      successors.push(makeRef(lang, 'Image', `${projectId}:background`, 'content', 'private'));
    }

    successors.push(...createMediaRefs(projectId, project.data.gallery));

    addNode({
      id: nodeId(lang, 'Project', projectId),
      type: 'Project',
      role: 'content',
      visibility: 'public',
      successors: uniqueRefs(successors),
      data: project.data,
    });
  });

  literature.forEach((entry) => {
    const litId = entry.id;
    const successors: InfonodeRef[] = [];

    successors.push(
      ...entry.data.tags.map((tagId) => makeRef(lang, 'Tag', tagId, 'content', 'private'))
    );

    successors.push(...createConnectorNodes(litId, entry.data.links));

    if (entry.data.logo) {
      addNode({
        id: nodeId(lang, 'Image', `${litId}:logo`),
        type: 'Image',
        role: 'content',
        visibility: 'private',
        successors: [],
        data: entry.data.logo,
      });
      successors.push(makeRef(lang, 'Image', `${litId}:logo`, 'content', 'private'));
    }

    if (entry.data.background) {
      addNode({
        id: nodeId(lang, 'Image', `${litId}:background`),
        type: 'Image',
        role: 'content',
        visibility: 'private',
        successors: [],
        data: { src: entry.data.background },
      });
      successors.push(makeRef(lang, 'Image', `${litId}:background`, 'content', 'private'));
    }

    successors.push(...createMediaRefs(litId, entry.data.gallery));

    addNode({
      id: nodeId(lang, 'Literature', litId),
      type: 'Literature',
      role: 'content',
      visibility: 'public',
      successors: uniqueRefs(successors),
      data: entry.data,
    });
  });

  const projectRefs = projects.map((project) =>
    makeRef(lang, 'Project', project.id, 'content', 'public')
  );
  const hobbyRefs = literature
    .filter((entry) => entry.data.kind === 'passion')
    .map((entry) => makeRef(lang, 'Literature', entry.id, 'content', 'public'));
  const blogRefs = literature
    .filter((entry) => entry.data.kind === 'blog')
    .map((entry) => makeRef(lang, 'Literature', entry.id, 'content', 'public'));
  const historyRefs = history.map((entry) =>
    makeRef(lang, 'History', entry.id, 'content', 'public')
  );
  const pianoRefs = pianoTiles.map((tile) =>
    makeRef(lang, 'PianoTile', tile.id, 'content', 'private')
  );
  const contactRefs = contacts.map((contact) =>
    makeRef(lang, 'Contact', contact.id, 'content', 'private')
  );

  const ongoingProjectRefs = projects
    .filter((project) => !project.data.endDate)
    .map((project) => makeRef(lang, 'Project', project.id, 'content', 'public'));
  const butProjectRefs = projects
    .filter((project) => project.data.tags.some((tag) => tag.startsWith('but-')))
    .map((project) => makeRef(lang, 'Project', project.id, 'content', 'public'));

  const pageNodes: Array<{ id: string; successors: InfonodeRef[] }> = [
    { id: 'index', successors: [...pianoRefs, ...ongoingProjectRefs, ...contactRefs] },
    { id: 'projects', successors: projectRefs },
    { id: 'hobbies', successors: hobbyRefs },
    { id: 'blog', successors: blogRefs },
    { id: 'history', successors: historyRefs },
    { id: 'history/history-but', successors: butProjectRefs },
  ];

  pageNodes.forEach((page) => {
    addNode({
      id: nodeId(lang, 'Page', page.id),
      type: 'Page',
      role: 'layout',
      visibility: 'public',
      successors: uniqueRefs(page.successors),
    });
  });

  const headerSuccessors = [
    makeRef(lang, 'Page', 'projects', 'layout', 'public'),
    makeRef(lang, 'Page', 'history', 'layout', 'public'),
    makeRef(lang, 'Page', 'hobbies', 'layout', 'public'),
    makeRef(lang, 'Page', 'blog', 'layout', 'public'),
    makeRef(lang, 'Page', 'history/history-but', 'layout', 'public'),
  ];

  addNode({
    id: nodeId(lang, 'Header', 'header'),
    type: 'Header',
    role: 'layout',
    visibility: 'private',
    successors: uniqueRefs(headerSuccessors),
  });

  addNode({
    id: nodeId(lang, 'Footer', 'footer'),
    type: 'Footer',
    role: 'layout',
    visibility: 'private',
    successors: [],
  });

  return nodes;
}
