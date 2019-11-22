import { WidgetsPieCircleComponent } from '../../widgets/widgets-pie/widgets-pie-circle/widgets-pie-circle.component';
import { LineChartComponent } from '../../widgets/line-chart/line-chart.component';
import { EventsComponent } from '../../widgets/events/events.component';
import { LineDiagramComponent } from '../../widgets/line-diagram/line-diagram.component';
import { ManualInputComponent } from '../../widgets/manual-input/manual-input.component';
import {ChangeShiftComponent} from "../../widgets/change-shift/change-shift.component";


export const WIDGETS = {
    "pie-diagram":  WidgetsPieCircleComponent,
    "line-chart": LineChartComponent,
    "line-diagram": LineDiagramComponent,
    "manual-input": ManualInputComponent,
    "events": EventsComponent,
    "shift-pass": ChangeShiftComponent,
    "shift-accept": ChangeShiftComponent
}
