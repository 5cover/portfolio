import Graphic from './Graphic';
import LinkList from './LinkList';
import { detailHref, pageHref } from '../lib/links';
import { normalizeLocale, translation, type Locale } from '../i18n';
import type { Entry, LocalizedItem } from '../lib/content';
import { formatDate } from '../lib/util';
import { c, copy } from '../lib/copy';
import tags, { localizeTag } from '../catalog/tag';
import { astro } from './context';

interface Props {
    entry: Entry<LocalizedItem<'project'>>;
    headingLevel?: number;
}

export default ({ entry, headingLevel = 3 }: Props) => {
    const locale = normalizeLocale(astro().currentLocale);
    const [id, project] = entry;
    const _ = translation(locale);
    const title = copy(project.title);
    const logoTitle = _.logoTitle(title.toString());
    const startLabel = project.startDate ? formatDate(project.startDate, locale) : null;
    const endLabel = project.endDate ? formatDate(project.endDate, locale) : null;
    const context = project.context ? copy(project.context).capitalize() : null;
    const backgroundStyle = project.background ? `--bg-img-card: url(${project.background})` : undefined;
    return (
        <li style={backgroundStyle}>
            <ul class="list-rect">
                {project.tags.map(tagId => (
                    <li>
                        <a href={`${pageHref(locale, 'projects')}?tag=${tagId}`}>
                            {c(localizeTag(locale)(tags[tagId]).title)}
                        </a>
                    </li>
                ))}
            </ul>
            {project.logo ? <Graphic of={project.logo} alt={logoTitle} title={logoTitle} class="logo" /> : null}
            {headingLevel === 1 ? (
                <h1>
                    <a class="foil" href={detailHref(locale, 'projects', id)}>
                        {title.preact()}
                    </a>
                </h1>
            ) : headingLevel === 2 ? (
                <h2>
                    <a class="foil" href={detailHref(locale, 'projects', id)}>
                        {title.preact()}
                    </a>
                </h2>
            ) : headingLevel === 4 ? (
                <h4>
                    <a class="foil" href={detailHref(locale, 'projects', id)}>
                        {title.preact()}
                    </a>
                </h4>
            ) : headingLevel === 5 ? (
                <h5>
                    <a class="foil" href={detailHref(locale, 'projects', id)}>
                        {title.preact()}
                    </a>
                </h5>
            ) : headingLevel === 6 ? (
                <h6>
                    <a class="foil" href={detailHref(locale, 'projects', id)}>
                        {title.preact()}
                    </a>
                </h6>
            ) : (
                <h3>
                    <a class="foil" href={detailHref(locale, 'projects', id)}>
                        {title.preact()}
                    </a>
                </h3>
            )}
            {project.startDate ? (
                <small class="status">
                    <time datetime={project.startDate.toISOString()}>{startLabel}</time> &ndash;{' '}
                    {project.endDate ? <time datetime={project.endDate.toISOString()}>{endLabel}</time> : _.ongoing}
                </small>
            ) : null}
            {context ? <small class="context">{context}</small> : null}
            <p class="abstract">{project.abstract}</p>
            {project.links.length > 0 ? <LinkList links={project.links} /> : null}
        </li>
    );
};
