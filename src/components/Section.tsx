import { type ComponentChildren } from 'preact';
import { useContext } from 'preact/hooks';
import * as ctx from '../lib/context';
import { cls } from '../lib/util';

interface Props {
    children?: ComponentChildren;
    class?: string;
    id?: string;
    style?: string;
    as?: 'section' | 'main' | 'header' | 'footer' | 'ul' | 'article' | 'li';
}

export default ({ as: Tag = 'section', id, children, class: className, style }: Props) => {
    const parentDepth = useContext(ctx.outlineDepth);
    const depth = parentDepth + 1;

    return (
        <ctx.outlineDepth.Provider value={depth}>
            <Tag class={cls(className, 'section')} id={id} style={style}>
                {children}
            </Tag>
        </ctx.outlineDepth.Provider>
    );
};
