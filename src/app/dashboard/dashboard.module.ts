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
import { WidgetsGridComponent } from "./components/widgets-grid/widgets-grid.component";
import { WidgetsPanelComponent } from "./components/widgets-panel/widgets-panel.component";
import { EventsComponent } from "./widgets/events/events.component";
import { ManualInputComponent } from "./widgets/manual-input/manual-input.component";
import { FormsModule } from "@angular/forms";
import { ManualinputPageComponent } from "./pages/manualinput-page/manualinput-page.component";
import { LineDiagramComponent } from "./widgets/line-diagram/line-diagram.component";
import { WidgetsPieCircleComponent } from "./widgets/widgets-pie/widgets-pie-circle/widgets-pie-circle.component";
import { LineDatetimeComponent } from "./components/line-datetime/line-datetime.component";
import { ShiftPersonComponent } from './widgets/change-shift/shift-person/shift-person.component';
import { NewWidgetsPanelComponent } from './components/new-widgets-panel/new-widgets-panel.component';
import { NewWidgetsGridComponent } from './components/new-widgets-grid/new-widgets-grid.component';
import { GridsterModule } from 'angular-gridster2';
import {UserInfoComponent} from './components/user-info/user-info.component';
import { WidgetPiesComponent } from './widgets/widgets-pie2/widget-pies/widget-pies/widget-pies.component';
import { WidgetsPieComponent } from './widgets/widgets-pie2/widget-pie-circle/widget-pie/widget-pie.component';
import { WidgetHeaderComponent } from './components/widget-header/widget-header.component';
import { EventsWorkSpaceComponent } from './widgets/workspace/events-workspace.component';
import { ClickOutsideModule } from 'ng-click-outside';



@NgModule({
  declarations: [
    HomeComponent,
    PeriodSelectorComponent,
    IndicatorSelectorComponent,
    LineDatetimeComponent,
    LineChartComponent,
    DashboardComponent,
    WidgetsGridComponent,
    WidgetsPanelComponent,
    EventsComponent,
    ManualInputComponent,
    ManualinputPageComponent,
    ChangeShiftComponent,
    LineDiagramComponent,
    WidgetsPieCircleComponent,
    ShiftPersonComponent,
    NewWidgetsPanelComponent,
    NewWidgetsGridComponent,
    UserInfoComponent,
    WidgetPiesComponent,
    WidgetsPieComponent,
    WidgetHeaderComponent,
    EventsWorkSpaceComponent
  ],
  entryComponents:[
    WidgetsPieCircleComponent,
    LineChartComponent,
    EventsComponent,
    LineChartComponent,
    ManualInputComponent,
    LineDiagramComponent,
    ChangeShiftComponent,
    EventsWorkSpaceComponent
  //  UserInfoComponent
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
    FormsModule,
    GridsterModule,
    ClickOutsideModule,
  ],
  bootstrap: []
})
export class DashboardModule {}
