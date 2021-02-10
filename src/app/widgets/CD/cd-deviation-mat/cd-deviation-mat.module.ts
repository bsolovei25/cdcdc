import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdDeviationMatComponent } from './cd-deviation-mat.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [CdDeviationMatComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, MatCheckboxModule, FormsModule],
})
export class CdDeviationMatModule {
    enterComponent = CdDeviationMatComponent;
}
