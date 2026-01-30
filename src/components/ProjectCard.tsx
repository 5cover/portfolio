import Graphic from './Graphic';
import LinkList from './LinkList';
import { detailHref, pageHref } from '../lib/links';
import { formatDate } from '../lib/date';
import { getLabels, type Locale } from '../i18n/site';
import type { LocalizedItem } from '../content.config';
import * as content from '../lib/content';
import { capitalize } from '../lib/util';

function formatTitle(fmt: string, title: string): string {
    return fmt.replace('%s', title);
}

interface Props {
    entry: content.Entry<LocalizedItem<'project'>>;
    headingLevel?: number;
    locale: Locale;
}

export default ({ locale, entry, headingLevel = 3 }: Props) => {
    const [id, project] = entry;
    const { copy } = getLabels(locale);
    const logoTitle = formatTitle(copy.fmtTitle, project.title);
    const startLabel = project.startDate ? formatDate(project.startDate, locale) : '';
    const endLabel = project.endDate ? formatDate(project.endDate, locale) : '';
    const context = project.context ? capitalize(project.context) : '';
    const backgroundStyle = project.background ? `--bg-img-card: url(${project.background})` : undefined;
    return (
        <li style={backgroundStyle}>
            <ul class="list-rect">
                {project.tags.map(tagId => (
                    <li>
                        <a href={`${pageHref(locale, 'projects')}?tag=${tagId}`}>{content.tag(locale, tagId).title}</a>
                    </li>
                ))}
            </ul>
            {project.logo ? <Graphic of={project.logo} alt={logoTitle} title={logoTitle} class="logo" /> : null}
            {headingLevel === 1 ? (
                <h1>
                    <a class="foil" href={detailHref(locale, 'projects', id)}>
                        {project.title}
                    </a>
                </h1>
            ) : headingLevel === 2 ? (
                <h2>
                    <a class="foil" href={detailHref(locale, 'projects', id)}>
                        {project.title}
                    </a>
                </h2>
            ) : headingLevel === 4 ? (
                <h4>
                    <a class="foil" href={detailHref(locale, 'projects', id)}>
                        {project.title}
                    </a>
                </h4>
            ) : headingLevel === 5 ? (
                <h5>
                    <a class="foil" href={detailHref(locale, 'projects', id)}>
                        {project.title}
                    </a>
                </h5>
            ) : headingLevel === 6 ? (
                <h6>
                    <a class="foil" href={detailHref(locale, 'projects', id)}>
                        {project.title}
                    </a>
                </h6>
            ) : (
                <h3>
                    <a class="foil" href={detailHref(locale, 'projects', id)}>
                        {project.title}
                    </a>
                </h3>
            )}
            {project.startDate ? (
                <small class="status">
                    <time datetime={project.startDate}>{startLabel}</time> &ndash;{' '}
                    {project.endDate ? <time datetime={project.endDate}>{endLabel}</time> : copy.ongoing}
                </small>
            ) : null}
            {context ? <small class="context">{context}</small> : null}
            <p class="abstract">{project.abstract}</p>
            {project.links.length > 0 ? <LinkList links={project.links} /> : null}
        </li>
    );
};
