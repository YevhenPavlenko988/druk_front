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
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {take} from 'rxjs';
import {SharedModule} from '../shared.module';
import {PrinterService} from '../$core/printer.service';
import {PrinterLocationComponent} from './components/location/printer-location.component';
import {mapPrinter} from '../$core/transform/mapPrinter';
import {environment} from '../../environments/environment';
import {ICONS} from '../$core/icons';
import {PrinterDTOView} from '../$core/models/PrinterDTOView';


@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'home-page',
    },
    imports: [SharedModule, PrinterLocationComponent],
    standalone: true,
})
export class HomeComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;
    //

    loading: boolean;
    printerList: Array<PrinterDTOView>;

    constructor(private router: Router,
                private cd: ChangeDetectorRef,
                private destroyRef: DestroyRef,
                private printerService: PrinterService) {
        if (environment.log.debug) {
            console.log('HomeComponent constructor invoked.');
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
}
