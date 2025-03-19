import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'layout',
    },
})
export class LayoutComponent implements OnInit, OnDestroy {

    constructor() {
        if (environment.log.debug) {
            console.log('LayoutComponent constructor invoked.');
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
