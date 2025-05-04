import {Routes} from '@angular/router';
import {ROUTE_PRINTER_ID} from './order/consts';

export const APP_ROUTES = {
    home: {path: '', url: ''},
    order: {path: 'order', url: 'order'},
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
        path: '**',
        data: {page404: true},
        loadComponent: () => import('./not-found/not-found.component').then(x => x.NotFoundComponent)
    }
];
