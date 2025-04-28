import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {
    ORDER_SUMMARY_BLACK_LABEL,
    ORDER_SUMMARY_COMMISSION_LABEL,
    ORDER_SUMMARY_CREATE_BTN_LABEL,
    ORDER_SUMMARY_TITLE_LABEL,
    ORDER_SUMMARY_TOTAL_LABEL,
} from '../../labels';
import {SharedModule} from '../../../shared.module';
import {ICONS} from '../../../$core/icons';


@Component({
    selector: 'order-summary',
    templateUrl: './order-summary.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'order-summary',
    },
    imports: [SharedModule],
    standalone: true,
})
export class OrderSummaryComponent implements OnInit, OnDestroy {
    readonly ICONS = ICONS;
    //
    readonly summaryTitleLabel = ORDER_SUMMARY_TITLE_LABEL;
    readonly blackLabel = ORDER_SUMMARY_BLACK_LABEL;
    readonly commissionLabel = ORDER_SUMMARY_COMMISSION_LABEL;
    readonly totalLabel = ORDER_SUMMARY_TOTAL_LABEL;
    readonly btnCreateOrderLabel = ORDER_SUMMARY_CREATE_BTN_LABEL;

    loading: boolean;
    // @Input({transform: booleanAttribute}) loading: boolean;

    get isDisabled(): boolean {
        return true;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    onCreateOrder() {
        // block add file when pressed
    }
}
