import { type ComponentChildren } from 'preact';
import { useContext } from 'preact/hooks';
import * as ctx from './context';

interface Props {
    children?: ComponentChildren;
    class?: string;
}

export default ({ children, class: className }: Props) => {
    const parentDepth = useContext(ctx.OutlineDepth);
    const depth = parentDepth + 1;

    return (
        <ctx.OutlineDepth.Provider value={depth}>
            <section class={className}>
                {children}
            </section>
        </ctx.OutlineDepth.Provider>
    );
};
