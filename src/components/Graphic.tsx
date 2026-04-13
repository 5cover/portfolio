import type { Graphic } from '../content.config';
import type { SvgComponent } from 'astro/types';

const svgModules = import.meta.glob('../../public/**/*.svg', {
    import: 'default',
}) as Record<string, SvgComponent>;

type CommonProps = {
    title?: string;
    class?: string;
    width?: number;
    height?: number;
    alt?: string;
    baseHeight?: number;
}

type Props = (CommonProps & Graphic) | (CommonProps & { of: Graphic });

export default (props: Props) => {
    const baseHeight = props.baseHeight ?? 30;
    const { title, class: className } = props;
    const { kind, src } = 'of' in props ? props.of : props;

    if (kind === 'svg') {
        const Svg = svgModules[src.replace('/portfolio', '../../public')];
        if (!Svg) {
            throw new Error(`SVG not found or not imported: ${src}`);
        }
        return (
            <Svg
                class={className}
                height={baseHeight}
                // @ts-expect-error title may not a valid SVG attribute but it is supported in HTML.
                title={title}
                role={title ? 'img' : 'presentation'}
                aria-label={title}
            />
        );
    }

    // kind === "img"
    return (
        <img
            src={src}
            alt={props.alt ?? props.title ?? ''}
            title={props.title}
            className={props.class}
            width={props.width}
            height={props.height}
            loading="lazy"
        />
    );
};
