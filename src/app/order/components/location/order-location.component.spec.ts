import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {OrderLocationComponent} from './order-location.component';


describe('OrderLocationComponent', () => {
    let component: OrderLocationComponent;
    let fixture: ComponentFixture<OrderLocationComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                HttpClientTestingModule
            ],
            providers: [TranslateService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderLocationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
})

