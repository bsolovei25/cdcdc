import { LineChartComponent } from '../../widgets/line-chart/line-chart.component';
import { EventsComponent } from '../../widgets/events/events.component';
import { LineDiagramComponent } from '../../widgets/line-diagram/line-diagram.component';
import { ManualInputComponent } from '../../widgets/manual-input/manual-input.component';
import {ChangeShiftComponent} from "../../widgets/change-shift/change-shift.component";
import { WidgetPiesComponent } from '../../widgets/widgets-pie/widget-pies/widget-pies/widget-pies.component';
import { EventsWorkSpaceComponent } from '../../widgets/workspace/events-workspace.component';
import { PointDiagramComponent } from '../../widgets/point-diagram/point-diagram.component';


export const WIDGETS = {
    "pie-diagram":  WidgetPiesComponent,
    "line-chart": LineChartComponent,
    "line-diagram": LineDiagramComponent,
    "manual-input": ManualInputComponent,
    "events": EventsComponent,
    "shift-pass": ChangeShiftComponent,
    "shift-accept": ChangeShiftComponent,
    "events-workspace": EventsWorkSpaceComponent,
    "point-diagram": PointDiagramComponent,
}
