import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdReactorParametersComponent } from './cd-reactor-parameters.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [CdReactorParametersComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, MatCheckboxModule, FormsModule, MatTooltipModule],
})
export class CdReactorParametersModule {
    enterComponent = CdReactorParametersComponent;
}
