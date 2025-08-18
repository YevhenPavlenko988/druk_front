import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TestActivatedRoute} from '../../testing/services/TestActivatedRoute';
import {OrderComponent} from './order.component';


describe('OrderComponent', () => {
    let component: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TranslateModule.forRoot()],
            providers: [
                {provide: ActivatedRoute, useClass: TestActivatedRoute},
                TranslateService,
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
