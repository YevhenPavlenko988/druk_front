import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    Inject,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {take} from 'rxjs';
import {SharedModule} from '../../../shared.module';
import {FilesService} from '../../services/files.service';
import {environment} from '../../../../environments/environment';
import {
    ORDER_FILES_DELETE_CANCEL_BTN_LABEL,
    ORDER_FILES_DELETE_DIALOG_CONTENT_LABEL,
    ORDER_FILES_DELETE_DIALOG_TITLE_LABEL,
    ORDER_FILES_DELETE_SAVE_BTN_LABEL,
} from '../../labels';
import {DeleteFileDialogOptions, DeleteFileDialogResult} from '../typing';


@Component({
    selector: 'delete-file-dialog',
    templateUrl: './delete-file-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [SharedModule],
    standalone: true,
})
export class DeleteFileDialogComponent implements OnInit, OnDestroy {
    readonly dialogTitleLabel = ORDER_FILES_DELETE_DIALOG_TITLE_LABEL;
    readonly dialogContentLabel = ORDER_FILES_DELETE_DIALOG_CONTENT_LABEL;
    readonly btnDeleteLabel = ORDER_FILES_DELETE_SAVE_BTN_LABEL;
    readonly btnCancelLabel = ORDER_FILES_DELETE_CANCEL_BTN_LABEL;

    submitted: boolean;

    constructor(@Inject(MAT_DIALOG_DATA) public dialogData: DeleteFileDialogOptions,
                private dialogRef: MatDialogRef<DeleteFileDialogComponent>,
                private cd: ChangeDetectorRef,
                private destroyRef: DestroyRef,
                private filesService: FilesService) {
        if (environment.log.debug) {
            console.log('[DeleteFileDialogComponent] constructor loaded');
        }
    }

    ngOnInit() {
        if (!(this.dialogData?.s3key)) {
            this.dialogRef.close();
            return;
        }
    }

    ngOnDestroy() {
    }

    deleteFile(key: string) {
        if (!key) {
            // todo show some notify
            return;
        }
        this.submitted = true;
        const done = () => {
            this.submitted = false;
            this.cd.markForCheck();
        };

        this.filesService.deleteFile(key).pipe(
            take(1),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: (r) => {
                // todo show some notify
                const result: DeleteFileDialogResult = {
                    result: r,
                    s3key: key,
                };
                this.dialogRef.close(result);
                done();
            },
            error: (err) => {
                if (environment.log.error) {
                    console.error(err);
                }
                // todo show some notify
                done();
            },
        });
    }
}
