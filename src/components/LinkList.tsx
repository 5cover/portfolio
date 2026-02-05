import Graphic from './Graphic';
import anchors from '../catalog/anchor';
import type { Link } from '../content.config';
import { copy } from '../lib/copy';
import type { Localize } from '../i18n';

interface Props {
    links: readonly Localize<Link>[];
    variant?: 'card' | 'page';
}

export default ({ links, variant = 'card' }: Props) => {
    const listClass = variant === 'page' ? 'lvl list-link' : 'list-link';
    const includeLabel = variant === 'page';
    return (
        <ul class={listClass}>
            {links.map(link => {
                const anchor = anchors[link.anchor];
                const label = copy(link.label);
                return (
                    <li>
                        <a target="_blank" rel="noopener noreferrer" href={link.href} title={label.toString()}>
                            <Graphic of={anchor} alt={label.toString()} />
                            {includeLabel ? <span>{label.preact()}</span> : null}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};
