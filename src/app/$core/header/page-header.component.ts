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
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {environment} from '../../../environments/environment';
import {HEADER_STEP_LABEL, STEPS_COUNT, STEPS_DETAILS} from '../consts';
import {SharedModule} from '../../shared.module';
import {StepService} from '../steps/step.service';
import {StepsComponent} from '../steps/steps.component';
import {StepsEnum} from '../steps/StepsEnum';
import {Step} from '../steps/Step';
import {ICONS} from '../icons';


@Component({
    selector: 'pg-header',
    templateUrl: 'page-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'pg-header',
    },
    imports: [SharedModule, StepsComponent],
    standalone: true,
})
export class PageHeaderComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;
    readonly env = environment;
    readonly totalSteps = STEPS_COUNT;

    readonly stepLabel = HEADER_STEP_LABEL;

    isTablet: boolean;
    step: Step;
    stepType: StepsEnum;

    constructor(private breakpointObserver: BreakpointObserver,
                private destroyRef: DestroyRef,
                private cd: ChangeDetectorRef,
                private stepService: StepService) {
        if (environment.log.debug) {
            console.log('PageHeaderComponent constructor invoked.');
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

        this.stepService.stepTypeEvent.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe(r => {
            this.stepType = r;
            this.step = STEPS_DETAILS.find(x => x.code == this.stepType);
            this.cd.markForCheck();
        });
    }

    ngOnDestroy() {
    }
}
