import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeChartsAnalyticComponent } from './kpe-charts-analytic.component';
import { SharedModule } from '@shared/shared.module';
import { KpeChartsAnalyticHeaderToggleComponent } from './components/kpe-charts-analytic-header-toggle/kpe-charts-analytic-header-toggle.component';
import { KpeChartsAnalyticHeaderSelectComponent } from './components/kpe-charts-analytic-header-select/kpe-charts-analytic-header-select.component';
import { MatSelectModule } from '@angular/material/select';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { KpeChartsAnalyticCardComponent } from './components/kpe-charts-analytic-card/kpe-charts-analytic-card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { KpeChartsAnalyticDatesPickerComponent } from './components/kpe-charts-analytic-dates-picker/kpe-charts-analytic-dates-picker.component';
import { MatNativeDateModule } from '@angular/material/core';
import { KpeChartsAnalyticMainChartComponent } from './components/kpe-charts-analytic-main-chart/kpe-charts-analytic-main-chart.component';
import { KpeSharedModule } from '../shared/kpe-shared.module';
import { KpeChartsAnalyticBarChartComponent } from './components/kpe-charts-analytic-bar-chart/kpe-charts-analytic-bar-chart.component';

@NgModule({
    declarations: [
        KpeChartsAnalyticComponent,
        KpeChartsAnalyticHeaderToggleComponent,
        KpeChartsAnalyticHeaderSelectComponent,
        KpeChartsAnalyticCardComponent,
        KpeChartsAnalyticDatesPickerComponent,
        KpeChartsAnalyticMainChartComponent,
        KpeChartsAnalyticBarChartComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        KpeSharedModule,
        MatSelectModule,
        AngularSvgIconModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        MatNativeDateModule,
    ],
    exports: [KpeChartsAnalyticComponent],
})
export class KpeChartsAnalyticModule {
    enterComponent = KpeChartsAnalyticComponent;
}
