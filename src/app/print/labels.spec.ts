import {TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateService} from '@ngx-translate/core';
import {getTranslateModule} from '../../testing/mockTranslateModule';
import {
    PRINT_FAIL_BTN_AGAIN_LABEL,
    PRINT_FAIL_BTN_BACK_LABEL,
    PRINT_FAIL_TEXT_LABEL,
    PRINT_FAIL_TITLE_LABEL,
    PRINT_PRINTING_BTN_MORE_LABEL,
    PRINT_PRINTING_TEXT_LABEL,
    PRINT_PRINTING_TITLE_LABEL,
    PRINT_SUCCESS_BTN_PRINT_LABEL,
    PRINT_SUCCESS_TEXT_LABEL,
    PRINT_SUCCESS_TITLE_LABEL
} from "./labels";


describe('print#translates', () => {
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
        PRINT_SUCCESS_TITLE_LABEL,
        PRINT_SUCCESS_TEXT_LABEL,
        PRINT_SUCCESS_BTN_PRINT_LABEL,

        PRINT_FAIL_TITLE_LABEL,
        PRINT_FAIL_TEXT_LABEL,
        PRINT_FAIL_BTN_AGAIN_LABEL,
        PRINT_FAIL_BTN_BACK_LABEL,

        PRINT_PRINTING_TITLE_LABEL,
        PRINT_PRINTING_TEXT_LABEL,
        PRINT_PRINTING_BTN_MORE_LABEL,
    ]) {
        it(`should be valid translate by "${key}"`, () => {
            expect(key).not.toBeNull();
            const consoleError = spyOn(console, 'error').and.callThrough();
            expect(translateService.instant(key)).not.toEqual(key);
            expect(consoleError).not.toHaveBeenCalled();
        })
    }
});
