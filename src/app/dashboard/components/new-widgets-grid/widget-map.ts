import { LineChartComponent } from '../../widgets/line-chart/line-chart.component';
import { EventsComponent } from '../../widgets/events/events.component';
import { LineDiagramComponent } from '../../widgets/line-diagram/line-diagram.component';
import { ManualInputComponent } from '../../widgets/manual-input/manual-input.component';
import { ChangeShiftComponent } from "../../widgets/change-shift/change-shift.component";
import { WidgetPiesComponent } from '../../widgets/widgets-pie/widget-pies/widget-pies/widget-pies.component';
import { EventsWorkSpaceComponent } from '../../widgets/workspace/events-workspace.component';
import { TruncatedPieSFirstComponent } from '../../widgets/truncated-pie-first/truncated-pie-s-first/truncated-pie-s-first.component';
import { TruncatedPieSIconComponent } from '../../widgets/truncated-pie-icon/truncated-pie-s-icon/truncated-pie-s-icon.component';
import { PointDiagramComponent } from '../../widgets/point-diagram/point-diagram.component';
import { ProductionPyramidComponent } from '../../widgets/production-pyramid/production-pyramid.component';
import { BarChartsComponent } from '../../widgets/bar-chart/bar-charts/bar-charts.component';
import { CircleDiagramComponent } from '../../widgets/circle-diagram/circle-diagram.component';
import {UnityTemplateComponent} from '../../widgets/unity-template/unity-template.component';


export const WIDGETS = {
    "pie-diagram": WidgetPiesComponent,
    "line-chart": LineChartComponent,
    "line-diagram": LineDiagramComponent,
    "manual-input": ManualInputComponent,
    "events": EventsComponent,
    "shift-pass": ChangeShiftComponent,
    "shift-accept": ChangeShiftComponent,
    "events-workspace": EventsWorkSpaceComponent,
    "truncated-diagram-percentage": TruncatedPieSFirstComponent,
    "truncated-diagram-counter": TruncatedPieSIconComponent,
    "point-diagram": PointDiagramComponent,
    "industrial-pyramid": ProductionPyramidComponent,
    "bar-chart": BarChartsComponent,
    "circle-diagram": CircleDiagramComponent,
    "unity-template": UnityTemplateComponent
}
