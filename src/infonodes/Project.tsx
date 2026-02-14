import * as content from '../lib/content';
import { translation } from '../i18n';
import { detailHref, pageHref } from '../lib/links';
import { formatDate } from '../lib/util';
import LinkList from '../components/LinkList';
import Graphic from '../components/Graphic';
import { tag } from '../catalog/tag';
import { getRelativeLocaleUrl } from 'astro:i18n';
import type { DetailedInfonode } from '../lib/infonodes';
import type { Locale } from '../const';
import Heading from '../components/Heading';

export class Project implements DetailedInfonode {
    private constructor(
        private readonly id: string,
        private readonly locale: Locale,
        private readonly data: content.LocalizedItem<'project'>,
        private readonly body: content.Textual
    ) {}
    static of(locale: Locale, id: string) {
        return new Project(id, locale, content.project(locale, id), content.textual(locale, 'project', id));
    }
    readonly Card = () => {
        const _ = translation(this.locale);
        const logoTitle = _.logoTitle(this.data.title.toString());
        const context = this.data.context ? this.data.context.capitalize() : null;
        const backgroundStyle = this.data.background ? `--bg-img-card: url(${this.data.background})` : undefined;
        return (
            <li style={backgroundStyle}>
                <ul class="list-rect">
                    {this.data.tags.map(tagId => (
                        <li>
                            <a href={`${pageHref(this.locale, 'projects')}?tag=${tagId}`}>
                                {tag(this.locale, tagId).title.preact()}
                            </a>
                        </li>
                    ))}
                </ul>
                {this.data.logo ? <Graphic of={this.data.logo} alt={logoTitle} title={logoTitle} class="logo" /> : null}
                <Heading>
                    <a class="foil" href={detailHref(this.locale, 'projects', this.id)}>
                        {this.data.title.preact()}
                    </a>
                </Heading>
                {this.data.startDate ? (
                    <small class="status">
                        <time datetime={this.data.startDate.toISOString()}>
                            {this.data.startDate ? formatDate(this.data.startDate, this.locale) : null}
                        </time>
                        &ndash;
                        {this.data.endDate ? (
                            <time datetime={this.data.endDate.toISOString()}>
                                {this.data.endDate ? formatDate(this.data.endDate, this.locale) : null}
                            </time>
                        ) : (
                            _.ongoing
                        )}
                    </small>
                ) : null}
                {context ? <small class="context">{context}</small> : null}
                <p class="abstract">{this.data.abstract}</p>
                {this.data.links.length > 0 ? <LinkList links={this.data.links} /> : null}
            </li>
        );
    };
    readonly Detail = () => {
        const _ = translation(this.locale);

        const ProjectBody = content.textual2(this.locale, 'project', this.id);

        const backgroundStyle = this.data.background ? `--bg-img: url(${this.data.background})` : undefined;
        const logoTitle = _.logoTitle(this.data.title.toString());
        const startLabel = this.data.startDate ? formatDate(this.data.startDate, this.locale) : '';
        const endLabel = this.data.endDate ? formatDate(this.data.endDate, this.locale) : '';
        const context = this.data.context ? this.data.context.capitalize() : undefined;
        const teamDefs = this.data.team.map(({ id }) => content.def(this.locale, id));
        const techDefs = this.data.technologies.map(({ id }) => content.def(this.locale, id));
        return (
            <main style={backgroundStyle}>
                <header>
                    <ul class="list-rect">
                        {this.data.tags.map(tagId => (
                            <li>
                                <a href={`${pageHref(this.locale, 'projects')}?tag=${tagId}`}>
                                    {tag(this.locale, tagId).title.preact()}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <h1>{this.data.title.preact()}</h1>
                    {this.data.logo ? (
                        <Graphic of={this.data.logo} alt={logoTitle} title={logoTitle} class="logo" />
                    ) : null}
                    <p class="abstract">{this.data.abstract.preact()}</p>
                    <div class="status-context">
                        {context ? <small class="context">{context.preact()}</small> : null}
                        {this.data.startDate ? (
                            <small class="status">
                                <time datetime={this.data.startDate.toISOString()}>{startLabel}</time> &ndash;{' '}
                                {this.data.endDate ? (
                                    <time datetime={this.data.endDate.toISOString()}>{endLabel}</time>
                                ) : (
                                    _.ongoing
                                )}
                            </small>
                        ) : null}
                    </div>
                </header>
                {this.data.links.length > 0 ? (
                    <section id="links">
                        <h2>{_.links}</h2>
                        {/* <LinkList links={this.data.links} variant="page" /> */}
                    </section>
                ) : null}
                {teamDefs.length > 0 ? (
                    <section id="team">
                        <h2>{_.team}</h2>
                        {/* <DefCardList defs={teamDefs} /> */}
                    </section>
                ) : null}
                <section id="story">
                    <h2>{_.story}</h2>
                    <ProjectBody />
                </section>
                {this.data.references.length > 0 ? (
                    <section id="references">
                        <h2>{_.references}</h2>
                        {/* <ReferenceList references={this.data.references} /> */}
                    </section>
                ) : null}
                {techDefs.length > 0 ? (
                    <section id="technologies">
                        <h2>{_.technologies}</h2>
                        {/* <DefCardList defs={techDefs} /> */}
                    </section>
                ) : null}
                {this.data.gallery.length > 0 ? (
                    <section id="gallery">
                        <h2>{_.gallery}</h2>
                        {/* <Gallery items={this.data.gallery} /> */}
                    </section>
                ) : null}
            </main>
        );
    };
    Link() {
        return <a href={getRelativeLocaleUrl(this.locale, `project/${this.id}`)}></a>;
    }
}
