import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {COPIES_COUNT, FILE_FORMATS, FORM_ID, MAX_COPIES_COUNT, MIN_COPIES_COUNT, PRINT_TYPE} from '../../consts';
import {
    ORDER_FILES_ADD_DIRECTION_LABEL,
    ORDER_FILES_ADD_FORMAT_LABEL,
    ORDER_FILES_BTN_ADD_LABEL,
    ORDER_FILES_PAGES_LABEL,
    ORDER_FILES_SIDES_LABEL,
    ORDER_FILES_TITLE_LABEL,
} from '../../labels';
import {SharedModule} from '../../../shared.module';
import {FileDTOView} from '../../models/FileDTOView';
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
    readonly filesTitleLabel = ORDER_FILES_TITLE_LABEL;
    readonly btnAddFileLabel = ORDER_FILES_BTN_ADD_LABEL;
    readonly pagesLabel = ORDER_FILES_PAGES_LABEL;
    readonly sidesLabel = ORDER_FILES_SIDES_LABEL;
    readonly addDirectionLabel = ORDER_FILES_ADD_DIRECTION_LABEL;
    readonly addFormatLabel = ORDER_FILES_ADD_FORMAT_LABEL;
    //
    readonly printTypeField = PRINT_TYPE;
    readonly copiesCountField = COPIES_COUNT;

    readonly minCopiesCount = MIN_COPIES_COUNT;
    readonly maxCopiesCount = MAX_COPIES_COUNT;
    readonly fileFormats = FILE_FORMATS.join(',');
    readonly env = environment;

    @Input({transform: booleanAttribute}) loading: boolean;
    // submitted: boolean;
    @Input() files: Array<FileDTOView>;
    @Input() settingsFormArray: FormArray<FormGroup>;
    @Output() fileUploaded = new EventEmitter<File>();
    @Output() fileDeleted = new EventEmitter<number>();
    @Output() fileChanged = new EventEmitter();

    get isDisabled(): boolean {
        return this.loading;
    }

    constructor(private cd: ChangeDetectorRef,) {
        if (environment.log.debug) {
            console.log('[OrderFilesComponent] constructor loaded');
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    onAddFile(input: HTMLInputElement) {
        if (!input?.files?.length) {
            // todo show some notify
            return;
        }
        const file = input.files[0];
        this.fileUploaded.emit(file);
    }

    onDeleteFile(index: number) {
        const file = this.files[index];
        if (!file || !file.s3key) {
            // todo show some notify
            return;
        }
        this.fileDeleted.emit(index);
    }

    changePrintType(id: string) {
        const currentForm = this.findCurrentForm(id);
        const file = this.files.find(f => f.id === id);
        if (!currentForm || !file) {
            return;
        }
        const isDouble = currentForm.get(PRINT_TYPE)?.value;
        file.$printType = isDouble ? PrintTypeEnum.DUPLEX : PrintTypeEnum.ONE_SIDED;
        this.cd.markForCheck();
        this.fileChanged.emit(file);
    }


    decreaseCopies(id: string) {
        // const currentForm = this.settingsFormArray.at(index);
        // let currentValue = this.settingsForm.get(COPIES_COUNT).value;
        // this.settingsForm.get(COPIES_COUNT).setValue(currentValue - 1);
        const currentForm = this.findCurrentForm(id);
        const currentControl = currentForm.get(COPIES_COUNT);
        const file = this.files.find(f => f.id === id);
        if (!file || !currentControl || currentControl.value === MIN_COPIES_COUNT) {
            return;
        }
        currentControl.setValue(currentControl.value - 1);
        file.$copiesCount = currentControl.value;
        this.cd.markForCheck();
        this.fileChanged.emit(file);
    }

    increaseCopies(id: string) {
        const currentForm = this.findCurrentForm(id);
        const currentControl = currentForm.get(COPIES_COUNT);
        const file = this.files.find(f => f.id === id);
        if (!file || !currentControl || currentControl.value === MAX_COPIES_COUNT) {
            return;
        }
        currentControl.setValue(currentControl.value + 1);
        file.$copiesCount = currentControl.value;
        this.cd.markForCheck();
        this.fileChanged.emit(file);
    }

    findCurrentForm(id: string): FormGroup {
        return this.settingsFormArray.controls
            .find(fg => fg.get(FORM_ID)?.value === id) as FormGroup | undefined;
    }

    trackByFn(file: FileDTOView | any) {
        return file?.id;
    }
}
