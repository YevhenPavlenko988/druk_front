import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {environment} from '../../../environments/environment';
import {STEPS_DETAILS} from '../consts';
import {SharedModule} from '../../shared.module';
import {StepsEnum} from './StepsEnum';
import {Step} from './Step';
import {StepService} from './step.service';


@Component({
    selector: 'steps',
    templateUrl: 'steps.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'pg-steps',
    },
    imports: [SharedModule],
    standalone: true,
})
export class StepsComponent implements OnInit, OnDestroy {
    readonly env = environment;
    readonly steps: Array<Step> = STEPS_DETAILS;

    stepType: StepsEnum;

    get isPayment() {
        return this.stepType === StepsEnum.payment;
    }

    get isPrinting() {
        return this.stepType === StepsEnum.printing;
    }

    constructor(private destroyRef: DestroyRef,
                private cd: ChangeDetectorRef,
                private stepService: StepService) {
        if (environment.log.debug) {
            console.log('[StepsComponent] constructor loaded');
        }
    }

    ngOnInit() {
        this.stepService.stepTypeEvent.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(r => {
            this.stepType = r;
            this.cd.markForCheck();
        });
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
