import { type ComponentChildren } from 'preact';
import { useContext } from 'preact/hooks';
import * as ctx from './context';

interface Props {
    children?: ComponentChildren;
    class?: string;
}

export default ({ children, class: className }: Props) => {
    const parentDepth = useContext(ctx.outlineDepth);
    const depth = parentDepth + 1;

    return (
        <ctx.outlineDepth.Provider value={depth}>
            <section class={className}>{children}</section>
        </ctx.outlineDepth.Provider>
    );
};
