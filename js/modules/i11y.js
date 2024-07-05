import * as util from './util.js';
import * as dom from './dom.js';

const definitions = await util.getDataJson(`${document.documentElement.lang}/definitions`);

const tooltipTimeouts = new Map();
const tooltips = new Map();

const defTooltipLeft = 20 * .75; // .75em;
const defTooltipTriggerMarginTop = 20 * .25; // .25em;

export function setupElementInteractivity(element) {
    // Definition tooltips
    $('.definition-tooltip-trigger', element).on({
        'mouseover focusin': onDefinitionTooltipTriggerEnter,
        'mouseout focusout': onDefinitionTooltipTriggerLeave,
    });
}

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
    const tooltip = await dom.createDefinitionTooltip(defId, definitions[defId], onDefinitionTooltipEnter, onDefinitionTooltipLeave);
    tooltips.set(defId, tooltip);

    // Set a timeout to show the tooltip after 500ms
    tooltipTimeouts.set(defId, setTimeout(() => {
        // Add the tooltip to the DOM
        setupElementInteractivity(tooltip);
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
