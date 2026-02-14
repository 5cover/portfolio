import type { AstroGlobal } from 'astro';
import { astroCtx } from '../../lib/context';
import Graphic from '../Graphic';
import ProjectCardList from '../ProjectCardList';
import * as content from '../../lib/content';
import { pageHref } from '../../lib/links';
import { normalizeLocale } from '../../i18n';
import type { ComponentChildren } from 'preact';
import Section from '../Section';
import Heading from '../Heading';
import CardList from '../CardList';
import { PianoTile } from '../../infonodes/PianoTile';
import style from './HomePage.module.scss';
import { cls } from '../../lib/util';
export interface Props {
    astro: AstroGlobal;
    copy: {
        me: string;
        myPhoto: string;
        ongoingProjects: string;
        allMyProjects: string;
        contact: string;
        myResumePreview: string;
        myResume: string;
        videoCv: string;
    };
    children: ComponentChildren;
}

export default (p: Props) => {
    const locale = normalizeLocale(p.astro.currentLocale),
        projects = content.project(locale),
        contacts = content.contact(),
        s = p.copy;
    return (
        <astroCtx.Provider value={p.astro}>
            <main>
                <CardList items={PianoTile.of(locale)} />
                <Section as="article" class={cls('lvl', 'content-block', style.me)}>
                    <div>
                        <Heading>{s.me}</Heading>
                        {p.children}
                    </div>
                    <img
                        src="/portfolio/img/me.jpg"
                        alt={s.myPhoto}
                        width="1600"
                        height="1600"
                        loading="lazy"
                        title={s.myPhoto}
                    />
                </Section>
                <Section class={cls('lvl', style.ongoingProjects)}>
                    <Heading>{s.ongoingProjects}</Heading>
                    <ProjectCardList entries={projects.filter(([, project]) => !project.endDate)} />
                    <a href={pageHref(locale, 'projects')} class="lvl button-link">
                        {s.allMyProjects}
                    </a>
                </Section>
                <Section class={cls('lvl', style.contentBlock)}>
                    <div>
                        <Heading>{s.contact}</Heading>
                        <address>
                            <ul>
                                {contacts.map(([, contact]) => (
                                    <li title={contact.platform}>
                                        <a
                                            class="link iconed-text"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={contact.href}>
                                            <Graphic of={contact.icon} alt={contact.platform} />
                                            <span>{contact.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </address>
                    </div>
                    <a href={`/portfolio/${locale}/cv-bardini-raphael.pdf`} target="_blank" rel="noopener noreferrer">
                        <img
                            src={`/portfolio/${locale}/cv-bardini-raphael-preview.jpg`}
                            alt={s.myResumePreview}
                            width="212"
                            height="300"
                            loading="lazy"
                        />
                        <span>{s.myResume}</span>
                    </a>
                </Section>
                <Section class="lvl content-block">
                    <Heading>{s.videoCv}</Heading>
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/6VqtL5oogwk?modestbranding=1&rel=0"
                        width="640"
                        height="360"
                        title="Video CV - Raphaël Bardini"
                        /* allowfullscreen */
                    ></iframe>
                </Section>
            </main>
            {/* <script src="../../scripts/index.ts"></script> how to do this */}
        </astroCtx.Provider>
    );
};
