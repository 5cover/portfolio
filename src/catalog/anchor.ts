import type { Graphic } from '../content.config';

export const anchorKeys = [
    'ccm',
    'email',
    'github',
    'instagram',
    'linkedin',
    'nuget',
    'steam',
    'website',
    'wikipedia',
    'youtube',
] as const;
export type AnchorKey = (typeof anchorKeys)[number];

export const anchors = {
    ccm: { src: '/portfolio/img/social/ccm.png' },
    email: { src: '/portfolio/img/social/email.svg', kind: 'svg' },
    github: { src: '/portfolio/img/social/github.svg', kind: 'svg' },
    instagram: { src: '/portfolio/img/social/instagram.svg', kind: 'svg' },
    linkedin: { src: '/portfolio/img/social/linkedin.svg', kind: 'svg' },
    nuget: { src: '/portfolio/img/def/nuget/logo.svg' },
    steam: { src: '/portfolio/img/social/steam.svg' },
    website: { src: '/portfolio/img/social/website.svg', kind: 'svg' },
    wikipedia: { src: '/portfolio/img/social/wikipedia.svg' },
    youtube: { src: '/portfolio/img/social/youtube.svg' },
} as const satisfies Record<AnchorKey, Graphic>;
