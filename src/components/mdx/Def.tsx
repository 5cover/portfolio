import * as content from '../../lib/content';
import { cls } from '../../lib/util';
import { astro } from '../context';

interface Props {
    id: string;
    class?: string;
}

export default ({ id, class: className }: Props) => {
    const def = content.def(astro().currentLocale, id);
    const label = def.name.abbr ?? def.name.short ?? def.name.full ?? id;
    return (
        <a
            href={def.wiki}
            class={cls('link', 'def-tooltip-trigger', className)}
            data-def-id={id}
            target="_blank"
            rel="noopener noreferrer">
            <slot>{label}</slot>
        </a>
    );
};
