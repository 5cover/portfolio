type DefinitionName = {
    full: string;
    abbr?: string;
    short?: string;
};

type DefinitionEntry = {
    id: string;
    name: DefinitionName;
    synopsis: string;
    wiki: string;
    type: string;
    background?: string | null;
    logo?: {
        url: string;
        isThemedSvg: boolean;
    } | null;
};

type TypeEntry = {
    id: string;
    title: string;
};

type DefinitionIndex = Record<string, DefinitionEntry>;

type TypeIndex = Record<string, TypeEntry>;

const tooltipLeftOffset = 20 * 0.75;
const tooltipTriggerMarginTop = 20 * 0.25;
const tooltipHideTransitionMs = 1000 / 3;
const pendingTooltipRoots: ParentNode[] = [];
let definitionData: { definitions: DefinitionIndex; types: TypeIndex } | null = null;

function getLang(): string {
    return document.documentElement.lang || 'fr';
}

function getDefinitionTitle(definition: DefinitionEntry): string {
    return definition.name.full;
}

function applyTheme(theme: string): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function syncThemeRadios(theme: string): void {
    const input = document.querySelector<HTMLInputElement>(`input[name="theme"][value="${theme}"]`);
    if (input) {
        input.checked = true;
    }
}

function setupThemeSwitches(): void {
    const storedTheme = localStorage.getItem('theme') || 'system';
    syncThemeRadios(storedTheme);

    const inputs = document.querySelectorAll<HTMLInputElement>('input[name="theme"]');
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            if (input.checked) {
                applyTheme(input.value);
            }
        });
    });
}

function updateCurrentYear(): void {
    const year = new Date().getFullYear();
    document.querySelectorAll<HTMLTimeElement>('time[data-current-year]').forEach(time => {
        time.dateTime = String(year);
        time.textContent = String(year);
    });
}

function resolveTooltipPosition(trigger: HTMLElement, tooltip: HTMLElement, event: Event): void {
    const rect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const pageX =
        event instanceof MouseEvent && typeof event.pageX === 'number'
            ? event.pageX
            : rect.left + scrollX + tooltipLeftOffset;
    const left = Math.max(0, pageX - tooltipLeftOffset);
    const top = Math.max(0, rect.top + scrollY - tooltipRect.height - tooltipTriggerMarginTop);
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
}

