import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {SharedModule} from '../../../shared.module';
import {environment} from '../../../../environments/environment';
import {ICONS} from '../../icons';


@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'layout-navbar',
    },
    imports: [SharedModule],
    standalone: true,
})
export class NavbarComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;

    constructor() {
        if (environment.log.debug) {
            console.log('NavbarComponent constructor invoked.');
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}
