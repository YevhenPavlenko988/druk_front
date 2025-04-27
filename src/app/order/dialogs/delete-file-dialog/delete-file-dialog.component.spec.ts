import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {noop} from 'rxjs';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {DeleteFileDialogComponent} from './delete-file-dialog.component';


describe('DeleteFileDialogComponent', () => {
    let component: DeleteFileDialogComponent;
    let fixture: ComponentFixture<DeleteFileDialogComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                HttpClientTestingModule,
            ],
            providers: [
                TranslateService,
                {provide: MatDialogRef, useValue: {close: noop}},
                {provide: MAT_DIALOG_DATA, useValue: {s3key: '1'}},
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteFileDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
