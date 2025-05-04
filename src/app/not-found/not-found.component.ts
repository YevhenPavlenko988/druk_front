import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {SharedModule} from '../shared.module';
import {environment} from '../../environments/environment';


@Component({
    selector: 'not-found-page',
    templateUrl: 'not-found.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'not-found-page',
    },
    imports: [SharedModule],
    standalone: true,
})
export class NotFoundComponent implements OnInit, OnDestroy {

    constructor() {
        if (environment.log.debug) {
            console.log('[NotFoundComponent] constructor loaded');
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
