import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {environment} from '../../../environments/environment';


export const defaultConfig: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
}

@Injectable({providedIn: 'root'})
export class NotifyService {

    constructor(private snackBar: MatSnackBar) {
        if (environment.log.debug) {
            console.log('[NotifyService] constructor loaded');
        }
    }

    error(message: string,): void {
        const config = {
            ...defaultConfig,
            panelClass: ['notify', 'error'],
        };
        this.snackBar.open(message, null, config);
    }

    success(message: string): void {
        const config = {
            ...defaultConfig,
            panelClass: ['notify', 'success'],
        };
        this.snackBar.open(message, null, config);
    }
}
