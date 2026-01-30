import type { Item } from '../content/config';
import { at, getAnchors } from '../lib/content';
import { throwf } from '../lib/util';
import Graphic from './Graphic';

interface LinkItem {
    label: string;
    anchor: string;
    href: string;
}

interface Props {
    links: LinkItem[];
    variant?: 'card' | 'page';
}

const anchors = await getAnchors();

export default ({ links, variant = 'card' }: Props) => {
    const listClass = variant === 'page' ? 'lvl list-link' : 'list-link';
    const includeLabel = variant === 'page';
    return (
        <ul class={listClass}>
            {links.map(link => {
                const anchor = at(anchors, link.anchor) ?? throwf(`Anchor not found: ${link.anchor}`);
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
