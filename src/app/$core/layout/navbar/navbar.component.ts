import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {Router} from '@angular/router';
import {SharedModule} from '../../../shared.module';
import {environment} from '../../../../environments/environment';
import {APP_ROUTES} from '../../../app.routes';
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

    constructor(private router: Router,) {
        if (environment.log.debug) {
            console.log('NavbarComponent constructor invoked.');
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    goHome() {
        this.router.navigate([APP_ROUTES.home.url]).catch((err) => {
            if (environment.log.error) {
                console.error(err);
            }
        });
    }
}
