import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {Router} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {take} from 'rxjs';
import {mapFile} from './transform/mapFile';
import {environment} from '../../environments/environment';
import {SharedModule} from '../shared.module';
import {OrderLocationComponent} from './components/location/order-location.component';
import {OrderFilesComponent} from './components/files/order-files.component';
import {OrderSummaryComponent} from './components/summary/order-summary.component';
import {DeleteFileDialogComponent} from './dialogs/delete-file-dialog/delete-file-dialog.component';
import {ORDER_TITLE_LABEL} from './labels';
import {COPIES_COUNT, FORM_ID, PRINT_TYPE} from './consts';
import {FileDTOView} from './models/FileDTOView';
import {FilesService} from './services/files.service';
import {DeleteFileDialogOptions, DeleteFileDialogResult} from './dialogs/typing';
import {ICONS} from '../$core/icons';


@Component({
    selector: 'order-page',
    templateUrl: './order.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'order-page',
    },
    imports: [SharedModule, OrderLocationComponent, OrderFilesComponent, OrderSummaryComponent],
    standalone: true,
})
export class OrderComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;
    // labels
    readonly orderTitleLabel = ORDER_TITLE_LABEL;

    loading: boolean;
    // submitted: boolean;
    fileList: Array<FileDTOView>;
    settingsFormArray: FormArray<FormGroup> = new FormArray([]);

    constructor(private router: Router,
                private cd: ChangeDetectorRef,
                private destroyRef: DestroyRef,
                private dialog: MatDialog,
                private filesService: FilesService) {
        if (environment.log.debug) {
            console.log('[OrderComponent] constructor loaded');
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    createSettingsForm(file: FileDTOView) {
        const form = new FormGroup({
            [FORM_ID]: new FormControl(file.id),
            [PRINT_TYPE]: new FormControl(false),
            [COPIES_COUNT]: new FormControl(file.$copiesCount),
        });
        this.settingsFormArray.push(form);
    }

    onFileUploaded(file: File) {
        this.loading = true;
        this.cd.markForCheck();
        const done = () => {
            this.loading = false;
            this.cd.markForCheck();
        };

        const formData = new FormData();
        formData.append('file', file);
        this.filesService.uploadFile(formData).pipe(
            take(1),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: (r) => {
                const fileToView = mapFile(r);
                this.createSettingsForm(fileToView);
                this.fileList = [...(this.fileList || []), fileToView];
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

    onFileDeleted(key: string) {
        const dialogRef = this.dialog.open<
            DeleteFileDialogComponent,
            DeleteFileDialogOptions,
            DeleteFileDialogResult
        >(DeleteFileDialogComponent, {data: {s3key: key}});
        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                return;
            }
            this.fileList = this.fileList.filter(x => x.s3key !== result.s3key);
            this.cd.markForCheck();
        });
    }

    onFileChanged(file: FileDTOView) {
        // console.log(file);
        // console.log(this.fileList);
    }
}
