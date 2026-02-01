import type { Graphic } from '../content.config';
export const BadgeKeys = ['but-informatique'] as const;
export type BadgeKey = (typeof BadgeKeys)[number];

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
