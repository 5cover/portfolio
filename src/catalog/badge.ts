import type { Graphic } from '../content.config';
export const badgeKeys = ['but-informatique'] as const;
export type BadgeKey = (typeof badgeKeys)[number];

export interface Badge {
    graphic: Graphic;
}

export default {
    'but-informatique': {
        graphic: {
            src: '/portfolio/img/but.webp',
        },
    },
} as const satisfies Record<BadgeKey, Badge>;
