import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {SharedModule} from '../shared.module';
import {OrderLocationComponent} from './components/location/order-location.component';
import {OrderFilesComponent} from './components/files/order-files.component';
import {ORDER_TITLE_LABEL} from './labels';
import {ICONS} from '../$core/icons';

@Component({
    selector: 'order-page',
    templateUrl: './order.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'order-page',
    },
    imports: [SharedModule, OrderLocationComponent, OrderFilesComponent],
    standalone: true,
})
export class OrderComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;
    // labels
    readonly orderTitleLabel = ORDER_TITLE_LABEL;

    constructor(private router: Router,
                private cd: ChangeDetectorRef) {
        if (environment.log.debug) {
            console.log('[OrderComponent] constructor loaded');
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
