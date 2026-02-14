import type { Infonode } from '../lib/infonodes';
import style from './CardList.module.scss';
export interface Props {
    items: readonly Infonode[];
}

export default (p: Props) => {
    return (
        <ul class={style.cardList}>
            {p.items.map(i => (
                <li>
                    <i.Card />
                </li>
            ))}
        </ul>
    );
};
