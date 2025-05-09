import {OrderStatusEnum} from './OrderStatusEnum';
import {PaymentStatusEnum} from './PaymentStatusEnum';

export interface OrderMainInfoDTO {
    id?: string,
    createdAt?: string,
    updatedAt?: string,
    orderNumber?: string,
    printerId?: string,
    totalPagesCount?: number,
    totalPrice?: number,
    orderStatus?: OrderStatusEnum,
    paymentStatus?: PaymentStatusEnum,
}
