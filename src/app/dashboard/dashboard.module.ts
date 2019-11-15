import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './pages/home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AngularSvgIconModule} from 'angular-svg-icon';
import { PeriodSelectorComponent } from './components/period-selector/period-selector.component';
import { IndicatorSelectorComponent } from './components/indicator-selector/indicator-selector.component';
import { LineChartComponent } from './widgets/line-chart/line-chart.component';
import {DndModule} from 'ngx-drag-drop';
import {DashboardComponent} from './pages/dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { WidgetsGridComponent } from './components/widgets-grid/widgets-grid.component';
import { WidgetsPanelComponent } from './components/widgets-panel/widgets-panel.component';
import {EventsComponent} from './widgets/events/events.component';
import {ManualInputComponent} from './widgets/manual-input/manual-input.component';
import {FormsModule} from '@angular/forms';
import {ManualinputPageComponent} from './pages/manualinput-page/manualinput-page.component';
import { LineDiagramComponent } from './widgets/line-diagram/line-diagram.component';
import { WidgetsPieCircleComponent } from './widgets/widgets-pie/widgets-pie-circle/widgets-pie-circle.component';


@NgModule({
  declarations: [
    HomeComponent,
    PeriodSelectorComponent,
    IndicatorSelectorComponent,
    LineChartComponent,
    DashboardComponent,
    WidgetsGridComponent,
    WidgetsPanelComponent,
    EventsComponent,
    ManualInputComponent,
    ManualinputPageComponent,
    LineDiagramComponent,
    WidgetsPieCircleComponent
  ],
  exports: [
    HomeComponent,
    ManualinputPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    DndModule,
    HttpClientModule,
    FormsModule
  ],
  bootstrap: []
})
export class DashboardModule {
}
