import type { LocalizedItem } from '../content.config';

type DefIndex = Record<string, LocalizedItem<'def'>>;
type DefTypeIndex = Record<string, LocalizedItem<'def-type'>>;

const tooltipLeftOffset = 20 * 0.75;
const tooltipTriggerMarginTop = 20 * 0.25;
const tooltipHideTransitionMs = 1000 / 3;
const pendingTooltipRoots: ParentNode[] = [];
let defData: { defs: DefIndex; types: DefTypeIndex } | null = null;

function getDataBase(): string {
    return (document.documentElement.dataset.dataBase || '/data').replace(/\/$/, '');
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

async function loadDefData(dataBase: string) {
    const [rawDefs, rawTypes] = await Promise.all([
        fetchJson(`${dataBase}/def.json`),
        fetchJson(`${dataBase}/def-type.json`),
    ]);

    return {
        defs: rawDefs as DefIndex,
        types: rawTypes as DefTypeIndex,
    };
}

async function createTooltip(
    template: HTMLTemplateElement,
    def: LocalizedItem<'def'>,
    types: DefTypeIndex
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
        titleLink.textContent = def.name.full;
        titleLink.href = def.wiki;
    }

    if (typeEl) {
        const typeName = types[def.type]?.title ?? def.type;
        typeEl.textContent = typeName.charAt(0).toUpperCase() + typeName.slice(1);
    }

    if (synopsisEl) {
        synopsisEl.innerHTML = def.synopsis;
    }

    if (def.background) {
        tooltip.style.setProperty('--bg-img-card', `url(${def.background})`);
    }

    if (def.logo) {
        const logoTitle = def.name.full;
        let logoElement: Element;

        if (def.logo.kind === 'svg') {
            const response = await fetch(def.logo.src);
            if (!response.ok) {
                throw new Error(`Failed to load ${def.logo.src}`);
            }
            const svgMarkup = await response.text();
            const templateEl = document.createElement('template');
            templateEl.innerHTML = svgMarkup.trim();
            const svg = templateEl.content.firstElementChild;
            if (!(svg instanceof SVGElement)) {
                throw new Error(`Unexpected SVG content for ${def.logo.src}`);
            }
            svg.setAttribute('title', logoTitle);
            svg.classList.add('logo');
            logoElement = svg;
        } else {
            const logo = document.createElement('img');
            logo.src = def.logo.src;
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

function setupDefTooltips(defs: DefIndex, types: DefTypeIndex, root: ParentNode = document): void {
    const template = document.querySelector<HTMLTemplateElement>('#template-def-tooltip');
    if (!template) {
        return;
    }

    let zIndex = 10;

    root.querySelectorAll<HTMLElement>('.def-tooltip-trigger').forEach(trigger => {
        if (trigger.dataset.tooltipReady === 'true') {
            return;
        }
        trigger.dataset.tooltipReady = 'true';

        const defId = trigger.dataset.defId;
        if (!defId || !defs[defId]) {
            return;
        }

        let tooltip: HTMLElement | null = null;
        let showTimeout: number | null = null;
        let hideTimeout: number | null = null;
        let hideTransitionTimeout: number | null = null;

        const showTooltip = async (event: Event) => {
            if (!tooltip) {
                try {
                    tooltip = await createTooltip(template, defs[defId], types);
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

function refreshDefTooltips(root: ParentNode = document): void {
    if (defData) {
        setupDefTooltips(defData.defs, defData.types, root);
        return;
    }
    if (!pendingTooltipRoots.includes(root)) {
        pendingTooltipRoots.push(root);
    }
}

async function initDefTooltips(): Promise<void> {
    const dataBase = getDataBase();
    try {
        const { defs, types } = await loadDefData(dataBase);
        defData = { defs, types };
        pendingTooltipRoots.forEach(root => setupDefTooltips(defs, types, root));
        pendingTooltipRoots.length = 0;
    } catch {
        // Ignore tooltip setup failures.
    }
}

setupThemeSwitches();
updateCurrentYear();
window.refreshDefTooltips = refreshDefTooltips;
refreshDefTooltips(document);
void initDefTooltips();
