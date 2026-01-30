import type { LocalizedItem } from '../content.config';
import type { Locale } from '../i18n/site';
import type * as content from '../lib/content';
import ProjectCard from './ProjectCard';

interface Props {
    class?: string;
    entries: content.Entry<LocalizedItem<'project'>>[];
    locale: Locale;
}

export default ({ entries, locale, class: className = '' }: Props) => (
    <ul class={`lvl list-project ${className}`}>
        {entries.map(project => (
            <ProjectCard entry={project} locale={locale} />
        ))}
    </ul>
);
