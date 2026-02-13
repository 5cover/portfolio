import type { ComponentChildren } from 'preact';
import type { Badge, BadgeKey } from '../catalog/badge';
import Graphic from './Graphic';
import { badges } from '../catalog/badge';
import type { Locale } from '../i18n';

export interface Props {
    of: Badge | BadgeKey;
    children: ComponentChildren;
    lang?: Locale;
}

export default ({ of, children, lang }: Props) => {
    const b = typeof of === 'string' ? badges[of] : of;
    return (
        <span className="iconed-text" lang={lang}>
            <Graphic of={b.graphic} />
            {children}
        </span>
    );
};
