import ProjectCardList from '../ProjectCardList';
import { getAnchors, getProjects, getTags, mapById, type Entry } from '../../lib/content';
import { getLabels, type Locale, type LocaleLabels } from '../../i18n/site';
import Section from '../Section';
import Heading from '../Heading';
import type { PageCopy } from './types';
import type { LocalizedItem } from '../../content/config';

const MaxProjectsPerSkill = 4;

interface Data {
    projects: Entry<LocalizedItem<'projects'>>[];
    labels: LocaleLabels;
    locale: Locale;
}

export interface Props {
    copy: PageCopy;
    data: Data;
}

function simpleEntries<K extends PropertyKey, V>(o: Partial<Record<K, V>>) {
    return Object.entries(o) as [K, V][];
}

export const data = async (locale: Locale): Promise<Data> => ({
    projects: await getProjects(locale),
    labels: getLabels(locale),
    locale,
});

export default ({ copy, data }: Props) => {
    const { projects, labels, locale } = data;
    return (
        <>
            <Section class="but-body margined">
                <header id="titre">
                    <Heading>{copy.heading}</Heading>
                    <img
                        src="/portfolio/img/but.webp"
                        alt={copy.logoAlt}
                        width="95"
                        height="96"
                        loading="lazy"
                        title={copy.logoAlt}
                    />
                </header>

                <article id="presentation">{copy.presentation}</article>
                <a
                    class="lvl button-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.enseignementsup-recherche.gouv.fr/sites/default/files/annexe-2-licence-professionnelle-bachelor-universitaire-de-technologie-informatique-29016.pdf">
                    {copy.linkTextSyllabus}
                </a>
                <section id="progression">
                    <h2>{copy.yearTabsLabel}</h2>
                    <p>{copy.skillsAbstract}</p>
                    <div class="tabs" id="but-years">
                        <div class="tablist" role="tablist" aria-label={copy.yearTabsLabel}>
                            {Object.entries(copy.years).map(([id, year], i) => (
                                <button
                                    type="button"
                                    role="tab"
                                    id={`tab-${id}`}
                                    aria-controls={`panel-${id}`}
                                    aria-selected={i === 0 ? 'true' : 'false'}
                                    tabindex={i === 0 ? 0 : -1}>
                                    {year.label}
                                </button>
                            ))}
                        </div>
                        {Object.entries(copy.years).map(([yearName, year], i) => (
                            <section
                                id={`panel-${yearName}`}
                                role="tabpanel"
                                aria-labelledby={`tab-${yearName}`}
                                style={i === 0 ? '' : 'display:none'}>
                                <h3>
                                    {copy.yearLabel} {i + 1} &mdash; {year.title}
                                </h3>
                                <p class="year-description">{year.description}</p>
                                <p class="year-bilan">
                                    <em>{year.bilan}</em>
                                </p>
                                <ul class="year-skills lvl">
                                    {simpleEntries(year.skills).map(([skillName, skillYear], i) => {
                                        const skillTag = `but-${skillName}`;
                                        const skillProjects = projects
                                            .filter(
                                                ([, project]) =>
                                                    project.tags.includes(yearName) && project.tags.includes(skillTag)
                                            )
                                            .slice(0, MaxProjectsPerSkill);
                                        return (
                                            <li
                                                style={`--bg-img: url(/portfolio/img/skill/${skillName}.jpg)`}
                                                class="year-skill">
                                                <h3>{copy.skill(i + 1, copy.skills[skillName].name)}</h3>
                                                <p>{copy.skills[skillName].desc}</p>
                                                <ul class="apprentissages">
                                                    {skillYear.ac.map(item => (
                                                        <li>{item}</li>
                                                    ))}
                                                </ul>
                                                {skillProjects.length > 0 ? (
                                                    <ProjectCardList
                                                        langLabels={{
                                                            ongoing: labels.copy.ongoing,
                                                            fmtTitle: labels.copy.fmtTitle,
                                                        }}
                                                        entry={skillProjects}
                                                        headingLevel={4}
                                                        class="project-skills"
                                                        locale={locale}
                                                    />
                                                ) : null}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        ))}
                    </div>
                </section>
                <div class="lvl">
                    <article id="resultat-pour-moi">
                        <h2>{copy.synthesisHeading}</h2>
                        <slot />
                    </article>
                    <figure class="figure">
                        <img
                            src="/portfolio/img/iut-lannion.jpg"
                            alt={copy.iutAlt}
                            width="1200"
                            height="630"
                            loading="lazy"
                            title={copy.iutAlt}
                        />
                        <figcaption>{copy.iutCaption}</figcaption>
                    </figure>
                </div>
            </Section>
        </>
    );
};
