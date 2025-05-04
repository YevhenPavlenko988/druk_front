import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {NotFoundComponent} from './not-found.component';


describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                HttpClientTestingModule
            ],
            providers: [TranslateService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
