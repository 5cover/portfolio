import type { Locale } from '../i18n';
import type { Entry, LocalizedItem } from '../lib/content';
import ProjectCard from './ProjectCard';

interface Props {
    class?: string;
    entries: readonly Entry<LocalizedItem<'project'>>[];
}

export default ({ entries, class: className = '' }: Props) => (
    <ul class={`lvl list-project ${className}`}>
        {entries.map(project => (
            <ProjectCard entry={project} />
        ))}
    </ul>
);
