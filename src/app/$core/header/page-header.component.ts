import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HEADER_TITLE_LABEL, STEPS_DETAILS} from '../consts';
import {SharedModule} from '../../shared.module';
import {StepsEnum} from './StepsEnum';
import {Step} from './Step';
import {ICONS} from '../icons';


@Component({
    selector: 'pg-header',
    templateUrl: 'page-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'pg-header',
    },
    imports: [SharedModule],
    standalone: true,
})
export class PageHeaderComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;

    readonly titleLabel = HEADER_TITLE_LABEL;

    readonly env = environment;
    readonly steps: Array<Step> = STEPS_DETAILS;

    @Input() step: StepsEnum = StepsEnum.adding;

    get isPayment() {
        return this.step === StepsEnum.payment;
    }

    get isPrinting() {
        return this.step === StepsEnum.printing;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    isCompleted(code: StepsEnum): boolean {
        return (
            (code === StepsEnum.adding && (this.isPayment || this.isPrinting)) ||
            (code === StepsEnum.payment && this.isPrinting)
        );
    }
}
