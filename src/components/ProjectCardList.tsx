import type { LocalizedItem } from '../content/config';
import type { Locale } from '../i18n/site';
import type { Entry } from '../lib/content';
import ProjectCard from './ProjectCard';

interface Props {
    class?: string;
    langLabels: {
        ongoing: string;
        fmtTitle: string;
    };
    entry: Entry<LocalizedItem<'projects'>>[];
    headingLevel?: number;
    locale: Locale;
}

export default ({ langLabels, entry, headingLevel = 3, locale, class: className = '' }: Props) => (
    <ul class={`lvl list-project ${className}`}>
        {entry.map(project => (
            <ProjectCard langLabels={langLabels} entry={project} locale={locale} />
        ))}
    </ul>
);
