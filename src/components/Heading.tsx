import { createElement, type ComponentChildren } from 'preact';
import * as ctx from './context';
import { useContext } from 'preact/hooks';

interface Props {
    children?: ComponentChildren;
}

export default ({ children }: Props) => {
    const depth = useContext(ctx.OutlineDepth);
    return depth <= 6 ? (
        createElement(`h${depth}`, null, children)
    ) : (
        <div role="heading" aria-level={depth}>
            {children}
        </div>
    );
};
