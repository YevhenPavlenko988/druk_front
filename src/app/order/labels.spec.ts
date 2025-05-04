import {TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateService} from '@ngx-translate/core';
import {getTranslateModule} from '../../testing/mockTranslateModule';
import {
    ORDER_FILES_ADD_DIRECTION_LABEL,
    ORDER_FILES_ADD_FORMAT_LABEL,
    ORDER_FILES_ADD_SIZE_LABEL,
    ORDER_FILES_BTN_ADD_LABEL,
    ORDER_FILES_DELETE_CANCEL_BTN_LABEL,
    ORDER_FILES_DELETE_DIALOG_CONTENT_LABEL,
    ORDER_FILES_DELETE_DIALOG_TITLE_LABEL,
    ORDER_FILES_DELETE_SAVE_BTN_LABEL,
    ORDER_FILES_PAGES_LABEL,
    ORDER_FILES_SIDES_LABEL,
    ORDER_FILES_TITLE_LABEL,
    ORDER_LOCATION_AVAILABLE_SHEETS_LABEL,
    ORDER_LOCATION_AVAILABLE_LABEL,
    ORDER_LOCATION_SHEETS_LABEL,
    ORDER_LOCATION_TITLE_LABEL,
    ORDER_SUMMARY_COMMISSION_LABEL,
    ORDER_SUMMARY_CREATE_BTN_LABEL,
    ORDER_SUMMARY_TITLE_LABEL,
    ORDER_SUMMARY_TOTAL_LABEL,
    ORDER_TITLE_LABEL,
    ORDER_SUMMARY_SINGLE_LABEL,
    ORDER_SUMMARY_DOUBLE_LABEL,
} from './labels';


describe('order#translates', () => {
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
        ORDER_TITLE_LABEL,

        ORDER_LOCATION_TITLE_LABEL,
        ORDER_LOCATION_AVAILABLE_LABEL,
        ORDER_LOCATION_AVAILABLE_SHEETS_LABEL,
        ORDER_LOCATION_SHEETS_LABEL,

        ORDER_FILES_TITLE_LABEL,
        ORDER_FILES_BTN_ADD_LABEL,
        ORDER_FILES_PAGES_LABEL,
        ORDER_FILES_SIDES_LABEL,
        ORDER_FILES_ADD_DIRECTION_LABEL,
        ORDER_FILES_ADD_FORMAT_LABEL,
        ORDER_FILES_ADD_SIZE_LABEL,

        ORDER_FILES_DELETE_DIALOG_TITLE_LABEL,
        ORDER_FILES_DELETE_DIALOG_CONTENT_LABEL,
        ORDER_FILES_DELETE_SAVE_BTN_LABEL,
        ORDER_FILES_DELETE_CANCEL_BTN_LABEL,

        ORDER_SUMMARY_TITLE_LABEL,
        ORDER_SUMMARY_SINGLE_LABEL,
        ORDER_SUMMARY_DOUBLE_LABEL,
        ORDER_SUMMARY_COMMISSION_LABEL,
        ORDER_SUMMARY_TOTAL_LABEL,
        ORDER_SUMMARY_CREATE_BTN_LABEL,
    ]) {
        it(`should be valid translate by "${key}"`, () => {
            expect(key).not.toBeNull();
            const consoleError = spyOn(console, 'error').and.callThrough();
            expect(translateService.instant(key)).not.toEqual(key);
            expect(consoleError).not.toHaveBeenCalled();
        });
    }
});
