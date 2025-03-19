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
import {APP_ROUTES} from '../app.routes';
import {environment} from '../../environments/environment';
import {ICONS} from '../$core/icons';
import {HOME_TITLE_LABEL} from './labels';


@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'home-page',
    },
    imports: [SharedModule],
    standalone: true,
})
export class HomeComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;
    //
    readonly btnLabel = HOME_TITLE_LABEL;

    constructor(private router: Router,
                private cd: ChangeDetectorRef) {
        if (environment.log.debug) {
            console.log('HomeComponent constructor invoked.');
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    onBtnClick() {
        this.router.navigate([APP_ROUTES.order.path])
            .catch((err: any) => {
                if (environment.log.error) {
                    console.error(err);
                }
                this.cd.markForCheck();
            });
    }
}
