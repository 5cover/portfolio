import React, { createContext, useContext } from 'react';

const OutlineDepthContext = createContext<number>(0);

type Props = {
    /** HTML fragment for the section heading */
    heading: React.ReactNode;
    children?: React.ReactNode;
};

export function Section({ heading, children }: Props) {
    const parentDepth = useContext(OutlineDepthContext);
    const depth = parentDepth + 1;

    const headingEl =
        depth <= 6 ? (
            React.createElement(`h${depth}`, null, heading)
        ) : (
            <div role="heading" aria-level={depth}>
                {heading}
            </div>
        );

    return (
        <OutlineDepthContext.Provider value={depth}>
            <section>
                {headingEl}
                {children}
            </section>
        </OutlineDepthContext.Provider>
    );
}
