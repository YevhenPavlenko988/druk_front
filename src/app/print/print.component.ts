import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {take} from 'rxjs';
import {environment} from '../../environments/environment';
import {APP_ROUTES} from '../app.routes';
import {COMMON_ERROR_LABEL} from '../$core/consts';
import {ROUTE_ORDER_ID} from './consts';
import {
    PRINT_FAIL_BTN_AGAIN_LABEL,
    PRINT_FAIL_BTN_BACK_LABEL,
    PRINT_FAIL_TEXT_LABEL,
    PRINT_FAIL_TITLE_LABEL,
    PRINT_PRINTING_BTN_MORE_LABEL,
    PRINT_PRINTING_TEXT_LABEL,
    PRINT_PRINTING_TITLE_LABEL,
    PRINT_SUCCESS_BTN_PRINT_LABEL,
    PRINT_SUCCESS_TEXT_LABEL,
    PRINT_SUCCESS_TITLE_LABEL
} from './labels';
import {SharedModule} from '../shared.module';
import {PageHeaderComponent} from '../$core/header/page-header.component';
import {NotifyService} from '../$core/services/notify.service';
import {OrderService} from '../order/services/order.service';
import {PrintService} from './services/print.service';
import {OrderMainInfoDTO} from '../order/models/OrderMainInfoDTO';
import {PrintRequestDTO} from './models/PrintRequestDTO';
import {PaymentStatusEnum} from '../order/models/PaymentStatusEnum';
import {StepsEnum} from '../$core/header/StepsEnum';
import {ICONS} from '../$core/icons';


@Component({
    selector: 'print-page',
    templateUrl: 'print.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'print-page',
    },
    imports: [SharedModule, PageHeaderComponent],
    standalone: true,
})
export class PrintComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;
    //
    readonly successTitleLabel = PRINT_SUCCESS_TITLE_LABEL;
    readonly successTextLabel = PRINT_SUCCESS_TEXT_LABEL;
    readonly btnPrintLabel = PRINT_SUCCESS_BTN_PRINT_LABEL;
    readonly failTitleLabel = PRINT_FAIL_TITLE_LABEL;
    readonly failTextLabel = PRINT_FAIL_TEXT_LABEL;
    readonly btnAgainLabel = PRINT_FAIL_BTN_AGAIN_LABEL;
    readonly btnBackLabel = PRINT_FAIL_BTN_BACK_LABEL;
    readonly printingTitleLabel = PRINT_PRINTING_TITLE_LABEL;
    readonly printingTextLabel = PRINT_PRINTING_TEXT_LABEL;
    readonly btnMoreLabel = PRINT_PRINTING_BTN_MORE_LABEL;

    readonly env = environment;

    loading: boolean;
    submitted: boolean;
    order: OrderMainInfoDTO;
    step: StepsEnum = StepsEnum.payment;

    get isDisabled(): boolean {
        return this.loading || this.submitted;
    }

    get isSuccess(): boolean {
        return this.order?.paymentStatus === PaymentStatusEnum.success;
    }

    constructor(private route: ActivatedRoute,
                private router: Router,
                private cd: ChangeDetectorRef,
                private destroyRef: DestroyRef,
                private notify: NotifyService,
                private orderService: OrderService,
                private printService: PrintService,) {
        if (environment.log.debug) {
            console.log('[PrintComponent] constructor loaded');
        }
    }

    ngOnInit() {
        this.route.params.pipe(
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: (params: Params) => {
                this.loadOrderInfo(params[ROUTE_ORDER_ID]);
            }
        });
    }

    ngOnDestroy() {
    }

    loadOrderInfo(id: string) {
        this.loading = true;
        this.cd.markForCheck();
        const done = () => {
            this.loading = false;
            this.cd.markForCheck();
        };

        this.orderService.getOrderInfo(id).pipe(
            take(1),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: (r) => {
                this.order = r || {};
                done();
            },
            error: (err) => {
                if (environment.log.error) {
                    console.error(err);
                }
                this.notify.error(COMMON_ERROR_LABEL);
                done();
            },
        });
    }

    onPrintOrder() {
        this.submitted = true;
        this.cd.markForCheck();
        const done = () => {
            this.submitted = false;
            this.cd.markForCheck();
        };

        const model: PrintRequestDTO = {
            orderId: this.order.id,
            printerId: this.order.printerId
        };
        this.printService.printOrder(model).pipe(
            take(1),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: (r) => {
                // todo show some notify
                this.step = StepsEnum.printing;
                done();
            },
            error: (err) => {
                if (environment.log.error) {
                    console.error(err);
                }
                this.notify.error(COMMON_ERROR_LABEL);
                done();
            },
        });
    }

    onPayAgain() {
        this.submitted = true;
        this.cd.markForCheck();
        const done = () => {
            this.submitted = false;
            this.cd.markForCheck();
        };

        this.orderService.getPaymentForm(this.order.id).pipe(
            take(1),
            takeUntilDestroyed(this.destroyRef),
        ).subscribe({
            next: (htmlFormString) => {
                const formContainer = document.createElement('div');
                formContainer.innerHTML = htmlFormString;

                const form = formContainer.querySelector('form');
                if (form) {
                    document.body.appendChild(form);
                    form.submit();
                } else {
                    console.error('Payment form is invalid.');
                }
                done();
            },
            error: (err) => {
                if (environment.log.error) {
                    console.error(err);
                }
                this.notify.error(COMMON_ERROR_LABEL);
                done();
            },
        });
    }

    goToOrder() {
        if (environment.log.debug) {
            console.log('open order page: ', this.order.printerId);
        }

        this.router.navigate([
            APP_ROUTES.order.url,
            this.order.printerId,
        ]).catch((err: any) => {
            if (environment.log.error) {
                console.error(err);
            }
            this.notify.error(COMMON_ERROR_LABEL);
            this.cd.markForCheck();
        });
    }
}
