import Graphic from './Graphic';
import LinkList from './LinkList';
import { detailHref, pageHref } from '../lib/links';
import { formatDate } from '../lib/date';
import type { AnchorEntry, LocalizedProjectEntry, LocalizedTagEntry } from '../lib/content';
import { normalizeLocale } from '../i18n/site';

function capitalize(value: string): string {
    return value[0] === undefined ? value : value[0].toUpperCase() + value.slice(1);
}

function formatTitle(fmt: string, title: string): string {
    return fmt.replace('%s', title);
}

interface Props {
    langLabels: {
        ongoing: string;
        fmtTitle: string;
    };
    project: LocalizedProjectEntry;
    tagsById: Record<string, LocalizedTagEntry['data']>;
    anchorsById: Record<string, AnchorEntry['data']>;
    headingLevel?: number;
    locale?: string;
}

export default ({ locale, langLabels, project, tagsById, anchorsById, headingLevel = 3 }: Props) => {
    locale = normalizeLocale(locale);
    const projectData = project.data;
    const logoTitle = formatTitle(langLabels.fmtTitle, projectData.title);
    const startDate = projectData.startDate;
    const endDate = projectData.endDate;
    const startLabel = startDate ? formatDate(startDate, locale) : '';
    const endLabel = endDate ? formatDate(endDate, locale) : '';
    const context = projectData.context ? capitalize(projectData.context) : '';
    const backgroundStyle = projectData.background ? `--bg-img-card: url(${projectData.background})` : undefined;
    return (
        <li style={backgroundStyle}>
            <ul class="list-rect">
                {projectData.tags.map(tagId => (
                    <li>
                        <a href={`${pageHref(locale, 'projects')}?tag=${tagId}`}>{tagsById[tagId]?.title ?? tagId}</a>
                    </li>
                ))}
            </ul>
            {projectData.logo ? (
                <Graphic
                    of={projectData.logo}
                    alt={logoTitle}
                    title={logoTitle}
                    class="logo"
                />
            ) : null}
            {headingLevel === 1 ? (
                <h1>
                    <a class="foil" href={detailHref(locale, 'projects', project.id)}>
                        {projectData.title}
                    </a>
                </h1>
            ) : headingLevel === 2 ? (
                <h2>
                    <a class="foil" href={detailHref(locale, 'projects', project.id)}>
                        {projectData.title}
                    </a>
                </h2>
            ) : headingLevel === 4 ? (
                <h4>
                    <a class="foil" href={detailHref(locale, 'projects', project.id)}>
                        {projectData.title}
                    </a>
                </h4>
            ) : headingLevel === 5 ? (
                <h5>
                    <a class="foil" href={detailHref(locale, 'projects', project.id)}>
                        {projectData.title}
                    </a>
                </h5>
            ) : headingLevel === 6 ? (
                <h6>
                    <a class="foil" href={detailHref(locale, 'projects', project.id)}>
                        {projectData.title}
                    </a>
                </h6>
            ) : (
                <h3>
                    <a class="foil" href={detailHref(locale, 'projects', project.id)}>
                        {projectData.title}
                    </a>
                </h3>
            )}
            {startDate ? (
                <small class="status">
                    <time datetime={startDate}>{startLabel}</time> &ndash;{' '}
                    {endDate ? <time datetime={endDate}>{endLabel}</time> : langLabels.ongoing}
                </small>
            ) : null}
            {context ? <small class="context">{context}</small> : null}
            <p class="abstract">{projectData.abstract}</p>
            {projectData.links.length > 0 ? <LinkList links={projectData.links} anchorsById={anchorsById} /> : null}
        </li>
    );
};
