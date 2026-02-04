import { capitalize } from '../lib/util';
import type { Translation } from './Translation';

export default {
    flagClass: 'fi-us',
    locales: {
        en: 'English',
        fr: 'Anglais',
    },
    siteDescription: 'Hello! My name is Raphaël Bardini. This is my portfolio website. Make yourself at home!',
    footerGitHubAnchorTitle: "This site's GitHub repository",
    nav: {
        projects: 'Projects',
        history: 'History',
        'history/history-but': 'BUT Computer Science',
        blog: 'Blog',
        passion: 'Hobbies',
        story: 'Histoire',
    },
    theme: {
        light: 'Light theme',
        system: 'System theme',
        dark: 'Dark theme',
    },
    details: 'Details',
    logoTitle: defTitle => `${capitalize(defTitle)} logo`,
    ongoing: 'ongoing',
    links: 'Links',
    team: 'Team',
    story: 'Story',
    references: 'References',
    technologies: 'Technologies',
    gallery: 'Gallery',
    refJumpUp: 'Jump up',
} as const satisfies Translation;
