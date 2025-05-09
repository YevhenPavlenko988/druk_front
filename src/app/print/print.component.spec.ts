import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TestActivatedRoute} from '../../testing/services/TestActivatedRoute';
import {PrintComponent} from './print.component';


describe('PrintComponent', () => {
    let component: PrintComponent;
    let fixture: ComponentFixture<PrintComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                HttpClientTestingModule
            ],
            providers: [
                {provide: ActivatedRoute, useClass: TestActivatedRoute},
                TranslateService,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrintComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
