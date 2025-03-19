import {Observable, of} from 'rxjs';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {DEFAULT_LANG} from '../app/$core/consts';

// const defaultTranslations = require(`../assets/locales/${DEFAULT_LANG}.json`);
import defaultTranslations from '../assets/locales/en.json';

class FakeLoader implements TranslateLoader {

    getTranslation(lang: string): Observable<any> {
        return of({
            ...defaultTranslations,
        });
    }
}

export function getTranslateModule(translations?: any) {
    return TranslateModule.forRoot({
        useDefaultLang: true,
        defaultLanguage: DEFAULT_LANG,
        loader: {
            provide: TranslateLoader,
            useValue: new FakeLoader(),
            deps: [],
        },
    });
}
