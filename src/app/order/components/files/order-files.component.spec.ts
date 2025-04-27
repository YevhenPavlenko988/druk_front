import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {OrderFilesComponent} from './order-files.component';


describe('OrderFilesComponent', () => {
    let component: OrderFilesComponent;
    let fixture: ComponentFixture<OrderFilesComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                HttpClientTestingModule,
            ],
            providers: [TranslateService],
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
