import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PrinterDTO} from '../models/PrinterDTO';


const printerList: Array<PrinterDTO> = [
    {
        id: '0f75c925-0652-42e9-8b8f-829435ab0c27',
        name: 'принтер 1',
        paperLeft: 167,
        paperMax: 600,
        address: 'Київ, вулиця 1, буд 4',
        latitude: 222,
        longitude: 444,
    },
    {
        id: '9a765319-ff44-491f-ba58-c67c906cf68c',
        name: 'Принтер 6',
        paperLeft: 67,
        paperMax: 500,
        address: 'Дніпро, вулиця 3, буд 454',
        latitude: 666,
        longitude: 777,
    },
    {
        id: '3a765319-ff44-491f-ba58-c67c906cf690',
        name: 'Принтер 643',
        paperLeft: 67,
        paperMax: 500,
        address: 'Дніпро, вулиця 13, буд 54',
        latitude: 666,
        longitude: 777,
    },
];

@Injectable({providedIn: 'root'})
export class PrintersService {

    constructor(private http: HttpClient) {
        if (environment.log.debug) {
            console.log('[PrintersService] constructor loaded');
        }
    }

    getPrinterList(): Observable<Array<PrinterDTO>> {
        return of(printerList);
    }
}
