import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {EMPTY, switchMap, take} from 'rxjs';
import {SharedModule} from '../shared.module';
import {PrinterService} from '../$core/printer.service';
import {FilesService} from './services/files.service';
import {OrderService} from './services/order.service';
import {OrderFilesComponent} from './components/files/order-files.component';
import {OrderSummaryComponent} from './components/summary/order-summary.component';
import {DeleteFileDialogComponent} from './dialogs/delete-file-dialog/delete-file-dialog.component';
import {mapPrinter} from '../$core/transform/mapPrinter';
import {mapFile} from './transform/mapFile';
import {environment} from '../../environments/environment';
import {
    ORDER_LOCATION_AVAILABLE_LABEL,
    ORDER_LOCATION_AVAILABLE_SHEETS_LABEL,
    ORDER_LOCATION_SHEETS_LABEL,
    ORDER_LOCATION_TITLE_LABEL,
    ORDER_TITLE_LABEL
} from './labels';
import {COPIES_COUNT, FORM_ID, PRINT_TYPE, ROUTE_PRINTER_ID} from './consts';
import {ICONS} from '../$core/icons';
import {PrinterDTOView} from '../$core/models/PrinterDTOView';
import {FileDTOView} from './models/FileDTOView';
import {DeleteFileDialogOptions, DeleteFileDialogResult} from './dialogs/typing';
import {OrderCreateDTO} from './models/OrderCreateDTO';
import {SubOrderDTO} from './models/SubOrderDTO';
import {PrintTypeEnum} from './models/PrintTypeEnum';
import {Price} from './models/Price';
import {Cost} from './models/Cost';


@Component({
    selector: 'order-page',
    templateUrl: './order.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'order-page',
    },
    imports: [SharedModule, OrderFilesComponent, OrderSummaryComponent],
    standalone: true,
})
export class OrderComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;
    // labels
    readonly orderTitleLabel = ORDER_TITLE_LABEL;
    readonly locationTitleLabel = ORDER_LOCATION_TITLE_LABEL;
    readonly availableLabel = ORDER_LOCATION_AVAILABLE_LABEL;
    readonly availableSheetsLabel = ORDER_LOCATION_AVAILABLE_SHEETS_LABEL;
    readonly sheetsLabel = ORDER_LOCATION_SHEETS_LABEL;

    loading: boolean;
    loadingFile: boolean;
    submittedOrder: boolean;
    printerId: string;
    printer: PrinterDTOView;
    fileList: Array<FileDTOView>;
    settingsFormArray: FormArray<FormGroup> = new FormArray([]);
    price: Price;
    cost: Cost;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private cd: ChangeDetectorRef,
                private destroyRef: DestroyRef,
                private dialog: MatDialog,
                private printerService: PrinterService,
                private filesService: FilesService,
                private orderService: OrderService) {
        if (environment.log.debug) {
            console.log('[OrderComponent] constructor loaded');
        }
    }

    ngOnInit() {
        this.route.params.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: (params: Params) => {
                this.printerId = params[ROUTE_PRINTER_ID];
                this.loadPrinterInfo(this.printerId);
            }
        });
    }

    ngOnDestroy() {
    }

    loadPrinterInfo(id: string) {
        this.loading = true;
        this.cd.markForCheck();
        const done = () => {
            this.loading = false;
            this.cd.markForCheck();
        };

        this.printerService.getPrinterInfo(id).pipe(
            take(1),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: (r) => {
                this.printer = mapPrinter(r);
                this.price = this.setPrices();
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

    createSettingsForm(file: FileDTOView) {
        const form = new FormGroup({
            [FORM_ID]: new FormControl(file.id),
            [PRINT_TYPE]: new FormControl(false),
            [COPIES_COUNT]: new FormControl(file.$copiesCount),
        });
        this.settingsFormArray.push(form);
    }

    onFileUploaded(file: File) {
        this.loadingFile = true;
        this.cd.markForCheck();
        const done = () => {
            this.loadingFile = false;
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
                this.cost = this.calculateCost();
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

    onFileDeleted(index: number) {
        const dialogRef = this.dialog.open<
            DeleteFileDialogComponent,
            DeleteFileDialogOptions,
            DeleteFileDialogResult
        >(DeleteFileDialogComponent, {data: {s3key: this.fileList[index].s3key}});

        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                return;
            }
            this.fileList = this.fileList.filter((_, i) => i !== index);
            this.settingsFormArray.removeAt(index);
            this.cost = this.calculateCost();
            this.cd.markForCheck();
        });
    }

    onFileChanged() {
        this.cost = this.calculateCost();
        this.cd.markForCheck();
    }

    onOrderCreated() {
        if (!(this.fileList?.length)) {
            // todo show some notify
            return;
        }
        this.submittedOrder = true;
        this.cd.markForCheck();
        const done = () => {
            this.submittedOrder = false;
            this.cd.markForCheck();
        };
        const subOrdersArray = this.buildSubOrdersArray(this.fileList);
        const model: OrderCreateDTO = {
            printerId: this.printerId,
            subOrders: subOrdersArray
        }
        this.orderService.createOrder(model).pipe(
            switchMap(order => {
                if (!order) {
                    return EMPTY;
                }
                return this.orderService.getPaymentForm(order.id);
            }),
            take(1),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe({
            next: (htmlFormString) => {
                const formContainer = document.createElement('div');
                formContainer.innerHTML = htmlFormString;

                const form = formContainer.querySelector('form');
                if (form) {
                    document.body.appendChild(form);
                    form.submit();
                } else {
                    console.error('Payment form is invalid.');
                }
                done();
            },
            error: (err) => {
                if (environment.log.error) {
                    console.error(err);
                }
                // todo show some notify
                done();
            }
        });
    }

    buildSubOrdersArray(fileArray: Array<FileDTOView>): Array<SubOrderDTO> {
        return (fileArray || []).map(x => ({
            fileId: x.id,
            copiesCount: x.$copiesCount,
            printType: x.$printType
        }));
    }

    calculateCost(): Cost | null {
        if (!this.printer || !this.fileList?.length) {
            return null;
        }
        const {serviceFee, priceOneSide, priceDuplex} = this.printer || {};
        let singleCount = 0;
        let doubleCount = 0;
        let totalPrice = 0;

        for (const file of this.fileList) {
            const {pagesCount, $copiesCount, $printType} = file;
            const isSingleSided = $printType === PrintTypeEnum.ONE_SIDED;
            const pageCount = isSingleSided
                ? pagesCount * $copiesCount
                : Math.ceil(pagesCount / 2) * $copiesCount;

            if (isSingleSided) {
                singleCount += pageCount;
                totalPrice += pageCount * priceOneSide;
            } else {
                doubleCount += pageCount;
                totalPrice += pageCount * priceDuplex;
            }
        }
        return {
            singleCount: singleCount,
            doubleCount: doubleCount,
            totalCost: totalPrice + serviceFee,
        }
    }

    setPrices(): Price {
        const {serviceFee, priceOneSide, priceDuplex} = this.printer || {};
        return {
            serviceFee: serviceFee,
            singlePrice: priceOneSide,
            doublePrice: priceDuplex,
        }
    }
}
