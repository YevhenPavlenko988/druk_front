import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {OrderFilesComponent} from './order-files.component';


describe('OrderFilesComponent', () => {
    let component: OrderFilesComponent;
    let fixture: ComponentFixture<OrderFilesComponent>;

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
        fixture = TestBed.createComponent(OrderFilesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
