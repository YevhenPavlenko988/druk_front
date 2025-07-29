import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {StepsEnum} from './StepsEnum';


@Injectable({providedIn: 'root'})
export class StepService {

    readonly stepTypeEvent = new BehaviorSubject<StepsEnum>(null);

    constructor() {
        if (environment.log.debug) {
            console.log('[StepService] constructor loaded');
        }
    }

    reset() {
        this.stepTypeEvent.next(null);
    }
}
