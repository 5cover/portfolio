function setupPianoTiles(): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return;
  }

  const tiles = Array.from(document.querySelectorAll<HTMLElement>('.list-piano-tiles li'));
  if (tiles.length === 0) {
    return;
  }

  tiles.forEach((tile, index) => {
    window.setTimeout(() => {
      tile.classList.add('hover');
    }, 150 * index);
  });

  window.setTimeout(() => {
    tiles.forEach((tile) => tile.classList.remove('hover'));
  }, 150 * tiles.length + 800);
}

setupPianoTiles();
