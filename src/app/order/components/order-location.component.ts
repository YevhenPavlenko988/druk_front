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
import {take} from 'rxjs';
import {environment} from '../../../environments/environment';
import {SharedModule} from '../../shared.module';
import {ICONS} from '../../$core/icons';
import {PrintersService} from '../services/printers.service';
import {PrinterDTO} from '../models/PrinterDTO';
import {
    ORDER_LOCATION_AVAILABLE_SHEETS_LABEL,
    ORDER_LOCATION_AVAILABLE_UNTIL_LABEL,
    ORDER_LOCATION_SHEETS_LABEL,
    ORDER_LOCATION_TITLE_LABEL,
} from '../labels';


@Component({
    selector: 'order-location',
    templateUrl: './order-location.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'order-location',
    },
    imports: [SharedModule],
    standalone: true,
})
export class OrderLocationComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;
    //
    readonly orderLocationTitleLabel = ORDER_LOCATION_TITLE_LABEL;
    readonly availableUntilLabel = ORDER_LOCATION_AVAILABLE_UNTIL_LABEL;
    readonly availableSheetsLabel = ORDER_LOCATION_AVAILABLE_SHEETS_LABEL;
    readonly sheetsLabel = ORDER_LOCATION_SHEETS_LABEL;

    loading: boolean | undefined;
    printerList: Array<PrinterDTO>;
    currentPrinter: PrinterDTO;

    constructor(private destroyRef: DestroyRef,
                private cd: ChangeDetectorRef,
                private printerService: PrintersService) {
        if (environment.log.debug) {
            console.log('[OrderLocationComponent] constructor loaded');
        }
    }

    ngOnInit() {
        this.loadPrinters();
    }

    ngOnDestroy() {
    }

    loadPrinters() {
        this.loading = true;
        this.cd.markForCheck();
        const done = () => {
            this.loading = false;
            this.cd.markForCheck();
        };
        this.printerService.getPrinterList().pipe(
            take(1),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: (r) => {
                this.printerList = r;
                done();
            },
            error: (err) => {
                if (environment.log.error) {
                    console.error(err);
                }
                done();
            },
        });
    }

    setCurrentPrinter(printer: PrinterDTO) {
        this.currentPrinter = printer;
        this.cd.markForCheck();
    }
}
