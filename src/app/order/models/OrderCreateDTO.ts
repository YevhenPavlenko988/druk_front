import {SubOrderDTO} from './SubOrderDTO';

export interface OrderCreateDTO {
    printerId?: string,
    subOrders?: Array<SubOrderDTO>
}
