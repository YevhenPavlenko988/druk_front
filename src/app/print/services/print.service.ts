import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {joinUrl} from '../../$core/utils/joinUrl';
import {environment} from '../../../environments/environment';
import {PrintRequestDTO} from '../models/PrintRequestDTO';

// API
export const API_URL_PRINT_ORDER: string = '/print/order';

@Injectable({providedIn: 'root'})
export class PrintService {

    constructor(private http: HttpClient) {
        if (environment.log.debug) {
            console.log('[PrintService] constructor loaded');
        }
    }

    printOrder(model: PrintRequestDTO): Observable<string> {
        const url: string = joinUrl(environment.apiUrl, API_URL_PRINT_ORDER);
        if (environment.log.debug) {
            console.log(`POST ${url}`, model);
        }
        return this.http.post(url, model, {responseType: 'text'}).pipe(
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
