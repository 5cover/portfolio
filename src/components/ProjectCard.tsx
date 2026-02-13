import Graphic from './Graphic';
import LinkList from './LinkList';
import { detailHref, pageHref } from '../lib/links';
import { normalizeLocale, translation } from '../i18n';
import type { Entry, LocalizedItem } from '../lib/content';
import { formatDate } from '../lib/util';
import { c, copy } from '../lib/copy';
import { astro } from './context';
import Section from './Section';
import { tag } from '../catalog/tag';

interface Props {
    entry: Entry<LocalizedItem<'project'>>;
}

export default ({ entry }: Props) => {
    const locale = normalizeLocale(astro().currentLocale);
    const [id, project] = entry;
    const _ = translation(locale);
    const logoTitle = _.logoTitle(project.title.toString());
    const startLabel = project.startDate ? formatDate(project.startDate, locale) : null;
    const endLabel = project.endDate ? formatDate(project.endDate, locale) : null;
    const context = project.context ? copy(project.context).capitalize() : null;
    const backgroundStyle = project.background ? `--bg-img-card: url(${project.background})` : undefined;
    return (
        <li style={backgroundStyle}>
            <ul class="list-rect">
                {project.tags.map(tagId => (
                    <li>
                        <a href={`${pageHref(locale, 'projects')}?tag=${tagId}`}>{c(tag(locale, tagId).title)}</a>
                    </li>
                ))}
            </ul>
            {project.logo ? <Graphic of={project.logo} alt={logoTitle} title={logoTitle} class="logo" /> : null}
            <Section>
                <a class="foil" href={detailHref(locale, 'projects', id)}>
                    {project.title.preact()}
                </a>
            </Section>
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
