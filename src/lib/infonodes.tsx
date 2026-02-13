import { type Locale } from '../i18n';
import type { FunctionComponent } from 'preact';

export interface Infonode {
    Card: FunctionComponent;
}

export interface DetailedInfonode extends Infonode {
    Link: FunctionComponent;
    Detail: FunctionComponent;
}
