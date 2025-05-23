import {TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateService} from '@ngx-translate/core';
import {getTranslateModule} from '../../testing/mockTranslateModule';
import {
    HEADER_STEP_FILES_LABEL,
    HEADER_STEP_PAYMENT_LABEL,
    HEADER_STEP_PRINT_LABEL,
    HEADER_TITLE_LABEL
} from './consts';


describe('core#translates', () => {
    let translateService: TranslateService;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                HttpClientTestingModule,
                getTranslateModule(),
            ],
            providers: [TranslateService],
        }).compileComponents();
        translateService = TestBed.inject(TranslateService);
    }));

    for (const key of [
        HEADER_TITLE_LABEL,
        HEADER_STEP_FILES_LABEL,
        HEADER_STEP_PAYMENT_LABEL,
        HEADER_STEP_PRINT_LABEL,
    ]) {
        it(`should be valid translate by "${key}"`, () => {
            expect(key).not.toBeNull();
            const consoleError = spyOn(console, 'error').and.callThrough();
            expect(translateService.instant(key)).not.toEqual(key);
            expect(consoleError).not.toHaveBeenCalled();
        });
    }
});
