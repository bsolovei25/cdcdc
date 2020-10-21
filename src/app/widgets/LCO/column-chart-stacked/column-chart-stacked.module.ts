import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnChartStackedComponent } from './column-chart-stacked.component';
import { CcsOneColumnComponent } from './ccs-one-column/ccs-one-column.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
    declarations: [CcsOneColumnComponent, ColumnChartStackedComponent],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule
    ]
})
export class ColumnChartStackedModule {
    enterComponent = ColumnChartStackedComponent;
}
