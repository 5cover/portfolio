import { requireElementById } from "./util";

const root = requireElementById('but-years');

const tabs = Array.from(root.querySelectorAll('[role="tab"]')) as HTMLElement[];
const panels = Array.from(root.querySelectorAll('[role="tabpanel"]')) as HTMLElement[];
const activateTab = (tab: HTMLElement) => {
    tabs.forEach(item => {
        const isActive = item === tab;
        item.setAttribute('aria-selected', String(isActive));
        item.tabIndex = isActive ? 0 : -1;
    });
    panels.forEach(panel => {
        panel.style.display = panel.getAttribute('aria-labelledby') !== tab.id ? 'none' : '';
    });
};
tabs.forEach(tab => {
    tab.addEventListener('click', () => activateTab(tab));
});
root.addEventListener('keydown', event => {
    const e = event as KeyboardEvent;
    if (!(e.target instanceof HTMLElement)) {
        return;
    }
    if (e.target.getAttribute('role') !== 'tab') {
        return;
    }
    const currentIndex = tabs.indexOf(e.target);
    if (currentIndex < 0) {
        return;
    }
    let nextIndex = currentIndex;
    if (e.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
        nextIndex = 0;
    } else if (e.key === 'End') {
        nextIndex = tabs.length - 1;
    } else {
        return;
    }
    e.preventDefault();
    const nextTab = tabs[nextIndex];
    if (nextTab) {
        nextTab.focus();
        activateTab(nextTab);
    }
});
