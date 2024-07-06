import * as util from './util.js';
import * as dom from './dom.js';

const defTooltipLeft = 20 * .75; // .75em;
const defTooltipTriggerMarginTop = 20 * .25; // .25em;

const showDelay = 500;
const hideDelay = 250;

const definitions = await util.getDataJson(`${document.documentElement.lang}/definitions`);

const tooltipTimeouts = new Map();
const tooltips = new Map();

export function setupInteractivity(element) {
    // Definition tooltips
    $('.definition-tooltip-trigger', element).on({
        'mouseover focusin': onDefinitionTriggerEnter,
        'mouseout focusout': onDefinitionTriggerLeave,
    });
}

function onDefinitionTriggerEnter(event) {
    const defId = getDefId(event);
    clearTimeout(tooltipTimeouts.get(defId));
    scheduleShowTooltip(event, defId);
}

function onDefinitionTriggerLeave(event) {
    const defId = getDefId(event);
    clearTimeout(tooltipTimeouts.get(defId));
    scheduleHideTooltip(defId);
}

function onDefinitionTooltipEnter(event) {
    const defId = getDefId(event);
    clearTimeout(tooltipTimeouts.get(defId));
}

function onDefinitionTooltipLeave(event) {
    const defId = getDefId(event);
    scheduleHideTooltip(defId);

};

function scheduleShowTooltip(event, defId) {
    // Set a timeout to show the tooltip after 500ms
    tooltipTimeouts.set(defId, setTimeout(async () => {
        const tooltip = await dom.createDefinitionTooltip(defId, definitions[defId], onDefinitionTooltipEnter, onDefinitionTooltipLeave);
        if (tooltips.has(defId)) {
            return;
        }
        tooltips.set(defId, tooltip);

        // Add the tooltip to the DOM
        setupInteractivity(tooltip);
        $('body').append(tooltip);

        // Position the tooltip
        const targetRect = event.target.getBoundingClientRect();
        tooltip.css({
            left: Math.max(0, event.pageX ? (event.pageX - defTooltipLeft) : (targetRect.x + defTooltipLeft)) + 'px',
            top: Math.max(0, targetRect.y - tooltip.outerHeight() - defTooltipTriggerMarginTop) + 'px',
        });
    }, showDelay));
}

function scheduleHideTooltip(defId) {
    // Set a timeout to hide the tooltip after 250ms
    tooltipTimeouts.set(defId, setTimeout(() => {
        // Remove the tooltip from the DOM
        if (tooltips.has(defId)) {
            tooltips.get(defId).remove();
            tooltips.delete(defId);
        }
    }, hideDelay));
}

function getDefId(event) {
    return event.currentTarget.dataset.definitionId;
}
