import { ChangeShiftComponent } from "./widgets/change-shift/change-shift.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./pages/home/home.component";
import { SharedModule } from "../@shared/shared.module";
import { AngularSvgIconModule } from "angular-svg-icon";
import { PeriodSelectorComponent } from "./components/period-selector/period-selector.component";
import { IndicatorSelectorComponent } from "./components/indicator-selector/indicator-selector.component";
import { LineChartComponent } from "./widgets/line-chart/line-chart.component";
import { DndModule } from "ngx-drag-drop";
import { DashboardComponent } from "./pages/dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { EventsComponent } from "./widgets/events/events.component";
import { ManualInputComponent } from "./widgets/manual-input/manual-input.component";
import { FormsModule } from "@angular/forms";
import { LineDiagramComponent } from "./widgets/line-diagram/line-diagram.component";
import { LineDatetimeComponent } from "./components/line-datetime/line-datetime.component";
import { ShiftPersonComponent } from './widgets/change-shift/shift-person/shift-person.component';
import { NewWidgetsPanelComponent } from './components/new-widgets-panel/new-widgets-panel.component';
import { NewWidgetsGridComponent } from './components/new-widgets-grid/new-widgets-grid.component';
import { GridsterModule } from 'angular-gridster2';
import {UserInfoComponent} from './components/user-info/user-info.component';
import { WidgetPiesComponent } from './widgets/widgets-pie/widget-pies/widget-pies/widget-pies.component';
import { WidgetsPieComponent } from './widgets/widgets-pie/widget-pie-circle/widget-pie/widget-pie.component';
import { WidgetHeaderComponent } from './components/widget-header/widget-header.component';
import { EventsWorkSpaceComponent } from './widgets/workspace/events-workspace.component';
import { FrameTopComponent } from './components/frame-top/frame-top.component';
import { FrameBottomComponent } from './components/frame-bottom/frame-bottom.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { TruncatedPieFirstComponent } from './widgets/truncated-pie-first/truncated-pie-first/truncated-pie-first.component';
import { TruncatedPieSFirstComponent } from './widgets/truncated-pie-first/truncated-pie-s-first/truncated-pie-s-first.component';
import { TruncatedPieSIconComponent } from './widgets/truncated-pie-icon/truncated-pie-s-icon/truncated-pie-s-icon.component';
import { TruncatedPieIconComponent } from './widgets/truncated-pie-icon/truncated-pie-icon/truncated-pie-icon.component';
import { PointDiagramComponent } from './widgets/point-diagram/point-diagram.component';
import { OneColumnComponent } from './widgets/point-diagram/one-column/one-column.component';
import { ProductionPyramidComponent } from './widgets/production-pyramid/production-pyramid.component';
import { BarChartsComponent } from './widgets/bar-chart/bar-charts/bar-charts.component';
import { BarChartComponent } from './widgets/bar-chart/bar-chart/bar-chart.component';



@NgModule({
  declarations: [
    HomeComponent,
    PeriodSelectorComponent,
    IndicatorSelectorComponent,
    LineDatetimeComponent,
    LineChartComponent,
    DashboardComponent,
    EventsComponent,
    ManualInputComponent,
    ChangeShiftComponent,
    LineDiagramComponent,
    ShiftPersonComponent,
    NewWidgetsPanelComponent,
    NewWidgetsGridComponent,
    UserInfoComponent,
    WidgetPiesComponent,
    WidgetsPieComponent,
    WidgetHeaderComponent,
    EventsWorkSpaceComponent,
    PointDiagramComponent,
    OneColumnComponent,
    FrameTopComponent,
    FrameBottomComponent,
    TruncatedPieFirstComponent,
    TruncatedPieSFirstComponent,
    TruncatedPieSIconComponent,
    TruncatedPieIconComponent,
    ProductionPyramidComponent,
    BarChartsComponent,
    BarChartComponent
  ],
  entryComponents:[
    LineChartComponent,
    WidgetPiesComponent,
    EventsComponent,
    LineChartComponent,
    ManualInputComponent,
    LineDiagramComponent,
    ChangeShiftComponent,
    EventsWorkSpaceComponent,
    TruncatedPieSFirstComponent,
    TruncatedPieSIconComponent,
    PointDiagramComponent,
    ProductionPyramidComponent,
    BarChartsComponent,
  ],
  exports: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    DndModule,
    HttpClientModule,
    FormsModule,
    GridsterModule,
    ClickOutsideModule,
  ],
  bootstrap: []
})
export class DashboardModule {}
