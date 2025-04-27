import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {take} from 'rxjs';
import {mapFile} from '../../transform/mapFile';
import {environment} from '../../../../environments/environment';
import {COPIES_COUNT, FORM_ID, MAX_COPIES_COUNT, MIN_COPIES_COUNT, PRINT_TYPE} from '../../consts';
import {
    ORDER_FILES_ADD_DIRECTION_LABEL,
    ORDER_FILES_ADD_FORMAT_LABEL,
    ORDER_FILES_BTN_ADD_LABEL,
    ORDER_FILES_PAGES_LABEL, ORDER_FILES_SIDES_LABEL,
    ORDER_FILES_TITLE_LABEL,
} from '../../labels';
import {SharedModule} from '../../../shared.module';
import {FilesService} from '../../services/files.service';
import {DeleteFileDialogComponent} from '../../dialogs/delete-file-dialog/delete-file-dialog.component';
import {DeleteFileDialogOptions, DeleteFileDialogResult} from '../../dialogs/typing';
import {FileView} from '../../models/FileView';
import {ICONS} from '../../../$core/icons';
import {PrintTypeEnum} from '../../models/PrintTypeEnum';


@Component({
    selector: 'order-files',
    templateUrl: './order-files.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'order-files',
    },
    imports: [SharedModule],
    standalone: true,
})
export class OrderFilesComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;
    //
    readonly orderFilesTitleLabel = ORDER_FILES_TITLE_LABEL;
    readonly btnAddFileLabel = ORDER_FILES_BTN_ADD_LABEL;
    readonly pagesLabel = ORDER_FILES_PAGES_LABEL;
    readonly sidesLabel = ORDER_FILES_SIDES_LABEL;
    readonly addDirectionLabel = ORDER_FILES_ADD_DIRECTION_LABEL;
    readonly addFormatLabel = ORDER_FILES_ADD_FORMAT_LABEL;
    //
    readonly printTypeField = PRINT_TYPE;
    readonly copiesCountField = COPIES_COUNT;
    settingsFormArray: FormArray<FormGroup> = new FormArray([]);

    readonly minCopiesCount = MIN_COPIES_COUNT;
    readonly maxCopiesCount = MAX_COPIES_COUNT;
    readonly env = environment;

    loading: boolean;
    submitted: boolean;
    fileList: Array<FileView>;

    get isDisabled(): boolean {
        return this.loading;
    }

    constructor(private destroyRef: DestroyRef,
                private cd: ChangeDetectorRef,
                private dialog: MatDialog,
                private filesService: FilesService) {
        if (environment.log.debug) {
            console.log('[OrderFilesComponent] constructor loaded');
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    createSettingsForm(file: FileView) {
        const form = new FormGroup({
            [FORM_ID]: new FormControl(file.id),
            [PRINT_TYPE]: new FormControl(false),
            [COPIES_COUNT]: new FormControl(file.$copiesCount),
        });
        this.settingsFormArray.push(form);
    }

    onAddFile(input: HTMLInputElement) {
        if (!input?.files?.length) {
            return;
        }
        this.loading = true;
        this.submitted = true;
        this.cd.markForCheck();
        const done = () => {
            this.loading = false;
            this.submitted = false;
            this.cd.markForCheck();
        };
        const file = input.files[0];
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

    onDeleteFile(key: string) {
        if (!key) {
            // todo show some notify
            return;
        }
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

    changePrintType(id: string) {
        const currentForm = this.findCurrentForm(id);
        const file = this.fileList.find(f => f.id === id);
        if (!currentForm || !file) {
            return;
        }
        const isDouble = currentForm.get(PRINT_TYPE)?.value;
        file.$printType = isDouble ? PrintTypeEnum.DUPLEX : PrintTypeEnum.ONE_SIDED;
        this.cd.markForCheck();
    }


    decreaseCopies(id: string) {
        // const currentForm = this.settingsFormArray.at(index);
        // let currentValue = this.settingsForm.get(COPIES_COUNT).value;
        // this.settingsForm.get(COPIES_COUNT).setValue(currentValue - 1);
        const currentForm = this.findCurrentForm(id);
        const currentControl = currentForm.get(COPIES_COUNT);
        const file = this.fileList.find(f => f.id === id);
        if (!file || !currentControl || currentControl.value === MIN_COPIES_COUNT) {
            return;
        }
        currentControl.setValue(currentControl.value - 1);
        file.$copiesCount = currentControl.value;
        this.cd.markForCheck();
    }

    increaseCopies(id: string) {
        const currentForm = this.findCurrentForm(id);
        const currentControl = currentForm.get(COPIES_COUNT);
        const file = this.fileList.find(f => f.id === id);
        if (!file || !currentControl || currentControl.value === MAX_COPIES_COUNT) {
            return;
        }
        currentControl.setValue(currentControl.value + 1);
        file.$copiesCount = currentControl.value;
        this.cd.markForCheck();
    }

    findCurrentForm(id: string): FormGroup {
        return this.settingsFormArray.controls
                   .find(fg => fg.get(FORM_ID)?.value === id) as FormGroup | undefined;
    }
}
