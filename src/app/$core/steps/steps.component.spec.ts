import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {StepsComponent} from './steps.component';


describe('StepsComponent', () => {
    let component: StepsComponent;
    let fixture: ComponentFixture<StepsComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [
                TranslateService,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StepsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
