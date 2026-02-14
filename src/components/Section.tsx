import { type ComponentChildren } from 'preact';
import { useContext } from 'preact/hooks';
import * as ctx from './context';
import { cls } from '../lib/util';

interface Props {
    children?: ComponentChildren;
    class?: string;
    as: 'section' | 'main' | 'header' | 'footer';
}

export default ({ as: Tag = 'section', children, class: className }: Props) => {
    const parentDepth = useContext(ctx.outlineDepth);
    const depth = parentDepth + 1;

    return (
        <ctx.outlineDepth.Provider value={depth}>
            <Tag class={cls(className, 'section')}>{children}</Tag>
        </ctx.outlineDepth.Provider>
    );
};
