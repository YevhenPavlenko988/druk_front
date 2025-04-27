import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {TranslateModule} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {SVG_ICONS} from './$core/consts';
import {ReactiveFormsModule} from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const modules = [
    // Angular modules
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,

    // Component modules
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
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
