import type { ComponentChildren } from 'preact';
import type { Badge, BadgeKey } from '../catalog/badges';
import Graphic from './Graphic';
import badges from '../catalog/badges';

export interface Props {
    of: Badge | BadgeKey;
    children: ComponentChildren;
}

export default ({ of, children }: Props) => {
    const b = typeof of === 'string' ? badges[of] : of;
    return (
        <span className="iconed-text">
            <Graphic of={b.graphic} />
            {children}
        </span>
    );
};
