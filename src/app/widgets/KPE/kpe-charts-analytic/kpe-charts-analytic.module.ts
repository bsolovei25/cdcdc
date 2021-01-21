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

@NgModule({
    declarations: [
        KpeChartsAnalyticComponent,
        KpeChartsAnalyticHeaderToggleComponent,
        KpeChartsAnalyticHeaderSelectComponent,
        KpeChartsAnalyticCardComponent,
        KpeChartsAnalyticDatesPickerComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatSelectModule,
        AngularSvgIconModule,
        MatDatepickerModule,
        ReactiveFormsModule,
    ],
    exports: [KpeChartsAnalyticComponent],
})
export class KpeChartsAnalyticModule {}
