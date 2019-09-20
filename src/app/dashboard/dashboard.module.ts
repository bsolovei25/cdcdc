import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './pages/home/home.component';
import {SharedModule} from "../shared/shared.module";
import {AngularSvgIconModule} from "angular-svg-icon";
import { PeriodSelectorComponent } from './components/period-selector/period-selector.component';
import { IndicatorSelectorComponent } from './components/indicator-selector/indicator-selector.component';
import { LineChartComponent } from './widgets/line-chart/line-chart.component';
import {DndModule} from "ngx-drag-drop";


@NgModule({
  declarations: [
    HomeComponent,
    PeriodSelectorComponent,
    IndicatorSelectorComponent,
    LineChartComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    DndModule
  ],
  bootstrap: []
})
export class DashboardModule {
}
