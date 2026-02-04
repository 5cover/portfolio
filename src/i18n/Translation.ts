import type { Locale, NavItemPage } from '../i18n';
import type { ThemeLabels } from '../lib/types';

export interface Translation {
    flagClass: string;
    locales: Record<Locale, string>;
    siteDescription: string;
    footerGitHubAnchorTitle: string;
    nav: Record<NavItemPage, string>;
    theme: ThemeLabels;
    details: string;
    logoTitle: (title: string) => string;
    ongoing: string;
    links: string;
    team: string;
    story: string;
    references: string;
    technologies: string;
    gallery: string;
    refJumpUp: string;
}
