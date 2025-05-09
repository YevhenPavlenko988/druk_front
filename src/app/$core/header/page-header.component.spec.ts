import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {PageHeaderComponent} from './page-header.component';


describe('PageHeaderComponent', () => {
    let component: PageHeaderComponent;
    let fixture: ComponentFixture<PageHeaderComponent>;

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
        fixture = TestBed.createComponent(PageHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
