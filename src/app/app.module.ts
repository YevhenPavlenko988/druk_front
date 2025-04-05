import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {environment} from '../environments/environment';
import {routes} from './app.routes';
import {LayoutModule} from './$core/layout/layout.module';
import {LanguageService} from './$core/language.service';
import {AppComponent} from './app.component';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
    return new TranslateHttpLoader(http, './assets/locales/', `.json?v=${environment.version}`);
}

export function initializeLanguage(languageService: LanguageService) {
    return () => languageService.initializeLanguage();
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule,
        LayoutModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        RouterModule.forRoot(routes),
    ],
    exports: [],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeLanguage,
            deps: [LanguageService],
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
