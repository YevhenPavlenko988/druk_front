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
import {environment} from '../../../../environments/environment';
import {SharedModule} from '../../../shared.module';
import {PrintersService} from '../../services/printers.service';
import {mapPrinter} from '../../transform/mapPrinter';
import {
    ORDER_LOCATION_AVAILABLE_SHEETS_LABEL,
    ORDER_LOCATION_AVAILABLE_LABEL,
    ORDER_LOCATION_SHEETS_LABEL,
    ORDER_LOCATION_TITLE_LABEL,
} from '../../labels';
import {PrinterDTOView} from '../../models/PrinterDTOView';
import {ICONS} from '../../../$core/icons';


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
    readonly locationTitleLabel = ORDER_LOCATION_TITLE_LABEL;
    readonly availableLabel = ORDER_LOCATION_AVAILABLE_LABEL;
    readonly availableSheetsLabel = ORDER_LOCATION_AVAILABLE_SHEETS_LABEL;
    readonly sheetsLabel = ORDER_LOCATION_SHEETS_LABEL;

    loading: boolean | undefined;
    printerList: Array<PrinterDTOView>;
    currentPrinter: PrinterDTOView;

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
                this.printerList = r?.map(x => mapPrinter(x));
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

    setCurrentPrinter(printer: PrinterDTOView) {
        this.currentPrinter = printer;
        this.cd.markForCheck();
    }
}
