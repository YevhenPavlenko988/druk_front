import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {APP_ROUTES} from '../../../app.routes';
import {SharedModule} from '../../../shared.module';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {StepsComponent} from '../../steps/steps.component';
import {ICONS} from '../../icons';


@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'layout-navbar',
    },
    imports: [SharedModule, StepsComponent],
    standalone: true,
})
export class NavbarComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;

    lang = 'Eng';
    isTablet: boolean;

    constructor(private breakpointObserver: BreakpointObserver,
                private router: Router,
                private cd: ChangeDetectorRef) {
        if (environment.log.debug) {
            console.log('NavbarComponent constructor invoked.');
        }
    }

    ngOnInit() {
        this.breakpointObserver
            .observe(['(max-width: 992px)'])
            .subscribe((state: BreakpointState) => {
                if (state.matches) {
                    this.isTablet = true;
                    this.cd.markForCheck();
                } else {
                    this.isTablet = false;
                    this.cd.markForCheck();
                }
            });
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
