import {TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateService} from '@ngx-translate/core';
import {getTranslateModule} from '../../testing/mockTranslateModule';
import {
    ORDER_LOCATION_AVAILABLE_SHEETS_LABEL,
    ORDER_LOCATION_AVAILABLE_UNTIL_LABEL,
    ORDER_LOCATION_SHEETS_LABEL,
    ORDER_LOCATION_TITLE_LABEL,
    ORDER_TITLE_LABEL,
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
        ORDER_LOCATION_AVAILABLE_UNTIL_LABEL,
        ORDER_LOCATION_AVAILABLE_SHEETS_LABEL,
        ORDER_LOCATION_SHEETS_LABEL
    ]) {
        it(`should be valid translate by "${key}"`, () => {
            expect(key).not.toBeNull();
            const consoleError = spyOn(console, 'error').and.callThrough();
            expect(translateService.instant(key)).not.toEqual(key);
            expect(consoleError).not.toHaveBeenCalled();
        });
    }
});
