import {
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewEncapsulation,
} from '@angular/core';
import {SharedModule} from '../../../shared.module';
import {
    ORDER_SUMMARY_COMMISSION_LABEL,
    ORDER_SUMMARY_CREATE_BTN_LABEL,
    ORDER_SUMMARY_DOUBLE_LABEL,
    ORDER_SUMMARY_SINGLE_LABEL,
    ORDER_SUMMARY_TITLE_LABEL,
    ORDER_SUMMARY_TOTAL_LABEL,
} from '../../labels';
import {DECIMAL_PATTERN} from '../../consts';
import {ICONS} from '../../../$core/icons';
import {Price} from '../../models/Price';
import {Cost} from '../../models/Cost';


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
    readonly singleLabel = ORDER_SUMMARY_SINGLE_LABEL;
    readonly doubleLabel = ORDER_SUMMARY_DOUBLE_LABEL;
    readonly commissionLabel = ORDER_SUMMARY_COMMISSION_LABEL;
    readonly totalLabel = ORDER_SUMMARY_TOTAL_LABEL;
    readonly btnCreateOrderLabel = ORDER_SUMMARY_CREATE_BTN_LABEL;

    @Input({transform: booleanAttribute}) submitted: boolean;
    @Input() price: Price;
    @Input() cost: Cost;
    @Output() createOrder = new EventEmitter();

    decimalPattern = DECIMAL_PATTERN;

    get isDisabled(): boolean {
        return this.submitted;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    onCreateOrder() {
        // block add file when pressed
        this.createOrder.emit();
    }
}
