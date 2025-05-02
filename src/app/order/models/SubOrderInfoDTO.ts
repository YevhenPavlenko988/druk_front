import {OrderTypeEnum} from './OrderTypeEnum';
import {PrintTypeEnum} from './PrintTypeEnum';
import {OrderStatusEnum} from './OrderStatusEnum';
import {PaymentStatusEnum} from './PaymentStatusEnum';

export interface SubOrderInfoDTO {
    id?: string,
    createdAt?: string,
    updatedAt?: string,
    parentId?: number, // what for? why number?
    orderNumber?: string,
    orderType?: OrderTypeEnum,
    printerId?: string,
    fileUrl?: string,
    fileId?: string,
    pagesCount?: number,
    copiesCount?: number,
    paperUsed?: number,
    printType?: PrintTypeEnum,
    price?: number,
    serviceFee?: number,
    totalPrice?: number,
    orderStatus?: OrderStatusEnum,
    paymentStatus?: PaymentStatusEnum,
}
