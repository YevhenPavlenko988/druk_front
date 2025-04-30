import {Params} from '@angular/router';
import {ReplaySubject} from 'rxjs';


export class TestActivatedRoute {
    readonly params = new ReplaySubject<Params>();
    readonly queryParams = new ReplaySubject<Params>();

    snapshot = {
        params: {},
        queryParams: {},
    };

    root = {
        snapshot: {
            params: {},
            queryParams: {},
        },
    };

    setParams(params: Params = {}) {
        this.params.next(params);
        this.snapshot.params = params || {};
    }

    setQueryParams(queryParams: Params = {}) {
        this.queryParams.next(queryParams);
        this.snapshot.queryParams = queryParams || {};
    }
}
