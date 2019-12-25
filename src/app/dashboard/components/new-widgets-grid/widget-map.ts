import { LineChartComponent } from "../../widgets/line-chart/line-chart.component";
import { EventsComponent } from "../../widgets/events/events.component";
import { LineDiagramComponent } from "../../widgets/line-diagram/line-diagram.component";
import { ManualInputComponent } from "../../widgets/manual-input/manual-input.component";
import { ChangeShiftComponent } from "../../widgets/change-shift/change-shift.component";
import { EnergeticsComponent } from "../../widgets/energetics/energetics.component";
import { WidgetPiesComponent } from "../../widgets/widgets-pie/widget-pies/widget-pies/widget-pies.component";
import { EventsWorkSpaceComponent } from "../../widgets/workspace/events-workspace.component";
import { TruncatedPieSFirstComponent } from "../../widgets/truncated-pie-first/truncated-pie-s-first/truncated-pie-s-first.component";
import { TruncatedPieSIconComponent } from "../../widgets/truncated-pie-icon/truncated-pie-s-icon/truncated-pie-s-icon.component";
import { PointDiagramComponent } from "../../widgets/point-diagram/point-diagram.component";
import { ProductionPyramidComponent } from "../../widgets/production-pyramid/production-pyramid.component";
import { BarChartsComponent } from "../../widgets/bar-chart/bar-charts/bar-charts.component";
import { SuspenseMachineComponent } from "../../widgets/suspense-machine/suspense-machine.component";
import { EnterpriseMapComponent } from "../../widgets/map-enterprise/enterprise-map.component";
import { CircleDiagramComponent } from "../../widgets/circle-diagram/circle-diagram.component";
import { MapEcologyComponent } from "../../widgets/map-ecology/map-ecology/map-ecology.component";
import { UnityTemplateComponent } from "../../widgets/unity-template/unity-template.component";
import { RingSFactoryDiagramComponent } from "../../widgets/ring-factory-diagrams/ring-s-factory-diagram/ring-s-factory-diagram.component";
import { OperationEfficiencyComponent } from "../../widgets/operation-efficiency/operation-efficiency.component";
import { EcologySafetyComponent } from "../../widgets/ecology-safety/ecology-safety.component";
import { CalendarPlanComponent } from "../../widgets/calendar-plan/calendar-plan.component";
import { ChainMapComponent } from "../../widgets/chain-map/chain-map.component";
import { DispatcherScreenComponent } from "../../widgets/dispatcher-screen/dispatcher-screen.component";
import { DeviationsTableComponent } from "../../widgets/deviations-table/deviations-table.component";
import { TriggeringCriticalParametersComponent } from "../../widgets/triggering-critical-parameters/triggering-critical-parameters.component";
import { CircleFactoryDiagramComponent } from "../../widgets/circle-factory-diagram/circle-factory-diagram.component";
import { ProductStocksComponent } from "../../widgets/product-stocks/product-stocks.component";
import { PolarChartComponent } from "../../widgets/polar-chart/polar-chart.component";
import { SemicircleEnergyComponent } from "../../widgets/semicircle-energy/semicircle-energy.component";
import { DeviationCircleDiagramComponent } from "../../widgets/deviation-circle-diagram/deviation-circle-diagram.component";
import { CircleBlockDiagramComponent } from "../../widgets/circle-block-diagram/circle-block-diagram.component";

export const WIDGETS = {
  "pie-diagram": WidgetPiesComponent,
  "line-chart": LineChartComponent,
  "line-diagram": LineDiagramComponent,
  "manual-input": ManualInputComponent,
  events: EventsComponent,
  "shift-pass": ChangeShiftComponent,
  "shift-accept": ChangeShiftComponent,
  "events-workspace": EventsWorkSpaceComponent,
  "truncated-diagram-percentage": TruncatedPieSFirstComponent,
  "truncated-diagram-counter": TruncatedPieSIconComponent,
  "point-diagram": PointDiagramComponent,
  "industrial-pyramid": ProductionPyramidComponent,
  "bar-chart": BarChartsComponent,
  "enterprise-map": EnterpriseMapComponent,
  "circle-diagram": CircleDiagramComponent,
  "unity-template": UnityTemplateComponent,
  "map-ecology": MapEcologyComponent,
  "operation-efficiency": OperationEfficiencyComponent,
  "ecology-safety": EcologySafetyComponent,
  "calendar-plan": CalendarPlanComponent,
  "ring-factory-diagram": RingSFactoryDiagramComponent,
  "chain-map": ChainMapComponent,
  energetics: EnergeticsComponent,
  "dispatcher-screen": DispatcherScreenComponent,
  "suspense-machine": SuspenseMachineComponent,
  "deviations-table": DeviationsTableComponent,
  "triggering-critical-parameters": TriggeringCriticalParametersComponent,
  "circle-factory-diagram": CircleFactoryDiagramComponent,
  "product-stocks": ProductStocksComponent,
  "polar-chart": PolarChartComponent,
  "semicircle-energy": SemicircleEnergyComponent,
  "deviation-circle-diagram": DeviationCircleDiagramComponent,
  "circle-block-diagram": CircleBlockDiagramComponent
};
