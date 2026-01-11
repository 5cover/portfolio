function setupTimeline(): void {
  const timeline = document.querySelector<HTMLElement>('.js-timeline');
  if (!timeline) {
    return;
  }

  const line = timeline.querySelector<HTMLElement>('.js-timeline_line');
  const lineProgress = timeline.querySelector<HTMLElement>('.js-timeline_line-progress');
  const items = Array.from(timeline.querySelectorAll<HTMLElement>('.js-timeline_item'));
  if (!line || !lineProgress || items.length === 0) {
    return;
  }

  let ticking = false;

  const update = () => {
    ticking = false;

    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    const firstPoint = firstItem.querySelector<HTMLElement>('.js-timeline-card_point-box');
    const lastPoint = lastItem.querySelector<HTMLElement>('.js-timeline-card_point-box');

    if (!firstPoint || !lastPoint) {
      return;
    }

    const firstPointOffset = firstPoint.getBoundingClientRect().top - firstItem.getBoundingClientRect().top;
    const lastPointOffset =
      timeline.getBoundingClientRect().top +
      timeline.getBoundingClientRect().height -
      lastPoint.getBoundingClientRect().top;

    line.style.top = `${firstPointOffset}px`;
    line.style.bottom = `${lastPointOffset}px`;

    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const middle = scrollTop + viewportHeight / 2;

    const progressTop = lineProgress.getBoundingClientRect().top + scrollTop;
    const lastPointTop = lastPoint.getBoundingClientRect().top + scrollTop;

    let height = middle - progressTop;
    if (lastPointTop <= middle) {
      height = lastPointTop - progressTop;
    }
    lineProgress.style.height = `${Math.max(0, height)}px`;

    items.forEach((item) => {
      const point = item.querySelector<HTMLElement>('.js-timeline-card_point-box');
      if (!point) {
        return;
      }
      const pointTop = point.getBoundingClientRect().top + scrollTop;
      if (pointTop < middle) {
        item.classList.add('js-ag-active');
      } else {
        item.classList.remove('js-ag-active');
      }
    });
  };

  const requestUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', requestUpdate);
  window.addEventListener('resize', requestUpdate);
  requestUpdate();
}

setupTimeline();
