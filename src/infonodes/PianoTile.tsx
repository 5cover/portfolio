import type { Infonode } from '../lib/infonodes';
import * as content from '../lib/content';
import type { Locale } from '../const';
import Section from '../components/Section';
import Heading from '../components/Heading';
import styles from './PianoTile/card.module.scss';
export class PianoTile implements Infonode {
    private constructor(
        private readonly id: string,
        private readonly locale: Locale,
        private readonly data: content.LocalizedItem<'piano-tile'>
    ) {}
    static of(locale: Locale, id: string): PianoTile;
    static of(locale: Locale): PianoTile[];
    static of(locale: Locale, id?: string) {
        return id === undefined
            ? content.pianoTile(locale).map(([id, d]) => new PianoTile(id, locale, d))
            : new PianoTile(id, locale, content.pianoTile(locale, id));
    }
    readonly Card = () => (
        <Section class={styles['card_piano-tile']}>
            <figure>
                <img
                    src={this.data.backgroundImage}
                    alt={this.data.title.toString()}
                    width="240"
                    height="480"
                    loading="lazy"
                    title={this.data.summary.toString()}
                />
                <figcaption>
                    <div>
                        <Heading>
                            <a class="foil" href={this.data.href}>
                                {this.data.title.preact()}
                            </a>
                        </Heading>
                        {this.data.summary.preact()}
                    </div>
                </figcaption>
            </figure>
        </Section>
    );
}
