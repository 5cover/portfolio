"use strict";

$(document).ready(async $ => {
    // Theme switches

    const themeIdPrefix = 'theme-switch-';

    const themes = new Set(['dark', 'system', 'light']);

    const theme = (() => {
        const t = document.documentElement.getAttribute('data-theme');
        return t && themes.has(t) ? t : 'system';
    })();

    $('#' + themeIdPrefix + theme).prop('checked', true);

    $('.theme-switches input[type="radio"]').on('change', e => {
        const theme = e.target.id.substring(themeIdPrefix.length);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Definition tooltips

    const [types, definitions] = await Promise.all([
        getDataJson(`${document.documentElement.lang}/types`),
        getDataJson(`${document.documentElement.lang}/definitions`),
    ]);

    $('.definition-tooltip-trigger').on({
        'mouseover focusin': onDefinitionTooltipTriggerEnter,
        'mouseout focusout': onDefinitionTooltipTriggerLeave,
    });

    const defTooltipLeft = 20 * .75; // .75em;
    const defTooltipTriggerMarginTop = 20 * .25; // .25em;

    let tooltipTimeouts = new Map();
    let tooltips = new Map();

    async function onDefinitionTooltipTriggerEnter(event) {
        const defId = getDefId(event);
        clearTimeout(tooltipTimeouts.get(defId));
        await showTooltip(event, defId);
    }

    function onDefinitionTooltipTriggerLeave(event) {
        const defId = getDefId(event);
        clearTimeout(tooltipTimeouts.get(defId));
        hideTooltip(defId);
    }

    function onDefinitionTooltipEnter(event) {
        const defId = getDefId(event);
        clearTimeout(tooltipTimeouts.get(defId));
    }

    function onDefinitionTooltipLeave(event) {
        const defId = getDefId(event);
        hideTooltip(defId);

    };

    async function showTooltip(event, defId) {
        const tooltip = await createDefinitionTooltip(defId, definitions[defId], types, onDefinitionTooltipEnter, onDefinitionTooltipLeave);
        tooltips.set(defId, tooltip);

        // Set a timeout to show the tooltip after 500ms
        tooltipTimeouts.set(defId, setTimeout(() => {
            // Add the tooltip to the DOM
            $('body').append(tooltip);

            // Position the tooltip
            const targetRect = event.target.getBoundingClientRect();
            tooltip.css({
                left: Math.max(0, event.pageX ? (event.pageX - defTooltipLeft) : (targetRect.x + defTooltipLeft)) + 'px',
                top: Math.max(0, targetRect.y - tooltip.outerHeight() - defTooltipTriggerMarginTop) + 'px',
            });
        }, 500));
    }

    function hideTooltip(defId) {
        // Set a timeout to hide the tooltip after 250ms
        tooltipTimeouts.set(defId, setTimeout(() => {
            // Remove the tooltip from the DOM
            if (tooltips.has(defId)) {
                tooltips.get(defId).remove();
                tooltips.delete(defId);
            }
        }, 250));
    }

    function getDefId(event) {
        return event.currentTarget.dataset.definitionId;
    }
});

/** @type {HTMLTemplateElement} */
const definitionTooltipTemplate = document.getElementById('template-definition-tooltip');

async function createDefinitionTooltip(defId, def, types, onEnter, onLeave) {
    // Clone the tooltip template
    const tooltip = $(single(definitionTooltipTemplate.content.children).cloneNode(true));
    tooltip.attr('data-definition-id', defId);

    if (def['background'] !== undefined) {
        tooltip.css('--bg-img-definition', `url(${def['background']})`);
    }

    $('.title a', tooltip)
        .attr('href', def.wiki)
        .html(def.names[0]);

    if (def.logo) {
        $('.title', tooltip).after(await getGraphicElement(def.logo, def.names[0] /* todo: format title*/, ['logo']));
    }

    $('.type small', tooltip).html(ucfirst(types[def.type]));
    $('.synopsis', tooltip).html(def.synopsis);

    tooltip.on({
        'mouseenter focusin': onEnter,
        'mouseleave focusout': onLeave,
    });

    return tooltip;
}

async function getDataJson(name) {
    try {
        return await (await fetch(`/portfolio/data/${name}.json`)).json();
    } catch (err) {
        throw err;
    }
}

function map(value, transform, fallback) {
    return value ? transform(value) : fallback;
}

/**
 * @param {{isThemedSvg: boolean, url: string}} graphic
 * @param {string|undefined} title
 * @param {Array<string>|undefined} classList
 * @returns { Promise<Element> }
 */
async function getGraphicElement(graphic, title = undefined, classList = undefined) {
    let element;
    if (graphic.isThemedSvg) {
        const content = await fetch(graphic.url).then(r => r.text());
        element = single(parseHtml(content).children);
        if (title !== undefined) element.setAttribute('title', title);
    } else {
        element = document.createElement('img');
        element.src = graphic.url;
        if (title !== undefined) element.alt = element.title = title;
        element.loading = 'lazy';
    }
    if (classList !== undefined) element.classList.add(...classList);
    return element;
}

/**
 * @param {string} str 
 * @returns {string}
 */
function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * @param {String} html arbitrary HTML.
 * @param {Boolean} trim flag representing whether or not to trim input whitespace, defaults to true.
 * @return {DocumentFragment}
 */
function parseHtml(html, trim = true) {
    // Process the HTML string.
    html = trim ? html.trim() : html;

    // Then set up a new template element.
    const e = document.createElement('template');
    e.innerHTML = html;
    return e.content;
}
/**
 * @template T
 * @param {ArrayLike<T>} iter 
 * @return {T}
 */
function single(iter) {
    if (iter.length === 1) {
        return iter[0];
    }
    throw `expected 1 item, got ${iter.length}`;
}
