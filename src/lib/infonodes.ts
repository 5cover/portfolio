import type { GalleryItem, Link } from '../content.config';
import * as content from './content';
import type { Locale } from '../i18n/site';

export type InfonodeRole = 'content' | 'layout';
export type InfonodeVisibility = 'public' | 'private';

export type InfonodeType =
    | 'Project'
    | 'Literature'
    | 'History'
    | 'Def'
    | 'Tag'
    | 'Connector'
    | 'Image'
    | 'Document'
    | 'PianoTile'
    | 'Contact'
    | 'Page'
    | 'Header'
    | 'Footer';

export interface InfonodeRef {
    id: string;
    type: InfonodeType;
    role: InfonodeRole;
    visibility: InfonodeVisibility;
}

export interface Infonode {
    id: string;
    type: InfonodeType;
    role: InfonodeRole;
    visibility: InfonodeVisibility;
    successors: InfonodeRef[];
    data?: unknown;
}

function nodeid(lang: string, type: InfonodeType, id: string): string {
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
        id: nodeid(lang, type, id),
        type,
        role,
        visibility,
    };
}

function uniqueRefs(refs: InfonodeRef[]): InfonodeRef[] {
    const seen = new Set<string>();
    return refs.filter(ref => {
        if (seen.has(ref.id)) {
            return false;
        }
        seen.add(ref.id);
        return true;
    });
}

