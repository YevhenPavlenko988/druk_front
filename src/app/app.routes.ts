import { Routes } from '@angular/router';

export const APP_ROUTES = {
    home: {path: '', url: ''},
    order: {path: 'order', url: ''},
};


export const routes: Routes = [
    {
        path: APP_ROUTES.home.path,
        loadComponent: () => import('./home/home.component').then(x => x.HomeComponent),
    },
    {
        path: APP_ROUTES.order.path,
        loadComponent: () => import('./order/order.component').then(x => x.OrderComponent),
    },
];
