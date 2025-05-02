import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {joinUrl} from '../../$core/utils/joinUrl';
import {environment} from '../../../environments/environment';
import {OrderCreateDTO} from '../models/OrderCreateDTO';
import {OrderInfoDTO} from '../models/OrderInfoDTO';
import {IdDTO} from '../../$core/models/IdDTO';

// API
export const API_URL_ORDER_CREATE: string = '/order/create';
export const API_URL_PAYMENT_FORM: string = '/payment/form';


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

    getPaymentForm(orderId: string): Observable<any> {
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