export async function buildInfonodeGraph(l: Locale): Promise<Infonode[]> {
    const projects = content.project(l),
        literature = content.literature(l),
        defs = content.def(l),
        tags = content.tag(l),
        contacts = content.contact(),
        history = content.history(l),
        pianoTiles = content.pianoTile(l);

    const nodes: Infonode[] = [];

    const addNode = (node: Infonode) => {
        nodes.push(node);
    };

    tags.forEach(([id, data]) => {
        addNode({
            id: nodeid(l, 'Tag', id),
            type: 'Tag',
            role: 'content',
            visibility: 'private',
            successors: [],
            data,
        });
    });

    defs.forEach(([id, data]) => {
        addNode({
            id: nodeid(l, 'Def', id),
            type: 'Def',
            role: 'content',
            visibility: 'public',
            successors: [],
            data,
        });
    });

    contacts.forEach(([id, data]) => {
        addNode({
            id: nodeid(l, 'Contact', id),
            type: 'Contact',
            role: 'content',
            visibility: 'private',
            successors: [],
            data,
        });
    });

    history.forEach(([id, data]) => {
        const successors: InfonodeRef[] = [];
        if (data.media) {
            successors.push(makeRef(l, 'Image', `${id}:media`, 'content', 'private'));
        }
        addNode({
            id: nodeid(l, 'History', id),
            type: 'History',
            role: 'content',
            visibility: 'public',
            successors: uniqueRefs(successors),
            data: data,
        });

        if (data.media) {
            addNode({
                id: nodeid(l, 'Image', `${id}:media`),
                type: 'Image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data,
            });
        }
    });

    pianoTiles.forEach(([id, data]) => {
        const successors: InfonodeRef[] = [];
        const href = data.href;
        const projectMatch = href.match(/projects\/(.+)\.html/);
        const hobbyMatch = href.match(/hobbies\.html#(.+)/);
        const blogMatch = href.match(/blog\.html#(.+)/);

        if (projectMatch) {
            successors.push(makeRef(l, 'Project', projectMatch[1], 'content', 'public'));
        } else if (hobbyMatch) {
            successors.push(makeRef(l, 'Literature', hobbyMatch[1], 'content', 'public'));
        } else if (blogMatch) {
            successors.push(makeRef(l, 'Literature', blogMatch[1], 'content', 'public'));
        }

        addNode({
            id: nodeid(l, 'PianoTile', id),
            type: 'PianoTile',
            role: 'content',
            visibility: 'private',
            successors: uniqueRefs(successors),
            data,
        });
    });

    const createConnectorNodes = (parentId: string, links: Link[]): InfonodeRef[] => {
        return links.map((link, index) => {
            const connectorId = `${parentId}:connector:${index}`;
            const icon = content.anchor(link.anchor);
            const successors: InfonodeRef[] = [];

            successors.push(makeRef(l, 'Image', `${connectorId}:icon`, 'content', 'private'));
            addNode({
                id: nodeid(l, 'Image', `${connectorId}:icon`),
                type: 'Image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: icon,
            });

            addNode({
                id: nodeid(l, 'Connector', connectorId),
                type: 'Connector',
                role: 'content',
                visibility: 'private',
                successors: uniqueRefs(successors),
                data: link,
            });

            return makeRef(l, 'Connector', connectorId, 'content', 'private');
        });
    };

    const createMediaRefs = (parentId: string, gallery: GalleryItem[]) => {
        return gallery
            .map((item, index) => {
                const mediaId = `${parentId}:media:${index}`;
                if (item.src) {
                    addNode({
                        id: nodeid(l, 'Image', mediaId),
                        type: 'Image',
                        role: 'content',
                        visibility: 'private',
                        successors: [],
                        data: item,
                    });
                    return makeRef(l, 'Image', mediaId, 'content', 'private');
                }
                if (item.iframeSrc) {
                    addNode({
                        id: nodeid(l, 'Document', mediaId),
                        type: 'Document',
                        role: 'content',
                        visibility: 'public',
                        successors: [],
                        data: item,
                    });
                    return makeRef(l, 'Document', mediaId, 'content', 'public');
                }
                return null;
            })
            .filter((ref): ref is InfonodeRef => Boolean(ref));
    };

    projects.forEach(([id, project]) => {
        const successors: InfonodeRef[] = [];

        successors.push(...project.tags.map(tagId => makeRef(l, 'Tag', tagId, 'content', 'private')));

        successors.push(...project.technologies.map(defId => makeRef(l, 'Def', defId, 'content', 'public')));

        successors.push(...project.team.map(defId => makeRef(l, 'Def', defId, 'content', 'public')));

        successors.push(...createConnectorNodes(id, project.links));

        if (project.logo) {
            addNode({
                id: nodeid(l, 'Image', `${id}:logo`),
                type: 'Image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: project.logo,
            });
            successors.push(makeRef(l, 'Image', `${id}:logo`, 'content', 'private'));
        }

        if (project.background) {
            addNode({
                id: nodeid(l, 'Image', `${id}:background`),
                type: 'Image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: { src: project.background },
            });
            successors.push(makeRef(l, 'Image', `${id}:background`, 'content', 'private'));
        }

        successors.push(...createMediaRefs(id, project.gallery));

        addNode({
            id: nodeid(l, 'Project', id),
            type: 'Project',
            role: 'content',
            visibility: 'public',
            successors: uniqueRefs(successors),
            data: project,
        });
    });

    literature.forEach(([id, lit]) => {
        const successors: InfonodeRef[] = [];

        successors.push(...lit.tags.map(tagId => makeRef(l, 'Tag', tagId, 'content', 'private')));

        successors.push(...createConnectorNodes(id, lit.links));

        if (lit.logo) {
            addNode({
                id: nodeid(l, 'Image', `${id}:logo`),
                type: 'Image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: lit.logo,
            });
            successors.push(makeRef(l, 'Image', `${id}:logo`, 'content', 'private'));
        }

        if (lit.background) {
            addNode({
                id: nodeid(l, 'Image', `${id}:background`),
                type: 'Image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: { src: lit.background },
            });
            successors.push(makeRef(l, 'Image', `${id}:background`, 'content', 'private'));
        }

        successors.push(...createMediaRefs(id, lit.gallery));

        addNode({
            id: nodeid(l, 'Literature', id),
            type: 'Literature',
            role: 'content',
            visibility: 'public',
            successors: uniqueRefs(successors),
            data: lit,
        });
    });

    const projectRefs = projects.map(([id]) => makeRef(l, 'Project', id, 'content', 'public'));
    const hobbyRefs = literature
        .filter(([, lit]) => lit.kind === 'passion')
        .map(([id]) => makeRef(l, 'Literature', id, 'content', 'public'));
    const blogRefs = literature
        .filter(([, lit]) => lit.kind === 'blog')
        .map(([id]) => makeRef(l, 'Literature', id, 'content', 'public'));
    const historyRefs = history.map(([id]) => makeRef(l, 'History', id, 'content', 'public'));
    const pianoRefs = pianoTiles.map(([id]) => makeRef(l, 'PianoTile', id, 'content', 'private'));
    const contactRefs = contacts.map(([id]) => makeRef(l, 'Contact', id, 'content', 'private'));

    const ongoingProjectRefs = projects
        .filter(([, project]) => !project.endDate)
        .map(([id]) => makeRef(l, 'Project', id, 'content', 'public'));
    const butProjectRefs = projects
        .filter(([, project]) => project.tags.some(tag => tag.startsWith('but-')))
        .map(([id]) => makeRef(l, 'Project', id, 'content', 'public'));

    const pageNodes: Array<{ id: string; successors: InfonodeRef[] }> = [
        { id: 'index', successors: [...pianoRefs, ...ongoingProjectRefs, ...contactRefs] },
        { id: 'projects', successors: projectRefs },
        { id: 'hobbies', successors: hobbyRefs },
        { id: 'blog', successors: blogRefs },
        { id: 'history', successors: historyRefs },
        { id: 'history/history-but', successors: butProjectRefs },
    ];

    pageNodes.forEach(page => {
        addNode({
            id: nodeid(l, 'Page', page.id),
            type: 'Page',
            role: 'layout',
            visibility: 'public',
            successors: uniqueRefs(page.successors),
        });
    });

    const headerSuccessors = [
        makeRef(l, 'Page', 'projects', 'layout', 'public'),
        makeRef(l, 'Page', 'history', 'layout', 'public'),
        makeRef(l, 'Page', 'literature', 'layout', 'public'),
        makeRef(l, 'Page', 'blog', 'layout', 'public'),
        makeRef(l, 'Page', 'history/history-but', 'layout', 'public'),
    ];

    addNode({
        id: nodeid(l, 'Header', 'header'),
        type: 'Header',
        role: 'layout',
        visibility: 'private',
        successors: uniqueRefs(headerSuccessors),
    });

    addNode({
        id: nodeid(l, 'Footer', 'footer'),
        type: 'Footer',
        role: 'layout',
        visibility: 'private',
        successors: [],
    });

    return nodes;
}
