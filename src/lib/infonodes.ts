import type { GalleryItem, Link } from '../content.config';
import * as content from './content';
import type { Locale } from '../i18n';

export type InfonodeRole = 'content' | 'layout';
export type InfonodeVisibility = 'public' | 'private';

export type InfonodeType =
    | 'project'
    | 'literature'
    | 'history'
    | 'def'
    | 'tag'
    | 'connector'
    | 'image'
    | 'document'
    | 'piano-tile'
    | 'contact'
    | 'page'
    | 'header'
    | 'footer';

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
        contacts = content.contact(),
        history = content.history(l),
        pianoTiles = content.pianoTile(l);

    const nodes: Infonode[] = [];

    const addNode = (node: Infonode) => {
        nodes.push(node);
    };

    defs.forEach(([id, data]) => {
        addNode({
            id: nodeid(l, 'def', id),
            type: 'def',
            role: 'content',
            visibility: 'public',
            successors: [],
            data,
        });
    });

    contacts.forEach(([id, data]) => {
        addNode({
            id: nodeid(l, 'contact', id),
            type: 'contact',
            role: 'content',
            visibility: 'private',
            successors: [],
            data,
        });
    });

    history.forEach(([id, data]) => {
        const successors: InfonodeRef[] = [];
        if (data.media) {
            successors.push(makeRef(l, 'image', `${id}:media`, 'content', 'private'));
        }
        addNode({
            id: nodeid(l, 'history', id),
            type: 'history',
            role: 'content',
            visibility: 'public',
            successors: uniqueRefs(successors),
            data: data,
        });

        if (data.media) {
            addNode({
                id: nodeid(l, 'image', `${id}:media`),
                type: 'image',
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
        const projectMatch = href.match(/projects\/(.+)/);
        const hobbyMatch = href.match(/hobbies#(.+)/);
        const blogMatch = href.match(/blog#(.+)/);

        if (projectMatch) {
            successors.push(makeRef(l, 'project', projectMatch[1], 'content', 'public'));
        } else if (hobbyMatch) {
            successors.push(makeRef(l, 'literature', hobbyMatch[1], 'content', 'public'));
        } else if (blogMatch) {
            successors.push(makeRef(l, 'literature', blogMatch[1], 'content', 'public'));
        }

        addNode({
            id: nodeid(l, 'piano-tile', id),
            type: 'piano-tile',
            role: 'content',
            visibility: 'private',
            successors: uniqueRefs(successors),
            data,
        });
    });

    const createConnectorNodes = (parentId: string, links: Link[]): InfonodeRef[] => {
        return links.map((link, index) => {
            const connectorId = `${parentId}:connector:${index}`;
            const successors: InfonodeRef[] = [];

            addNode({
                id: nodeid(l, 'connector', connectorId),
                type: 'connector',
                role: 'content',
                visibility: 'private',
                successors: uniqueRefs(successors),
                data: link,
            });

            return makeRef(l, 'connector', connectorId, 'content', 'private');
        });
    };

    const createMediaRefs = (parentId: string, gallery: GalleryItem[]) => {
        return gallery
            .map((item, index) => {
                const mediaId = `${parentId}:media:${index}`;
                if (item.src) {
                    addNode({
                        id: nodeid(l, 'image', mediaId),
                        type: 'image',
                        role: 'content',
                        visibility: 'private',
                        successors: [],
                        data: item,
                    });
                    return makeRef(l, 'image', mediaId, 'content', 'private');
                }
                if (item.iframeSrc) {
                    addNode({
                        id: nodeid(l, 'document', mediaId),
                        type: 'document',
                        role: 'content',
                        visibility: 'public',
                        successors: [],
                        data: item,
                    });
                    return makeRef(l, 'document', mediaId, 'content', 'public');
                }
                return null;
            })
            .filter((ref): ref is InfonodeRef => Boolean(ref));
    };

    projects.forEach(([id, project]) => {
        const successors: InfonodeRef[] = [];

        successors.push(...project.tags.map(tagId => makeRef(l, 'tag', tagId, 'content', 'private')));

        successors.push(...project.technologies.map(({ id }) => makeRef(l, 'def', id, 'content', 'public')));

        successors.push(...project.team.map(({ id }) => makeRef(l, 'def', id, 'content', 'public')));

        successors.push(...createConnectorNodes(id, project.links));

        if (project.logo) {
            addNode({
                id: nodeid(l, 'image', `${id}:logo`),
                type: 'image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: project.logo,
            });
            successors.push(makeRef(l, 'image', `${id}:logo`, 'content', 'private'));
        }

        if (project.background) {
            addNode({
                id: nodeid(l, 'image', `${id}:background`),
                type: 'image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: { src: project.background },
            });
            successors.push(makeRef(l, 'image', `${id}:background`, 'content', 'private'));
        }

        successors.push(...createMediaRefs(id, project.gallery));

        addNode({
            id: nodeid(l, 'project', id),
            type: 'project',
            role: 'content',
            visibility: 'public',
            successors: uniqueRefs(successors),
            data: project,
        });
    });

    literature.forEach(([id, lit]) => {
        const successors: InfonodeRef[] = [];

        successors.push(...lit.tags.map(tagId => makeRef(l, 'tag', tagId, 'content', 'private')));

        successors.push(...createConnectorNodes(id, lit.links));

        if (lit.logo) {
            addNode({
                id: nodeid(l, 'image', `${id}:logo`),
                type: 'image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: lit.logo,
            });
            successors.push(makeRef(l, 'image', `${id}:logo`, 'content', 'private'));
        }

        if (lit.background) {
            addNode({
                id: nodeid(l, 'image', `${id}:background`),
                type: 'image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: { src: lit.background },
            });
            successors.push(makeRef(l, 'image', `${id}:background`, 'content', 'private'));
        }

        successors.push(...createMediaRefs(id, lit.gallery));

        addNode({
            id: nodeid(l, 'literature', id),
            type: 'literature',
            role: 'content',
            visibility: 'public',
            successors: uniqueRefs(successors),
            data: lit,
        });
    });

    const projectRefs = projects.map(([id]) => makeRef(l, 'project', id, 'content', 'public'));
    const hobbyRefs = literature
        .filter(([, lit]) => lit.kind === 'passion')
        .map(([id]) => makeRef(l, 'literature', id, 'content', 'public'));
    const blogRefs = literature
        .filter(([, lit]) => lit.kind === 'blog')
        .map(([id]) => makeRef(l, 'literature', id, 'content', 'public'));
    const historyRefs = history.map(([id]) => makeRef(l, 'history', id, 'content', 'public'));
    const pianoRefs = pianoTiles.map(([id]) => makeRef(l, 'piano-tile', id, 'content', 'private'));
    const contactRefs = contacts.map(([id]) => makeRef(l, 'contact', id, 'content', 'private'));

    const ongoingProjectRefs = projects
        .filter(([, project]) => !project.endDate)
        .map(([id]) => makeRef(l, 'project', id, 'content', 'public'));
    const butProjectRefs = projects
        .filter(([, project]) => project.tags.some(tag => tag.startsWith('but-')))
        .map(([id]) => makeRef(l, 'project', id, 'content', 'public'));

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
            id: nodeid(l, 'page', page.id),
            type: 'page',
            role: 'layout',
            visibility: 'public',
            successors: uniqueRefs(page.successors),
        });
    });

    const headerSuccessors = [
        makeRef(l, 'page', 'projects', 'layout', 'public'),
        makeRef(l, 'page', 'history', 'layout', 'public'),
        makeRef(l, 'page', 'literature', 'layout', 'public'),
        makeRef(l, 'page', 'blog', 'layout', 'public'),
        makeRef(l, 'page', 'history/history-but', 'layout', 'public'),
    ];

    addNode({
        id: nodeid(l, 'header', 'header'),
        type: 'header',
        role: 'layout',
        visibility: 'private',
        successors: uniqueRefs(headerSuccessors),
    });

    addNode({
        id: nodeid(l, 'footer', 'footer'),
        type: 'footer',
        role: 'layout',
        visibility: 'private',
        successors: [],
    });

    return nodes;
}
