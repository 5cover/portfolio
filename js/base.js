import * as i11y from "./modules/i11y.js";

$(() => {
    i11y.setupInteractivity(document.documentElement);

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
});
