import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LayoutComponent} from './layout.component';


describe('LayoutComponent', () => {
    let component: LayoutComponent;
    let fixture: ComponentFixture<LayoutComponent>;

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
        fixture = TestBed.createComponent(LayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
