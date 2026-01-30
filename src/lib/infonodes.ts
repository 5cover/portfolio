import { getCollection } from 'astro:content';
import type { GalleryItem, Item, Link } from '../content/config';
import {
    getAnchors,
    getContacts,
    getDefinitions,
    getHistory,
    getLiterature,
    getPianoTiles,
    getProjects,
    getTags,
    mapById,
} from './content';
import type { Locale } from '../i18n/site';

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

export async function buildInfonodeGraph(lang: Locale): Promise<Infonode[]> {
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

    tags.forEach(([id, data]) => {
        addNode({
            id: nodeid(lang, 'Tag', id),
            type: 'Tag',
            role: 'content',
            visibility: 'private',
            successors: [],
            data,
        });
    });

    definitions.forEach(([id, data]) => {
        addNode({
            id: nodeid(lang, 'Definition', id),
            type: 'Definition',
            role: 'content',
            visibility: 'public',
            successors: [],
            data,
        });
    });

    contacts.forEach(([id, data]) => {
        addNode({
            id: nodeid(lang, 'Contact', id),
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
            successors.push(makeRef(lang, 'Image', `${id}:media`, 'content', 'private'));
        }
        addNode({
            id: nodeid(lang, 'History', id),
            type: 'History',
            role: 'content',
            visibility: 'public',
            successors: uniqueRefs(successors),
            data: data,
        });

        if (data.media) {
            addNode({
                id: nodeid(lang, 'Image', `${id}:media`),
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
            successors.push(makeRef(lang, 'Project', projectMatch[1], 'content', 'public'));
        } else if (hobbyMatch) {
            successors.push(makeRef(lang, 'Literature', hobbyMatch[1], 'content', 'public'));
        } else if (blogMatch) {
            successors.push(makeRef(lang, 'Literature', blogMatch[1], 'content', 'public'));
        }

        addNode({
            id: nodeid(lang, 'PianoTile', id),
            type: 'PianoTile',
            role: 'content',
            visibility: 'private',
            successors: uniqueRefs(successors),
            data,
        });
    });

    const anchorMap = mapById(anchors);

    const createConnectorNodes = (parentId: string, links: Link[]): InfonodeRef[] => {
        return links.map((link, index) => {
            const connectorId = `${parentId}:connector:${index}`;
            const icon = anchorMap[link.anchor] ?? null;
            const successors: InfonodeRef[] = [];

            if (icon) {
                successors.push(makeRef(lang, 'Image', `${connectorId}:icon`, 'content', 'private'));
                addNode({
                    id: nodeid(lang, 'Image', `${connectorId}:icon`),
                    type: 'Image',
                    role: 'content',
                    visibility: 'private',
                    successors: [],
                    data: icon,
                });
            }

            addNode({
                id: nodeid(lang, 'Connector', connectorId),
                type: 'Connector',
                role: 'content',
                visibility: 'private',
                successors: uniqueRefs(successors),
                data: link,
            });

            return makeRef(lang, 'Connector', connectorId, 'content', 'private');
        });
    };

    const createMediaRefs = (parentId: string, gallery: GalleryItem[]) => {
        return gallery
            .map((item, index) => {
                const mediaId = `${parentId}:media:${index}`;
                if (item.src) {
                    addNode({
                        id: nodeid(lang, 'Image', mediaId),
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
                        id: nodeid(lang, 'Document', mediaId),
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

    projects.forEach(([id, project]) => {
        const successors: InfonodeRef[] = [];

        successors.push(...project.tags.map(tagId => makeRef(lang, 'Tag', tagId, 'content', 'private')));

        successors.push(...project.technologies.map(defId => makeRef(lang, 'Definition', defId, 'content', 'public')));

        successors.push(...project.team.map(defId => makeRef(lang, 'Definition', defId, 'content', 'public')));

        successors.push(...createConnectorNodes(id, project.links));

        if (project.logo) {
            addNode({
                id: nodeid(lang, 'Image', `${id}:logo`),
                type: 'Image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: project.logo,
            });
            successors.push(makeRef(lang, 'Image', `${id}:logo`, 'content', 'private'));
        }

        if (project.background) {
            addNode({
                id: nodeid(lang, 'Image', `${id}:background`),
                type: 'Image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: { src: project.background },
            });
            successors.push(makeRef(lang, 'Image', `${id}:background`, 'content', 'private'));
        }

        successors.push(...createMediaRefs(id, project.gallery));

        addNode({
            id: nodeid(lang, 'Project', id),
            type: 'Project',
            role: 'content',
            visibility: 'public',
            successors: uniqueRefs(successors),
            data: project,
        });
    });

    literature.forEach(([id, lit]) => {
        const successors: InfonodeRef[] = [];

        successors.push(...lit.tags.map(tagId => makeRef(lang, 'Tag', tagId, 'content', 'private')));

        successors.push(...createConnectorNodes(id, lit.links));

        if (lit.logo) {
            addNode({
                id: nodeid(lang, 'Image', `${id}:logo`),
                type: 'Image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: lit.logo,
            });
            successors.push(makeRef(lang, 'Image', `${id}:logo`, 'content', 'private'));
        }

        if (lit.background) {
            addNode({
                id: nodeid(lang, 'Image', `${id}:background`),
                type: 'Image',
                role: 'content',
                visibility: 'private',
                successors: [],
                data: { src: lit.background },
            });
            successors.push(makeRef(lang, 'Image', `${id}:background`, 'content', 'private'));
        }

        successors.push(...createMediaRefs(id, lit.gallery));

        addNode({
            id: nodeid(lang, 'Literature', id),
            type: 'Literature',
            role: 'content',
            visibility: 'public',
            successors: uniqueRefs(successors),
            data: lit,
        });
    });

    const projectRefs = projects.map(([id]) => makeRef(lang, 'Project', id, 'content', 'public'));
    const hobbyRefs = literature
        .filter(([, lit]) => lit.kind === 'passion')
        .map(([id]) => makeRef(lang, 'Literature', id, 'content', 'public'));
    const blogRefs = literature
        .filter(([, lit]) => lit.kind === 'blog')
        .map(([id]) => makeRef(lang, 'Literature', id, 'content', 'public'));
    const historyRefs = history.map(([id]) => makeRef(lang, 'History', id, 'content', 'public'));
    const pianoRefs = pianoTiles.map(([id]) => makeRef(lang, 'PianoTile', id, 'content', 'private'));
    const contactRefs = contacts.map(([id]) => makeRef(lang, 'Contact', id, 'content', 'private'));

    const ongoingProjectRefs = projects
        .filter(([, project]) => !project.endDate)
        .map(([id]) => makeRef(lang, 'Project', id, 'content', 'public'));
    const butProjectRefs = projects
        .filter(([, project]) => project.tags.some(tag => tag.startsWith('but-')))
        .map(([id]) => makeRef(lang, 'Project', id, 'content', 'public'));

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
            id: nodeid(lang, 'Page', page.id),
            type: 'Page',
            role: 'layout',
            visibility: 'public',
            successors: uniqueRefs(page.successors),
        });
    });

    const headerSuccessors = [
        makeRef(lang, 'Page', 'projects', 'layout', 'public'),
        makeRef(lang, 'Page', 'history', 'layout', 'public'),
        makeRef(lang, 'Page', 'literature', 'layout', 'public'),
        makeRef(lang, 'Page', 'blog', 'layout', 'public'),
        makeRef(lang, 'Page', 'history/history-but', 'layout', 'public'),
    ];

    addNode({
        id: nodeid(lang, 'Header', 'header'),
        type: 'Header',
        role: 'layout',
        visibility: 'private',
        successors: uniqueRefs(headerSuccessors),
    });

    addNode({
        id: nodeid(lang, 'Footer', 'footer'),
        type: 'Footer',
        role: 'layout',
        visibility: 'private',
        successors: [],
    });

    return nodes;
}
