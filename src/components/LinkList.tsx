import Graphic from './Graphic';
import { anchors } from '../catalog/anchor';
import type { Link } from '../content.config';
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
                return (
                    <li>
                        <a target="_blank" rel="noopener noreferrer" href={link.href} title={link.label.toString()}>
                            <Graphic of={anchors[link.anchor]} alt={link.label.toString()} />
                            {includeLabel ? <span>{link.label.preact()}</span> : null}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};
