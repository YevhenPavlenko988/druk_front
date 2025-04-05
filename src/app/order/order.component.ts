import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {Router} from '@angular/router';
import {SharedModule} from '../shared.module';
import {ICONS} from '../$core/icons';
import {OrderLocationComponent} from './components/location/order-location.component';
import {ORDER_TITLE_LABEL} from './labels';
import {environment} from '../../environments/environment';


@Component({
    selector: 'order-page',
    templateUrl: './order.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'order-page',
    },
    imports: [SharedModule, OrderLocationComponent],
    standalone: true,
})
export class OrderComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;
    //
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
