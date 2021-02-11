import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviationsTableComponent } from './deviations-table.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [DeviationsTableComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class DeviationsTableModule {
    enterComponent = DeviationsTableComponent;
}
