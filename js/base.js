"use strict";

// Theme switch behavior
const themeIdPrefix = 'theme-switch-';

const themes = new Set(['dark', 'system', 'light']);

const theme = (() => {
    var t = document.documentElement.getAttribute('data-theme');
    return t && themes.has(t) ? t : 'system';
})();

document.querySelector('#' + themeIdPrefix + theme).checked = true;

const switches = document.querySelectorAll('.theme-switches input[type="radio"]');
for (let i = 0; i < switches.length; i++) {
    switches[i].addEventListener('change', _ => {
        var theme = switches[i].id.substring(themeIdPrefix.length);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

// todo: do we really need jQuery for this?
// todo: this is terrible
$(document).ready(() => {
    const tooltip = 'definition-tooltip';
    const visible = 'definition-tooltip-visible';
    const trigger = 'definition-tooltip-trigger';
    const examining = 'definition-tooltip-examining';

    $(`.${trigger}`).on({
        'focusin mouseenter': function() {
            $(this).siblings(`.${tooltip}`).addClass(visible);
        },
        'focusout mouseleave': function () {
            $(this).siblings(`.${tooltip}`).removeClass(visible);
        }
    });

    $(`.${tooltip}`).on({
        'focusin mouseenter': function() {
            $(this).addClass(examining);
        },
        'focusout mouseleave': function () {
            $(this).removeClass(examining);
        }
    });
});

/**
 * @template T
 * @template TResult
 * @param {(arg: T) => TResult} transform
 * @param {TResult} fallback
 * @param {T} value
 * @returns { TResult }
 */
function map(transform, fallback, value) {
    return value ? transform(value) : fallback;
}

/**
 * @param {boolean} isThemedSvg
 * @param {string} url
 * @param {string|undefined} title
 * @param {Array<string>|undefined} classList
 * @returns { Promise<Element> }
 */
async function getIconElement(isThemedSvg, url, title = undefined, classList = undefined) {
    let element;
    if (isThemedSvg) {
        const content = await fetch(url).then(r => r.text());
        element = single(elementsFromHTML(content));
        if (title !== undefined) element.setAttribute('title', title);
    } else {
        element = document.createElement('img');
        element.src = url;
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
 * @param {String} html HTML representing a single element.
 * @param {Boolean} trim flag representing whether or not to trim input whitespace, defaults to true.
 * @return {HTMLCollection}
 */
function elementsFromHTML(html, trim = true) {
    // Process the HTML string.
    html = trim ? html.trim() : html;

    // Then set up a new template element.
    const template = document.createElement('template');
    template.innerHTML = html;
    const result = template.content.children;

    // Then return either an HTMLElement or HTMLCollection,
    // based on whether the input HTML had one or more roots.
    return result;
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