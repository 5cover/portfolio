import * as util from './util.js';

/** @type {HTMLTemplateElement} */
const definitionTooltipTemplate = document.getElementById('template-definition-tooltip');

const types = await util.getDataJson(`${document.documentElement.lang}/types`);

export async function createDefinitionTooltip(defId, def, onEnter, onLeave) {
    // Clone the tooltip template
    const tooltip = $(util.single(definitionTooltipTemplate.content.children).cloneNode(true));
    tooltip.attr('data-definition-id', defId);

    if (def['background'] !== undefined) {
        tooltip.css('--bg-img-card ', `url(${def['background']})`);
    }

    $('.title a', tooltip)
        .attr('href', def.wiki)
        .html(def.name['full']);

    if (def.logo) {
        $('.title', tooltip).after(await getGraphicElement(def.logo, def.name['full'] /* todo: format title */, ['logo']));
    }

    $('.type small', tooltip).html(util.ucfirst(types[def.type]));
    $('.synopsis', tooltip).html(def.synopsis);

    tooltip.on({
        'mouseenter focusin': onEnter,
        'mouseleave focusout': onLeave,
    });

    return tooltip;
}


export function createLi(contents) {
    const li = document.createElement('li');
    li.append(contents);
    return li;
}

/**
 * @param {String} html arbitrary HTML.
 * @param {Boolean} trim flag representing whether or not to trim input whitespace, defaults to true.
 * @return {DocumentFragment}
 */
export function parseHtml(html, trim = true) {
    // Process the HTML string.
    html = trim ? html.trim() : html;

    // Then set up a new template element.
    const e = document.createElement('template');
    e.innerHTML = html;
    return e.content;
}

/**
 * @param {{isThemedSvg: boolean, url: string}} graphic
 * @param {string|undefined} title
 * @param {Array<string>|undefined} classList
 * @returns { Promise<Element> }
 */
export async function getGraphicElement(graphic, title = undefined, classList = undefined) {
    let element;
    if (graphic.isThemedSvg) {
        const content = await fetch(graphic.url).then(r => r.text());
        element = util.single(parseHtml(content).children);
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
