import type { Copy } from '../../lib/ui-types';

export const SkillNames = ['realiser', 'optimiser', 'administrer', 'gerer', 'conduire', 'collaborer'] as const;
export type SkillName = (typeof SkillNames)[number];
export const YearTags = ['but-1', 'but-2', 'but-3'] as const;
export type YearTag = (typeof YearTags)[number];

export interface PageCopy {
    skills: Record<SkillName, Record<'name' | 'desc', Copy>>;
    years: Record<
        YearTag,
        Record<'label' | 'title' | 'description' | 'bilan', Copy> & {
            skills: Partial<Record<SkillName, { ac: Copy[] }>>;
        }
    >;
    yearTabsLabel: string;
    synthesisHeading: Copy;
    yearLabel: Copy;
    logoAlt: string;
    linkTextSyllabus: Copy;
    skillsAbstract: Copy;
    skill: (i: number, name: Copy) => Copy;
    iutAlt: string;
    presentation: Copy;
    heading: Copy;
    iutCaption: Copy;
}
