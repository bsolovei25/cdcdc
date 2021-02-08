import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApsStructureIdComponent } from './aps-structure-id.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [ApsStructureIdComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, MatTooltipModule],
})
export class ApsStructureIdModule {
    enterComponent = ApsStructureIdComponent;
}
