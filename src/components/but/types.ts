import type { Copy, copy } from '../../lib/copy';

export const skillNames = ['realiser', 'optimiser', 'administrer', 'gerer', 'conduire', 'collaborer'] as const;
export type SkillName = (typeof skillNames)[number];
export const yearTags = ['but-1', 'but-2', 'but-3'] as const;
export type YearTag = (typeof yearTags)[number];

export type ButData = {
    skills: Record<SkillName, Record<'name' | 'desc', copy>>;
    years: Record<
        YearTag,
        Record<'label' | 'title' | 'description' | 'bilan', copy> & {
            skills: Partial<Record<SkillName, { ac: copy[] }>>;
        }
    >;
    yearTabsLabel: string;
    synthesisHeading: copy;
    yearLabel: copy;
    logoAlt: string;
    linkTextSyllabus: copy;
    skillsAbstract: copy;
    skill: (i: number, name: Copy) => copy;
    iutAlt: string;
    presentation: copy;
    heading: copy;
    iutCaption: copy;
}
