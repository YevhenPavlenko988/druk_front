import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {TranslateModule} from '@ngx-translate/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {environment} from '../environments/environment';
import {SVG_ICONS} from './$core/consts';


const modules = [
    // Angular modules
    CommonModule,
    RouterModule,
    TranslateModule,

    // Component modules
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
];

@NgModule({
    declarations: [],
    imports: [
        ...modules,
    ],
    exports: [
        ...modules,
    ],
    providers: [],
})
export class SharedModule {

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

        for (const icon of SVG_ICONS) {
            iconRegistry.addSvgIcon(icon,
                sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg?v=${environment.version}`),
            );
        }
    }
}
