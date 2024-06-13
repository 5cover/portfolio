/* Base script */

// Theme switch behavior
const themeIdPrefix = 'theme-switch-';

const themes = new Set(['dark', 'system', 'light']);

const theme = (() => {
    var t = document.documentElement.getAttribute('data-theme');
    return t && themes.has(t) ? t : 'system';
})();

document.querySelector('#' + themeIdPrefix + theme).checked = true;

switches = document.querySelectorAll('.theme-switches input[type="radio"]');
for (let i = 0; i < switches.length; i++) {
    switches[i].addEventListener('change', _ => {
        var theme = switches[i].id.substring(themeIdPrefix.length);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
}

jQuery(document).ready(($) => {
    function showTooltip() {
        $(this).siblings('.definition-tooltip').addClass('definition-tooltip-visible');
    }
    function hideTooltip() {
        $(this).siblings('.definition-tooltip').removeClass('definition-tooltip-visible');
    }

    $(document).ready(() => {
        $('.definition-tooltip-trigger').on('mouseenter focusin', showTooltip);
        $('.definition-tooltip-trigger').on('mouseleave focusout', hideTooltip);
    });
});
