import * as util from './util.js';
import * as dom from './dom.js';

const defTooltipLeft = 20 * .75; // .75em;
const defTooltipTriggerMarginTop = 20 * .25; // .25em;

const hideTransitionDuration = 1000 / 3;
const showDelay = 500
const hideDelay = 250

const ShowState = {
    Hover: 'Hover',
    Hidden: 'Hidden',
    Focus: 'Focused',
};

const definitions = await util.getDataJson(`${document.documentElement.lang}/definitions`);

class Definition {
    static shownTooltipsCount = 0;

    #timeout;
    #id;
    #height;

    constructor(id) {
        this.#id = id;
    }

    scheduleShowTooltip(toShowState, event) {
        // Set a timeout to show the tooltip after 500ms
        this.#timeout = setTimeout(async () => {
            if (this.#showState !== ShowState.Hidden) {
                return;
            }
            this.#tooltip ??= await dom.createDefinitionTooltip(this.#id, definitions[this.#id]);

            // Position the tooltip
            const targetRect = event.target.getBoundingClientRect();
            this.#tooltip.css({
                left: Math.max(0, document.documentElement.scrollLeft + (event.pageX ? (event.pageX - defTooltipLeft) : (targetRect.x + defTooltipLeft))) + 'px',
                top: Math.max(0, document.documentElement.scrollTop + targetRect.y - this.#height - defTooltipTriggerMarginTop) + 'px',
                zIndex: Definition.shownTooltipsCount + 1
            });

            this.#showState = toShowState;
            ++Definition.shownTooltipsCount;
        }, showDelay);
    }

    scheduleHideTooltip(fromShowState) {
        // Set a timeout to hide the tooltip after 250ms
        this.#timeout = setTimeout(() => {
            // Remove the tooltip from the DOM
            if (this.#showState === fromShowState) {
                this.#showState = ShowState.Hidden;
                --Definition.shownTooltipsCount;
            }
        }, hideDelay);
    }

    clearTimeout() {
        clearTimeout(this.#timeout);
    }

    #$showState = ShowState.Hidden;
    get #showState() {
        return this.#$showState;
    }
    set #showState(value) {
        this.#$showState = value;
        this.#tooltip.toggleClass('show', value !== ShowState.Hidden);

        (value === ShowState.Hidden)
            ? setTimeout(() => this.#tooltip.addClass('hide'), hideTransitionDuration)
            : this.#tooltip.removeClass('hide');

    }

    #$tooltip;

    get #tooltip() {
        return this.#$tooltip;
    }

    set #tooltip(element) {
        this.#$tooltip = element;

        // Add the tooltip to the DOM
        element.data('definition', this);
        setup(element);
        $('body').append(element);
        // fixes a bug where outerHeight would sometimes return something different on the second call
        this.#height = element.outerHeight();
    }
}

export function setup(element) {
    // Definition tooltips
    const triggers = $('.definition-tooltip-trigger', element);
    triggers.each(function () {
        const id = this.dataset.definitionId;
        $(this).data('definition', new Definition(id, definitions[id]))
    })
    triggers.on({
        'mouseover': e => onDefinitionTriggerEnter(ShowState.Hover, e),
        'mouseout': e => onDefinitionTriggerLeave(ShowState.Hover, e),
        'focusin': e => onDefinitionTriggerEnter(ShowState.Focus, e),
        'focusout': e => onDefinitionTriggerLeave(ShowState.Focus, e),
    });
}


function onDefinitionTriggerEnter(toShowState, event) {
    const def = getDef(event);
    def.clearTimeout();
    def.scheduleShowTooltip(toShowState, event);
}

function onDefinitionTriggerLeave(fromShowState, event) {
    const def = getDef(event);
    def.clearTimeout();
    def.scheduleHideTooltip(fromShowState);
}

function onDefinitionTooltipEnter(event) {
    const def = getDef(event);
    def.clearTimeout();
}

function onDefinitionTooltipLeave(fromShowState, event) {
    const def = getDef(event);
    def.scheduleHideTooltip(fromShowState);
};

function getDef(event) {
    return $(event.currentTarget).data('definition');
}
