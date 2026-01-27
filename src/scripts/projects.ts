import type { Item, LocalizedItem } from "../content/collections";
import type { Localized } from "../i18n/site";
import type { ExplicitUndefined } from "../lib/types";

type ProjectIndex = Record<string, LocalizedItem<'projects'>>;

type TagIndex = Record<string, Item<'tags'>>;

type AnchorIndex = Record<string, Item<'anchors'>>;

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

async function fetchJson(url: string): Promise<unknown> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load ${url}`);
    }
    const data: unknown = await response.json();
    return data;
}

function parseProjects(raw: unknown): ProjectIndex {
    if (!isRecord(raw)) {
        return {};
    }
    const result: ProjectIndex = {};
    Object.entries(raw).forEach(([id, entry]) => {
        if (!isRecord(entry)) {
            return;
        }
        if (typeof entry.title !== 'string' || typeof entry.abstract !== 'string') {
            return;
        }
        const links = Array.isArray(entry.links)
            ? entry.links
                  .map(link => {
                      if (!isRecord(link)) {
                          return null;
                      }
                      if (
                          typeof link.label !== 'string' ||
                          typeof link.href !== 'string' ||
                          typeof link.anchor !== 'string'
                      ) {
                          return null;
                      }
                      return {
                          label: link.label,
                          href: link.href,
                          anchor: link.anchor,
                      };
                  })
                  .filter(l => l !== null)
            : [];

        const logo =
            isRecord(entry.logo) && typeof entry.logo.url === 'string' && typeof entry.logo.kind === 'svg'
                ? entry.logo
                : undefined;

        result[id] = {
            id,
            title: entry.title,
            abstract: entry.abstract,
            context: typeof entry.context === 'string' ? entry.context : undefined,
            startDate: typeof entry.startDate === 'string' ? entry.startDate : undefined,
            endDate: typeof entry.endDate === 'string' ? entry.endDate : undefined,
            tags: Array.isArray(entry.tags) ? entry.tags.filter(tag => typeof tag === 'string') : [],
            links,
            logo,
            background: typeof entry.background === 'string' ? entry.background : undefined,
        };
    });
    return result;
}

function parseTags(raw: unknown): TagIndex {
    if (!isRecord(raw)) {
        return {};
    }
    const result: TagIndex = {};
    Object.entries(raw).forEach(([id, entry]) => {
        if (!isRecord(entry) || typeof entry.title !== 'string') {
            return;
        }
        result[id] = { id, title: entry.title };
    });
    return result;
}

function parseAnchors(raw: unknown): AnchorIndex {
    if (!isRecord(raw)) {
        return {};
    }
    const result: AnchorIndex = {};
    Object.entries(raw).forEach(([id, entry]) => {
        if (!isRecord(entry) || typeof entry.url !== 'string' || typeof entry.isThemedSvg !== 'boolean') {
            return;
        }
        result[id] = { id, url: entry.url, isThemedSvg: entry.isThemedSvg };
    });
    return result;
}

async function getGraphicMarkup(url: string, isThemedSvg: boolean, title: string, className?: string): Promise<string> {
    if (isThemedSvg && url.endsWith('.svg')) {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const svgMarkup = await response.text();
                const template = document.createElement('template');
                template.innerHTML = svgMarkup.trim();
                const svg = template.content.firstElementChild;
                if (svg instanceof SVGElement) {
                    if (title) {
                        svg.setAttribute('title', title);
                    }
                    if (className) {
                        svg.classList.add(className);
                    }
                    return svg.outerHTML;
                }
            }
        } catch {
            // Fall back to img output below.
        }
    }

    const img = document.createElement('img');
    img.src = url;
    img.alt = title;
    if (title) {
        img.title = title;
    }
    img.loading = 'lazy';
    if (className) {
        img.className = className;
    }
    return img.outerHTML;
}

function stripTags(value: string): string {
    return value.replace(/<[^>]*>/g, '');
}

function formatDate(dateString: string, locale: string): string {
    const date = new Date(dateString);
    if (Number.isNaN(date.valueOf())) {
        return dateString;
    }
    const label = new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(date);
    return `<time datetime="${dateString}">${label}</time>`;
}

async function renderProjectCard(
    project: Project,
    tags: TagIndex,
    anchors: AnchorIndex,
    locale: string,
    ongoingLabel: string,
    listPath: string,
    localeBase: string
): Promise<HTMLLIElement> {
    const li = document.createElement('li');
    if (project.background) {
        li.style.setProperty('--bg-img-card', `url(${project.background})`);
    }

    const tagItems = project.tags
        .map(tagId => {
            const tagTitle = tags[tagId]?.title ?? tagId;
            return `<li><a href="${listPath}?tag=${tagId}">${tagTitle}</a></li>`;
        })
        .join('');

    const logoHtml = project.logo
        ? await getGraphicMarkup(project.logo.url, project.logo.isThemedSvg, stripTags(project.title), 'logo')
        : '';

    const status = project.startDate
        ? `${formatDate(project.startDate, locale)} &ndash; ${project.endDate ? formatDate(project.endDate, locale) : ongoingLabel}`
        : '';

    const context = project.context ? project.context.charAt(0).toUpperCase() + project.context.slice(1) : '';

    const linksHtml = project.links.length
        ? `<ul class="list-link">${(
              await Promise.all(
                  project.links.map(async link => {
                      const anchor = anchors[link.anchor];
                      const icon = anchor
                          ? await getGraphicMarkup(anchor.url, anchor.isThemedSvg, stripTags(link.label))
                          : '';
                      return `<li><a href="${link.href}" title="${stripTags(link.label)}" target="_blank" rel="noopener noreferrer">${icon}</a></li>`;
                  })
              )
          ).join('')}</ul>`
        : '';

    li.innerHTML = `
    <ul class="list-rect">${tagItems}</ul>
    ${logoHtml}
    <h3><a class="foil" href="${localeBase}/projects/${project.id}.html">${project.title}</a></h3>
    ${context ? `<small class="context">${context}</small>` : ''}
    ${status ? `<small class="status">${status}</small>` : ''}
    <p class="abstract">${project.abstract}</p>
    ${linksHtml}
  `;

    return li;
}

async function updateList(
    projects: Project[],
    tags: TagIndex,
    anchors: AnchorIndex,
    locale: string,
    ongoingLabel: string,
    listPath: string,
    localeBase: string,
    listEl: HTMLElement
): Promise<void> {
    listEl.innerHTML = '';
    const items = await Promise.all(
        projects.map(project => renderProjectCard(project, tags, anchors, locale, ongoingLabel, listPath, localeBase))
    );
    items.forEach(item => listEl.appendChild(item));
    window.refreshDefinitionTooltips?.(listEl);
}

function matchesSearch(project: Project, query: string): boolean {
    if (!query) {
        return true;
    }
    const title = stripTags(project.title).toLowerCase();
    return title.includes(query.toLowerCase());
}

function matchesTags(project: Project, selectedTags: Set<string>): boolean {
    if (selectedTags.size === 0) {
        return true;
    }
    return Array.from(selectedTags).every(tag => project.tags.includes(tag));
}

function getDataBase(): string {
    return (document.documentElement.dataset.dataBase || '/data').replace(/\/$/, '');
}

function getLocaleBase(dataBase: string): string {
    return dataBase.endsWith('/data') ? dataBase.slice(0, -'/data'.length) : dataBase;
}

async function init(): Promise<void> {
    const locale = document.documentElement.lang || 'fr';
    const dataBase = getDataBase();
    const localeBase = getLocaleBase(dataBase);
    const searchInputEl = document.getElementById('search-input');
    const listEl = document.getElementById('project-list');
    const datalistEl = document.getElementById('project-titles');
    const tagListEl = document.getElementById('list-tag');
    const sortingInputs = document.querySelectorAll<HTMLInputElement>('input[name="sorting"]');

    if (!(searchInputEl instanceof HTMLInputElement) || !listEl || !datalistEl || !tagListEl) {
        return;
    }
    const searchInput = searchInputEl;

    const [projectsRaw, tagsRaw, anchorsRaw] = await Promise.all([
        fetchJson(`${dataBase}/projects.json`),
        fetchJson(`${dataBase}/tags.json`),
        fetchJson(`${dataBase}/anchors.json`),
    ]);

    const projectsIndex = parseProjects(projectsRaw);
    const tagsIndex = parseTags(tagsRaw);
    const anchorsIndex = parseAnchors(anchorsRaw);
    const ongoingLabel = document.documentElement.dataset.ongoingLabel || 'ongoing';
    const listPath = window.location.pathname;

    const projects = Object.values(projectsIndex);

    Object.values(projectsIndex).forEach(project => {
        const option = document.createElement('option');
        option.value = stripTags(project.title);
        datalistEl.appendChild(option);
    });

    const tagIds = Object.keys(tagsIndex).sort((a, b) => {
        const titleA = stripTags(tagsIndex[a].title).toLowerCase();
        const titleB = stripTags(tagsIndex[b].title).toLowerCase();
        return titleA.localeCompare(titleB);
    });

    const selectedTags = new Set<string>();
    tagIds.forEach(tagId => {
        const tag = tagsIndex[tagId];
        const li = document.createElement('li');
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'tags';
        input.id = `tag-${tagId}`;
        input.value = tagId;
        label.htmlFor = input.id;
        label.innerHTML = tag.title;
        label.appendChild(input);
        input.addEventListener('change', () => {
            if (input.checked) {
                selectedTags.add(tagId);
            } else {
                selectedTags.delete(tagId);
            }
            void render();
        });
        li.appendChild(label);
        tagListEl.appendChild(li);
    });

    const params = new URLSearchParams(window.location.search);
    const presetTag = params.get('tag');
    if (presetTag) {
        const presetInputEl = document.getElementById(`tag-${presetTag}`);
        if (presetInputEl instanceof HTMLInputElement) {
            const presetInput = presetInputEl;
            presetInput.checked = true;
            selectedTags.add(presetTag);
        }
    }

    const render = async () => {
        const query = searchInput.value.trim();
        const sorting = Array.from(sortingInputs).find(input => input.checked)?.value ?? 'asc';

        const filtered = projects.filter(
            project => matchesSearch(project, query) && matchesTags(project, selectedTags)
        );

        const sorted = filtered.sort((a, b) => {
            const titleA = stripTags(a.title).toLowerCase();
            const titleB = stripTags(b.title).toLowerCase();
            return sorting === 'desc' ? titleB.localeCompare(titleA) : titleA.localeCompare(titleB);
        });

        await updateList(sorted, tagsIndex, anchorsIndex, locale, ongoingLabel, listPath, localeBase, listEl);
    };

    searchInput.addEventListener('input', () => {
        void render();
    });
    sortingInputs.forEach(input =>
        input.addEventListener('change', () => {
            void render();
        })
    );

    await render();
}

void init();
