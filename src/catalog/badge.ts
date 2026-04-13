import type { Graphic } from '../content.config';

export type Badge = {
    graphic: Graphic;
}

export const badgeKeys = ['but-informatique'] as const;
export type BadgeKey = (typeof badgeKeys)[number];

export const badges = {
    'but-informatique': {
        graphic: {
            src: '/portfolio/img/but.webp',
        },
    },
} as const satisfies Record<BadgeKey, Badge>;
