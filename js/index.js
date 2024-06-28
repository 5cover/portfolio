"use strict";

/* Index script */

$(document).ready(_ => {
    const duration = 200;
    const wait = 100;
    var i = 0;

    document.querySelectorAll('.list-piano-tiles > li').forEach(tile => {
        setTimeout(() => tile.classList.add('hover'), i * wait);
        setTimeout(() => tile.classList.remove('hover'), i * wait + duration);
        i++;
    });
});