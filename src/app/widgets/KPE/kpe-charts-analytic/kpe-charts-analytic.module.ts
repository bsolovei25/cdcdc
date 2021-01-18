import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeChartsAnalyticComponent } from './kpe-charts-analytic.component';
import { SharedModule } from '@shared/shared.module';
import { KpeChartsAnalyticHeaderToggleComponent } from './components/kpe-charts-analytic-header-toggle/kpe-charts-analytic-header-toggle.component';
import { KpeChartsAnalyticHeaderSelectComponent } from './components/kpe-charts-analytic-header-select/kpe-charts-analytic-header-select.component';
import { MatSelectModule } from '@angular/material/select';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { KpeChartsAnalyticCardComponent } from './components/kpe-charts-analytic-card/kpe-charts-analytic-card.component';

@NgModule({
    declarations: [
        KpeChartsAnalyticComponent,
        KpeChartsAnalyticHeaderToggleComponent,
        KpeChartsAnalyticHeaderSelectComponent,
        KpeChartsAnalyticCardComponent,
    ],
    imports: [CommonModule, SharedModule, MatSelectModule, AngularSvgIconModule],
    exports: [KpeChartsAnalyticComponent],
})
export class KpeChartsAnalyticModule {}
