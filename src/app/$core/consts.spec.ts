import {TestBed, waitForAsync} from '@angular/core/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateService} from '@ngx-translate/core';
import {getTranslateModule} from '../../testing/mockTranslateModule';
import {
    HEADER_STEP_LABEL,
    HEADER_TITLE_FILES_LABEL,
    HEADER_TITLE_PAYMENT_LABEL,
    HEADER_TITLE_PRINT_LABEL,
} from './consts';


describe('core#translates', () => {
    let translateService: TranslateService;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [getTranslateModule()],
            providers: [
                TranslateService,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        }).compileComponents();
        translateService = TestBed.inject(TranslateService);
    }));

    for (const key of [
        HEADER_STEP_LABEL,
        HEADER_TITLE_FILES_LABEL,
        HEADER_TITLE_PAYMENT_LABEL,
        HEADER_TITLE_PRINT_LABEL,
    ]) {
        it(`should be valid translate by "${key}"`, () => {
            expect(key).not.toBeNull();
            const consoleError = spyOn(console, 'error').and.callThrough();
            expect(translateService.instant(key)).not.toEqual(key);
            expect(consoleError).not.toHaveBeenCalled();
        });
    }
});
