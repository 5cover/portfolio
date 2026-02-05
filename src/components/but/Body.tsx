import ProjectCardList from '../ProjectCardList';
import * as content from '../../lib/content';
import Section from '../Section';
import Heading from '../Heading';
import type { ButData } from './types';
import { plainEntries } from '../../lib/util';
import { c, copy } from '../../lib/copy';
import { astro } from '../context';

const MaxProjectsPerSkill = 4;

export interface Props {
    d: ButData;
}

export default ({ d }: Props) => {
    const projects = content.project(astro().currentLocale);
    return (
        <>
            <Section class="but-body margined">
                <header id="titre">
                    <Heading>{c(d.heading)}</Heading>
                    <img
                        src="/portfolio/img/but.webp"
                        alt={d.logoAlt}
                        width="95"
                        height="96"
                        loading="lazy"
                        title={d.logoAlt}
                    />
                </header>

                <article id="presentation">{c(d.presentation)}</article>
                <a
                    class="lvl button-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.enseignementsup-recherche.gouv.fr/sites/default/files/annexe-2-licence-professionnelle-bachelor-universitaire-de-technologie-informatique-29016.pdf">
                    {c(d.linkTextSyllabus)}
                </a>
                <section id="progression">
                    <h2>{d.yearTabsLabel}</h2>
                    <p>{c(d.skillsAbstract)}</p>
                    <div class="tabs" id="but-years">
                        <div class="tablist" role="tablist" aria-label={d.yearTabsLabel}>
                            {plainEntries(d.years).map(([id, year], i) => (
                                <button
                                    type="button"
                                    role="tab"
                                    id={`tab-${id}`}
                                    aria-controls={`panel-${id}`}
                                    aria-selected={i === 0 ? 'true' : 'false'}
                                    tabindex={i === 0 ? 0 : -1}>
                                    {c(year.label)}
                                </button>
                            ))}
                        </div>
                        {plainEntries(d.years).map(([yearName, year], i) => (
                            <section
                                id={`panel-${yearName}`}
                                role="tabpanel"
                                aria-labelledby={`tab-${yearName}`}
                                style={i === 0 ? '' : 'display:none'}>
                                <h3>
                                    {c(d.yearLabel)} {i + 1} &mdash; {c(year.title)}
                                </h3>
                                <p class="year-description">{c(year.description)}</p>
                                <p class="year-bilan">
                                    <em>{c(year.bilan)}</em>
                                </p>
                                <ul class="year-skills lvl">
                                    {plainEntries(year.skills).map(([skillName, skillYear], i) => {
                                        const skillProjects = projects
                                            .filter(
                                                ([, project]) =>
                                                    project.tags.includes(yearName) &&
                                                    project.tags.includes(`but-${skillName}`)
                                            )
                                            .slice(0, MaxProjectsPerSkill);
                                        return (
                                            <li
                                                style={`--bg-img: url(/portfolio/img/skill/${skillName}.jpg)`}
                                                class="year-skill">
                                                <h3>{c(d.skill(i + 1, d.skills[skillName].name))}</h3>
                                                <p>{c(d.skills[skillName].desc)}</p>
                                                <ul class="apprentissages">
                                                    {skillYear.ac.map(item => (
                                                        <li>{c(item)}</li>
                                                    ))}
                                                </ul>
                                                {skillProjects.length > 0 ? (
                                                    <ProjectCardList entries={skillProjects} class="project-skills" />
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
                        <h2>{c(d.synthesisHeading)}</h2>
                        <slot />
                    </article>
                    <figure class="figure">
                        <img
                            src="/portfolio/img/iut-lannion.jpg"
                            alt={d.iutAlt}
                            width="1200"
                            height="630"
                            loading="lazy"
                            title={d.iutAlt}
                        />
                        <figcaption>{c(d.iutCaption)}</figcaption>
                    </figure>
                </div>
            </Section>
        </>
    );
};
