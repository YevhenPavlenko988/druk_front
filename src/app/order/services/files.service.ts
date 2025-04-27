import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {joinUrl} from '../../$core/utils/joinUrl';
import {environment} from '../../../environments/environment';
import {FileDTO} from '../models/FileDTO';


// API
export const API_URL_FILE_UPLOAD: string = '/file/upload';
export const API_URL_FILE_DELETE: string = '/file/delete';


@Injectable({providedIn: 'root'})
export class FilesService {

    constructor(private http: HttpClient) {
        if (environment.log.debug) {
            console.log('[FilesService] constructor loaded');
        }
    }

    uploadFile(file: FormData): Observable<FileDTO> {
        const url: string = joinUrl(environment.apiUrl, API_URL_FILE_UPLOAD);
        if (environment.log.debug) {
            console.log(`POST ${url}`, file);
        }
        return this.http.post(url, file).pipe(
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

    deleteFile(fileId: string): Observable<string> {
        const url: string = joinUrl(environment.apiUrl, API_URL_FILE_DELETE, fileId);
        if (environment.log.debug) {
            console.log(`POST ${url}`, fileId);
        }
        return this.http.delete(url, {responseType: 'text'}).pipe(
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
