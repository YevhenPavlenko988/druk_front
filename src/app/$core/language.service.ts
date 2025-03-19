import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {DEFAULT_LANG, STORAGE_LANG_NAME} from './consts';

@Injectable({providedIn: 'root'})
export class LanguageService {
    private readonly defaultLang = DEFAULT_LANG;

    constructor(private translate: TranslateService) {
        this.initializeLanguage();
    }

    public initializeLanguage(): void {
        const savedLang = localStorage.getItem(STORAGE_LANG_NAME) || this.defaultLang;
        this.translate.setDefaultLang(this.defaultLang);
        this.translate.use(savedLang);
    }

    changeLanguage(lang: string): void {
        this.translate.use(lang);
        localStorage.setItem(STORAGE_LANG_NAME, lang);
    }

    getCurrentLanguage(): string {
        return this.translate.currentLang;
    }
}
