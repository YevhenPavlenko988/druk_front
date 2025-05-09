import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {joinUrl} from '../../$core/utils/joinUrl';
import {environment} from '../../../environments/environment';
import {OrderCreateDTO} from '../models/OrderCreateDTO';
import {OrderInfoDTO} from '../models/OrderInfoDTO';
import {OrderMainInfoDTO} from '../models/OrderMainInfoDTO';
import {IdDTO} from '../../$core/models/IdDTO';
import {OrderStatusEnum} from '../models/OrderStatusEnum';
import {PaymentStatusEnum} from '../models/PaymentStatusEnum';

// API
export const API_URL_ORDER_CREATE: string = '/order/create';
export const API_URL_ORDER_INFO: string = '/order/info';
export const API_URL_PAYMENT_FORM: string = '/payment/form';


const success: OrderMainInfoDTO = {
    id: '958f9be6-bd0a-4cd1-980b-8aeb702a59a5',
    createdAt: '2025-05-07T07:29:44.161091',
    updatedAt: '2025-05-07T07:29:44.224176',
    orderNumber: '07-05-2025-Test printer-006',
    printerId: 'fd5b113f-84fe-4fc8-b43d-bd7596c49eb2',
    totalPagesCount: 4,
    totalPrice: 23,
    orderStatus: OrderStatusEnum.NEW,
    paymentStatus: PaymentStatusEnum.success
};

const fail: OrderMainInfoDTO = {
    id: '7ba1597e-3fe5-42ff-a076-60e632ae79a1',
    createdAt: '2025-05-07T07:29:44.161091',
    updatedAt: '2025-05-07T07:29:44.224176',
    orderNumber: '07-05-2025-Test printer-006',
    printerId: 'fd5b113f-84fe-4fc8-b43d-bd7596c49eb2',
    totalPagesCount: 4,
    totalPrice: 23,
    orderStatus: OrderStatusEnum.NEW,
    paymentStatus: PaymentStatusEnum.failure
};


@Injectable({providedIn: 'root'})
export class OrderService {

    constructor(private http: HttpClient) {
        if (environment.log.debug) {
            console.log('[OrderService] constructor loaded');
        }
    }

    createOrder(model: OrderCreateDTO): Observable<OrderInfoDTO> {
        const url: string = joinUrl(environment.apiUrl, API_URL_ORDER_CREATE);
        if (environment.log.debug) {
            console.log(`POST ${url}`, model);
        }
        return this.http.post(url, model).pipe(
            tap({
                next: (resp: any) => {
                    if (environment.log.debug) {
                        console.log(`RESULT POST: ${url}`, resp);
                    }
                },
                error: (err: any) => {
                    if (environment.log.error) {
                        console.error(`RESULT POST: ${url} Error: `, err);
                    }
                },
            }),
        );
    }

    getOrderInfo(orderId: string): Observable<OrderMainInfoDTO> {
        // return of(success);

        const url: string = joinUrl(environment.apiUrl, API_URL_ORDER_INFO);
        const request: IdDTO = {
            id: orderId,
        };
        if (environment.log.debug) {
            console.log(`POST ${url}`, request);
        }
        return this.http.post(url, request).pipe(
            tap({
                next: (resp: any) => {
                    if (environment.log.debug) {
                        console.log(`RESULT POST: ${url}`, resp);
                    }
                },
                error: (err: any) => {
                    if (environment.log.error) {
                        console.error(`RESULT POST: ${url} Error: `, err);
                    }
                },
            }),
        );
    }

    getPaymentForm(orderId: string): Observable<string> {
        const url: string = joinUrl(environment.apiUrl, API_URL_PAYMENT_FORM);
        const request: IdDTO = {
            id: orderId,
        };
        if (environment.log.debug) {
            console.log(`POST ${url}`, request);
        }

        return this.http.post(url, request, {responseType: 'text'}).pipe(
            tap({
                next: (resp: any) => {
                    if (environment.log.debug) {
                        console.log(`RESULT POST: ${url}`, resp);
                    }
                },
                error: (err: any) => {
                    if (environment.log.error) {
                        console.error(`RESULT POST: ${url} Error: `, err);
                    }
                },
            }),
        );
    }
}
