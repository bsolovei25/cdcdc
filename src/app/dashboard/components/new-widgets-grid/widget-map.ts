import { WidgetsPieCircleComponent } from '../../widgets/widgets-pie/widgets-pie-circle/widgets-pie-circle.component';
import { LineChartComponent } from '../../widgets/line-chart/line-chart.component';
import { EventsComponent } from '../../widgets/events/events.component';
import { LineDiagramComponent } from '../../widgets/line-diagram/line-diagram.component';
import { ManualInputComponent } from '../../widgets/manual-input/manual-input.component';
import {ChangeShiftComponent} from "../../widgets/change-shift/change-shift.component";
import { WidgetPiesComponent } from '../../widgets/widgets-pie2/widget-pies/widget-pies/widget-pies.component';


export const WIDGETS = {
    "pie-diagram":  WidgetPiesComponent,
    "line-chart": LineChartComponent,
    "line-diagram": LineDiagramComponent,
    "manual-input": ManualInputComponent,
    "events": EventsComponent,
    "shift-pass": ChangeShiftComponent,
    "shift-accept": ChangeShiftComponent
}
