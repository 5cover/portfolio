$(document).ready(() => {
    const duration = 200;
    const wait = 100;
    let i = 0;

    const tiles = document.querySelectorAll('.list-piano-tiles > li');

    tiles.forEach(tile => {
        setTimeout(() => tile.classList.add('hover'), i * wait);
        setTimeout(() => tile.classList.remove('hover'), i * wait + duration);
        i++;
    });

    setTimeout(() => {
        for (const t of tiles) t.classList.add('hover');
    }, (tiles.length - 1) * wait + 1000);

    setTimeout(() => {
        for (const t of tiles) t.classList.remove('hover');
    }, (tiles.length - 1) * wait + 1000 + duration);
});