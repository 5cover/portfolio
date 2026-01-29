import type { Graphic, Item, LocalizedItem } from '../content/config';
import { requireElementById } from './util';

type Project = LocalizedItem<'projects'>;
type ProjectEntry = [id: string, project: Project];
type ProjectIndex = Record<string, Project>;
type TagIndex = Record<string, LocalizedItem<'tags'>>;
type AnchorIndex = Record<string, LocalizedItem<'anchors'>>;

async function init(): Promise<void> {
    const locale = document.documentElement.lang || 'fr';
    const dataBase = getDataBase();
    const localeBase = getLocaleBase(dataBase);
    const searchInputEl = requireElementById('search-input', HTMLInputElement);
    const listEl = requireElementById('project-list', HTMLUListElement);
    const datalistEl = requireElementById('project-titles', HTMLDataListElement);
    const tagListEl = requireElementById('list-tag', HTMLUListElement);
    const sortingInputs = document.querySelectorAll<HTMLInputElement>('input[name="sorting"]');

    const [projectsRaw, tagsRaw, anchorsRaw] = await Promise.all([
        fetchJson(`${dataBase}/projects.json`),
        fetchJson(`${dataBase}/tags.json`),
        fetchJson(`${dataBase}/anchors.json`),
    ]);

    const projectsIndex = projectsRaw as ProjectIndex;
    const tagsIndex = tagsRaw as TagIndex;
    const anchorsIndex = anchorsRaw as AnchorIndex;
    const ongoingLabel = document.documentElement.dataset.ongoingLabel || 'ongoing';
    const listPath = window.location.pathname;

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
        const presetInputEl = requireElementById(`tag-${presetTag}`, HTMLInputElement);
        const presetInput = presetInputEl;
        presetInput.checked = true;
        selectedTags.add(presetTag);
    }

    const render = async () => {
        const query = searchInputEl.value.trim();
        const sorting = Array.from(sortingInputs).find(input => input.checked)?.value ?? 'asc';

        const filtered = Object.entries(projectsIndex).filter(
            ([_, project]) => matchesSearch(project, query) && matchesTags(project, selectedTags)
        );

        const sorted = filtered.sort(([, a], [, b]) => {
            const titleA = stripTags(a.title).toLowerCase();
            const titleB = stripTags(b.title).toLowerCase();
            return sorting === 'desc' ? titleB.localeCompare(titleA) : titleA.localeCompare(titleB);
        });

        await updateList(sorted, tagsIndex, anchorsIndex, locale, ongoingLabel, listPath, localeBase, listEl);
    };

    searchInputEl.addEventListener('input', () => {
        void render();
    });
    sortingInputs.forEach(input =>
        input.addEventListener('change', () => {
            void render();
        })
    );

    await render();
}

async function updateList(
    projectEntries: ProjectEntry[],
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
        projectEntries.map(projectEntry =>
            renderProjectCard(projectEntry, tags, anchors, locale, ongoingLabel, listPath, localeBase)
        )
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

async function renderProjectCard(
    projectEntry: ProjectEntry,
    tags: TagIndex,
    anchors: AnchorIndex,
    locale: string,
    ongoingLabel: string,
    listPath: string,
    localeBase: string
): Promise<HTMLLIElement> {
    const [id, project] = projectEntry;
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

    const logoHtml = project.logo ? await getGraphicMarkup(project.logo, stripTags(project.title), 'logo') : '';

    const status = project.startDate
        ? `${formatDate(project.startDate, locale)} &ndash; ${project.endDate ? formatDate(project.endDate, locale) : ongoingLabel}`
        : '';

    const context = project.context ? project.context.charAt(0).toUpperCase() + project.context.slice(1) : '';

    const linksHtml = project.links.length
        ? `<ul class="list-link">${(
              await Promise.all(
                  project.links.map(async link => {
                      const anchor = anchors[link.anchor];
                      const icon = anchor ? await getGraphicMarkup(anchor, stripTags(link.label)) : '';
                      return `<li><a href="${link.href}" title="${stripTags(link.label)}" target="_blank" rel="noopener noreferrer">${icon}</a></li>`;
                  })
              )
          ).join('')}</ul>`
        : '';

    li.innerHTML = `
    <ul class="list-rect">${tagItems}</ul>
    ${logoHtml}
    <h3><a class="foil" href="${localeBase}/projects/${id}.html">${project.title}</a></h3>
    ${context ? `<small class="context">${context}</small>` : ''}
    ${status ? `<small class="status">${status}</small>` : ''}
    <p class="abstract">${project.abstract}</p>
    ${linksHtml}
  `;

    return li;
}

async function getGraphicMarkup(g: Graphic, title: string, className?: string): Promise<string> {
    if (g.kind === 'svg') {
        try {
            const response = await fetch(g.src);
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
    img.src = g.src;
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

async function fetchJson(url: string): Promise<unknown> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load ${url}`);
    }
    const data: unknown = await response.json();
    return data;
}

void init();
