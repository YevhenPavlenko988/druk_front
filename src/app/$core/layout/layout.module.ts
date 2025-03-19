import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared.module';
import {LayoutComponent} from './layout.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';

@NgModule({
    declarations: [LayoutComponent],
    imports: [
        RouterModule,
        NavbarComponent,
        FooterComponent,
        SharedModule
    ],
    exports: [LayoutComponent],
    providers: []
})
export class LayoutModule {
}
