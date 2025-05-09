import {Routes} from '@angular/router';
import {ROUTE_PRINTER_ID} from './order/consts';
import {ROUTE_ORDER_ID} from './print/consts';

export const APP_ROUTES = {
    home: {path: '', url: ''},
    order: {path: 'order', url: 'order'},
    print: {path: 'print', url: 'print'},
};


export const routes: Routes = [
    {
        path: APP_ROUTES.home.path,
        loadComponent: () => import('./home/home.component').then(x => x.HomeComponent),
    },
    {
        path: `${APP_ROUTES.order.path}/:${ROUTE_PRINTER_ID}`,
        loadComponent: () => import('./order/order.component').then(x => x.OrderComponent),
    },
    {
        path: `${APP_ROUTES.print.path}/:${ROUTE_ORDER_ID}`,
        loadComponent: () => import('./print/print.component').then(x => x.PrintComponent),
    },
    {
        path: '**',
        data: {page404: true},
        loadComponent: () => import('./not-found/not-found.component').then(x => x.NotFoundComponent)
    }
];
