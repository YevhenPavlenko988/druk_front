import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of, tap} from 'rxjs';
import {joinUrl} from './utils/joinUrl';
import {environment} from '../../environments/environment';
import {PrinterDTO} from './models/PrinterDTO';
import {PrinterListDTO} from './models/PrinterListDTO';
import {IdDTO} from './models/IdDTO';


// API
export const API_URL_PRINTER_LIST: string = '/printer/list';
export const API_URL_PRINTER_BY_ID: string = '/printer/info-by-id';


const printerList: PrinterListDTO = {
    printersList: [
        {
            id: 'fd5b113f-84fe-4fc8-b43d-bd7596c49eb2',
            createdAt: '2025-04-18T15:59:43.410132',
            updatedAt: '2025-04-26T19:43:36.178162',
            name: 'Test printer',
            ip: '192.168.1.103',
            url: 'www.test.printer.com',
            paperLeft: 0,
            paperMax: 2600,
            address: 'Кіїв, вул. Вулиця, буд 1',
            latitude: 700,
            longitude: 800,
            isActive: true,
            isOnline: true,
            photoUrl: 'www.photo.url',
            model: 'testModel',
            serialNumber: 'testSN',
            note: 'note',
            schedule: '24/7',
            priceOneSide: 5,
            priceDuplex: 7,
            serviceFee: 3
        },
    ]
};


@Injectable({providedIn: 'root'})
export class PrinterService {

    constructor(private http: HttpClient) {
        if (environment.log.debug) {
            console.log('[PrintersService] constructor loaded');
        }
    }

    getPrinterList(): Observable<Array<PrinterDTO>> {
        // return of(printerList.printersList);

        const url: string = joinUrl(environment.apiUrl, API_URL_PRINTER_LIST);
        if (environment.log.debug) {
            console.log(`GET ${url}`);
        }
        return this.http.get(url).pipe(
            tap({
                next: (resp: any) => {
                    if (environment.log.debug) {
                        console.log(`RESULT GET: ${url}`, resp);
                    }
                },
                error: (err: any) => {
                    if (environment.log.error) {
                        console.error(`RESULT GET: ${url} Error: `, err);
                    }
                },
            }),
            map((r: PrinterListDTO) => r?.printersList),
        );
    }

    getPrinterInfo(printerId: string): Observable<PrinterDTO> {
        const url: string = joinUrl(environment.apiUrl, API_URL_PRINTER_BY_ID);
        const request: IdDTO = {
            id: printerId,
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
}
