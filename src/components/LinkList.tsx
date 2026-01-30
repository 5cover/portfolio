import Graphic from './Graphic';
import * as content from '../lib/content';

interface LinkItem {
    label: string;
    anchor: string;
    href: string;
}

interface Props {
    links: LinkItem[];
    variant?: 'card' | 'page';
}

export default ({ links, variant = 'card' }: Props) => {
    const listClass = variant === 'page' ? 'lvl list-link' : 'list-link';
    const includeLabel = variant === 'page';
    return (
        <ul class={listClass}>
            {links.map(link => {
                const anchor = content.anchor(link.anchor);
                return (
                    <li>
                        <a target="_blank" rel="noopener noreferrer" href={link.href} title={link.label}>
                            {anchor ? <Graphic of={anchor} alt={link.label} /> : null}
                            {includeLabel ? <span>{link.label}</span> : null}
                        </a>
                    </li>
                );
            })}
        </ul>
    );
};
