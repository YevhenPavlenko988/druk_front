import {
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {Router} from '@angular/router';
import {SharedModule} from '../../../shared.module';
import {APP_ROUTES} from '../../../app.routes';
import {environment} from '../../../../environments/environment';
import {ICONS} from '../../../$core/icons';
import {PrinterDTOView} from '../../../$core/models/PrinterDTOView';


@Component({
    selector: 'printer-location',
    templateUrl: './printer-location.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'printer-location',
    },
    imports: [SharedModule],
    standalone: true,
})
export class PrinterLocationComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;

    @Input({transform: booleanAttribute}) loading: boolean;
    @Input() printers: Array<PrinterDTOView>;


    constructor(private router: Router,
                private cd: ChangeDetectorRef) {
        if (environment.log.debug) {
            console.log('[PrinterLocationComponent] constructor loaded');
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    goToOrder(printerId: string) {
        if (environment.log.debug) {
            console.log('open order page: ', printerId);
        }

        this.router.navigate([
            APP_ROUTES.order.url,
            printerId,
        ]).catch((err: any) => {
            if (environment.log.error) {
                console.error(err);
            }
            // todo show some notify
            this.cd.markForCheck();
        });
    }
}
