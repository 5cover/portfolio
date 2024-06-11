/* Base script */

// Theme switch behavior

const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

toggleSwitch.checked = document.documentElement.getAttribute('data-theme') === 'dark';

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);


jQuery(document).ready(function ($) {
    function showTooltip() {
        $(this).siblings('.definition-tooltip').addClass('definition-tooltip-visible');
    }
    function hideTooltip() {
        $(this).siblings('.definition-tooltip').removeClass('definition-tooltip-visible');
    }

    $(document).ready(function () {
        $('.definition-tooltip-trigger').on('mouseenter focusin', showTooltip);
        $('.definition-tooltip-trigger').on('mouseleave focusout', hideTooltip);
    });
});
