import ProjectCard from './ProjectCard';
import type { AnchorEntry, LocalizedProjectEntry, LocalizedTagEntry } from '../lib/content';

interface Props {
    class?: string;
    langLabels: {
        ongoing: string;
        fmtTitle: string;
    };
    projects: LocalizedProjectEntry[];
    tagsById: Record<string, LocalizedTagEntry['data']>;
    anchorsById: Record<string, AnchorEntry['data']>;
    headingLevel?: number;
};

export default ({ langLabels, projects, tagsById, anchorsById, headingLevel = 3, class: className = '' }: Props) => (<ul class={`lvl list-project ${className}`}>
    {
        projects.map(project => (
            <ProjectCard
                langLabels={langLabels}
                project={project}
                tagsById={tagsById}
                anchorsById={anchorsById}
                headingLevel={headingLevel}
            />
        ))
    }
</ul>)
