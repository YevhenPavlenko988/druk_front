import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {ICONS} from '../../icons';
import {SharedModule} from '../../../shared.module';
import {environment} from '../../../../environments/environment';
import {FOOTER_POLICY_LABEL, FOOTER_TERMS_LABEL} from '../labels';

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'layout-footer',
    },
    imports: [SharedModule],
    standalone: true,
})
export class FooterComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;
    //
    readonly termsLabel = FOOTER_TERMS_LABEL;
    readonly policyLabel = FOOTER_POLICY_LABEL;

    constructor() {
        if (environment.log.debug) {
            console.log('FooterComponent constructor invoked.');
        }
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