async function fetchJson(url: string): Promise<unknown> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load ${url}`);
    }
    const data: unknown = await response.json();
    return data;
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseDefinitionIndex(raw: unknown): DefinitionIndex {
    if (!isRecord(raw)) {
        return {};
    }

    const result: DefinitionIndex = {};
    Object.entries(raw).forEach(([id, entry]) => {
        if (!isRecord(entry) || !isRecord(entry.name)) {
            return;
        }
        const nameFull = entry.name.full;
        const synopsis = entry.synopsis;
        const wiki = entry.wiki;
        const type = entry.type;

        if (
            typeof nameFull !== 'string' ||
            typeof synopsis !== 'string' ||
            typeof wiki !== 'string' ||
            typeof type !== 'string'
        ) {
            return;
        }

        const name: DefinitionName = { full: nameFull };
        if (typeof entry.name.abbr === 'string') {
            name.abbr = entry.name.abbr;
        }
        if (typeof entry.name.short === 'string') {
            name.short = entry.name.short;
        }

        const logo =
            isRecord(entry.logo) && typeof entry.logo.url === 'string' && typeof entry.logo.isThemedSvg === 'boolean'
                ? { url: entry.logo.url, isThemedSvg: entry.logo.isThemedSvg }
                : null;
        const background = typeof entry.background === 'string' ? entry.background : null;

        result[id] = {
            id,
            name,
            synopsis,
            wiki,
            type,
            background,
            logo,
        };
    });

    return result;
}

function parseTypeIndex(raw: unknown): TypeIndex {
    if (!isRecord(raw)) {
        return {};
    }
    const result: TypeIndex = {};
    Object.entries(raw).forEach(([id, entry]) => {
        if (!isRecord(entry) || typeof entry.title !== 'string') {
            return;
        }
        result[id] = { id, title: entry.title };
    });
    return result;
}

async function loadDefinitionData(lang: string): Promise<{
    definitions: DefinitionIndex;
    types: TypeIndex;
}> {
    const [definitionsRaw, typesRaw] = await Promise.all([
        fetchJson(`/portfolio/data/${lang}/definitions.json`),
        fetchJson(`/portfolio/data/${lang}/types.json`),
    ]);

    return {
        definitions: parseDefinitionIndex(definitionsRaw),
        types: parseTypeIndex(typesRaw),
    };
}

async function createTooltip(
    template: HTMLTemplateElement,
    definition: DefinitionEntry,
    types: TypeIndex
): Promise<HTMLElement> {
    const fragmentNode = template.content.cloneNode(true);
    if (!(fragmentNode instanceof DocumentFragment)) {
        throw new Error('Unexpected tooltip template clone');
    }
    const fragment = fragmentNode;
    const tooltipNode = fragment.firstElementChild;
    if (!(tooltipNode instanceof HTMLElement)) {
        throw new Error('Unexpected tooltip root');
    }
    const tooltip = tooltipNode;
    const titleLink = tooltip.querySelector<HTMLAnchorElement>('.title a');
    const typeEl = tooltip.querySelector<HTMLElement>('.type small');
    const synopsisEl = tooltip.querySelector<HTMLElement>('.synopsis');

    if (titleLink) {
        titleLink.textContent = getDefinitionTitle(definition);
        titleLink.href = definition.wiki;
    }

    if (typeEl) {
        const typeName = types[definition.type]?.title ?? definition.type;
        typeEl.textContent = typeName.charAt(0).toUpperCase() + typeName.slice(1);
    }

    if (synopsisEl) {
        synopsisEl.innerHTML = definition.synopsis;
    }

    if (definition.background) {
        tooltip.style.setProperty('--bg-img-card', `url(${definition.background})`);
    }

    if (definition.logo) {
        const logoTitle = getDefinitionTitle(definition);
        let logoElement: Element;

        if (definition.logo.isThemedSvg && definition.logo.url.endsWith('.svg')) {
            const response = await fetch(definition.logo.url);
            if (!response.ok) {
                throw new Error(`Failed to load ${definition.logo.url}`);
            }
            const svgMarkup = await response.text();
            const templateEl = document.createElement('template');
            templateEl.innerHTML = svgMarkup.trim();
            const svg = templateEl.content.firstElementChild;
            if (!(svg instanceof SVGElement)) {
                throw new Error(`Unexpected SVG content for ${definition.logo.url}`);
            }
            svg.setAttribute('title', logoTitle);
            svg.classList.add('logo');
            logoElement = svg;
        } else {
            const logo = document.createElement('img');
            logo.src = definition.logo.url;
            logo.alt = logoTitle;
            logo.className = 'logo';
            logo.loading = 'lazy';
            logoElement = logo;
        }

        const heading = tooltip.querySelector('h4');
        if (heading?.parentElement) {
            heading.parentElement.insertBefore(logoElement, heading.nextSibling);
        } else {
            tooltip.appendChild(logoElement);
        }
    }

    tooltip.classList.add('hide');
    return tooltip;
}

function setupDefinitionTooltips(definitions: DefinitionIndex, types: TypeIndex, root: ParentNode = document): void {
    const template = document.querySelector<HTMLTemplateElement>('#template-definition-tooltip');
    if (!template) {
        return;
    }

    let zIndex = 10;

    root.querySelectorAll<HTMLElement>('.definition-tooltip-trigger').forEach(trigger => {
        if (trigger.dataset.tooltipReady === 'true') {
            return;
        }
        trigger.dataset.tooltipReady = 'true';

        const definitionId = trigger.dataset.definitionId;
        if (!definitionId || !definitions[definitionId]) {
            return;
        }

        let tooltip: HTMLElement | null = null;
        let showTimeout: number | null = null;
        let hideTimeout: number | null = null;
        let hideTransitionTimeout: number | null = null;

        const showTooltip = async (event: Event) => {
            if (!tooltip) {
                try {
                    tooltip = await createTooltip(template, definitions[definitionId], types);
                    document.body.appendChild(tooltip);
                } catch {
                    return;
                }
            }

            if (hideTransitionTimeout) {
                window.clearTimeout(hideTransitionTimeout);
                hideTransitionTimeout = null;
            }

            tooltip.classList.remove('hide');
            tooltip.classList.add('show');
            tooltip.style.zIndex = String(zIndex++);
            resolveTooltipPosition(trigger, tooltip, event);
        };

        const hideTooltip = () => {
            if (!tooltip) {
                return;
            }
            tooltip.classList.remove('show');
            if (hideTransitionTimeout) {
                window.clearTimeout(hideTransitionTimeout);
            }
            hideTransitionTimeout = window.setTimeout(() => {
                if (tooltip && !tooltip.classList.contains('show')) {
                    tooltip.classList.add('hide');
                }
            }, tooltipHideTransitionMs);
        };

        const scheduleShow = (event: Event) => {
            if (hideTimeout) {
                window.clearTimeout(hideTimeout);
                hideTimeout = null;
            }
            if (showTimeout) {
                window.clearTimeout(showTimeout);
            }
            showTimeout = window.setTimeout(() => {
                void showTooltip(event);
            }, 500);
        };

        const scheduleHide = () => {
            if (showTimeout) {
                window.clearTimeout(showTimeout);
                showTimeout = null;
            }
            if (hideTimeout) {
                window.clearTimeout(hideTimeout);
            }
            hideTimeout = window.setTimeout(hideTooltip, 250);
        };

        trigger.addEventListener('mouseenter', scheduleShow);
        trigger.addEventListener('focus', scheduleShow);
        trigger.addEventListener('mouseleave', scheduleHide);
        trigger.addEventListener('blur', scheduleHide);
    });
}

function refreshDefinitionTooltips(root: ParentNode = document): void {
    if (definitionData) {
        setupDefinitionTooltips(definitionData.definitions, definitionData.types, root);
        return;
    }
    if (!pendingTooltipRoots.includes(root)) {
        pendingTooltipRoots.push(root);
    }
}

async function initDefinitionTooltips(): Promise<void> {
    const lang = getLang();
    try {
        const { definitions, types } = await loadDefinitionData(lang);
        definitionData = { definitions, types };
        pendingTooltipRoots.forEach(root => setupDefinitionTooltips(definitions, types, root));
        pendingTooltipRoots.length = 0;
    } catch {
        // Ignore tooltip setup failures.
    }
}

setupThemeSwitches();
updateCurrentYear();
window.refreshDefinitionTooltips = refreshDefinitionTooltips;
refreshDefinitionTooltips(document);
void initDefinitionTooltips();
