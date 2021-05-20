import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcWidgetConventionalFuelComponent } from './ec-widget-conventional-fuel.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EcWidgetMultiChartComponent } from './components/ec-widget-multi-chart/ec-widget-multi-chart.component';
import { SharedModule } from '@shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { EcWidgetBigPlanningChartComponent } from './components/ec-widget-big-planning-chart/ec-widget-big-planning-chart.component';
import { EcWidgetSharedModule } from '../ec-widget-shared/ec-widget-shared.module';
import { EcWidgetSelectComponent } from './components/ec-widget-select/ec-widget-select.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        EcWidgetConventionalFuelComponent,
        EcWidgetMultiChartComponent,
        EcWidgetBigPlanningChartComponent,
        EcWidgetSelectComponent,
    ],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        SharedModule,
        MatFormFieldModule,
        MatSelectModule,
        MatRippleModule,
        EcWidgetSharedModule,

        ReactiveFormsModule,
    ],
    exports: [EcWidgetSelectComponent],
})
export class EcWidgetConventionalFuelModule {
    enterComponent = EcWidgetConventionalFuelComponent;
}
