import { LineChartComponent } from '../../widgets/line-chart/line-chart.component';
import { EventsComponent } from '../../widgets/events/events.component';
import { LineDiagramComponent } from '../../widgets/line-diagram/line-diagram.component';
import { ManualInputComponent } from '../../widgets/manual-input/manual-input.component';
import { ChangeShiftComponent } from '../../widgets/change-shift/change-shift.component';
import { EnergeticsComponent } from '../../widgets/energetics/energetics.component';
import { WidgetPiesComponent } from '../../widgets/widgets-pie/widget-pies/widget-pies.component';
import { EventsWorkSpaceComponent } from '../../widgets/workspace/events-workspace.component';
import { TruncatedPieSFirstComponent } from '../../widgets/truncated-pie-first/truncated-pie-s-first/truncated-pie-s-first.component';
import { TruncatedPieSIconComponent } from '../../widgets/truncated-pie-icon/truncated-pie-s-icon/truncated-pie-s-icon.component';
import { PointDiagramComponent } from '../../widgets/point-diagram/point-diagram.component';
import { ProductionPyramidComponent } from '../../widgets/production-pyramid/production-pyramid.component';
import { BarChartsComponent } from '../../widgets/bar-chart/bar-charts/bar-charts.component';
import { SuspenseMachineComponent } from '../../widgets/suspense-machine/suspense-machine.component';
import { EnterpriseMapComponent } from '../../widgets/map-enterprise/enterprise-map.component';
import { CircleDiagramComponent } from '../../widgets/circle-diagram/circle-diagram.component';
import { MapEcologyComponent } from '../../widgets/map-ecology/map-ecology.component';
import { UnityTemplateComponent } from '../../widgets/unity-template/unity-template.component';
import { RingSFactoryDiagramComponent } from '../../widgets/ring-factory-diagrams/ring-s-factory-diagram/ring-s-factory-diagram.component';
import { OperationEfficiencyComponent } from '../../widgets/operation-efficiency/operation-efficiency.component';
import { EcologySafetyComponent } from '../../widgets/ecology-safety/ecology-safety.component';
import { CalendarPlanComponent } from '../../widgets/calendar-plan/calendar-plan.component';
import { ChainMapComponent } from '../../widgets/chain-map/chain-map.component';
import { DispatcherScreenComponent } from '../../widgets/dispatcher-screen/dispatcher-screen.component';
import { DeviationsTableComponent } from '../../widgets/deviations-table/deviations-table.component';
import { TriggeringCriticalParametersComponent } from '../../widgets/triggering-critical-parameters/triggering-critical-parameters.component';
import { CircleFactoryDiagramComponent } from '../../widgets/circle-factory-diagram/circle-factory-diagram.component';
import { ProductStocksComponent } from '../../widgets/product-stocks/product-stocks.component';
import { PolarChartComponent } from '../../widgets/polar-chart/polar-chart.component';
import { SemicircleEnergyComponent } from '../../widgets/semicircle-energy/semicircle-energy.component';
import { DeviationCircleDiagramComponent } from '../../widgets/deviation-circle-diagram/deviation-circle-diagram.component';
import { OilControlComponent } from '../../widgets/oil-control/oil-control.component';
import { CircleBlockDiagramComponent } from '../../widgets/circle-block-diagram/circle-block-diagram.component';
import { ColumnChartStackedComponent } from '../../widgets/column-chart-stacked/column-chart-stacked.component';
import { TimeLineDiagramComponent } from '../../widgets/time-line-diagram/time-line-diagram.component';
import { FlameDiagramComponent } from '../../widgets/flame-diagram/flame-diagram.component';
import { ObservationNormTRComponent } from '../../widgets/observation-norm-tr/observation-norm-tr.component';
import { RingEnergyIndicatorComponent } from '../../widgets/ring-energy-indicator/ring-energy-indicator.component';
import { SolidGaugesComponent } from '../../widgets/solid-gauge-with-marker/solid-gauges/solid-gauges.component';
import { AdminShiftScheduleComponent } from '../../widgets/admin-widget/admin-shift-schedule/admin-shift-schedule.component';
import { AdminReferencesComponent } from '../../widgets/admin-references/admin-references.component';
import { PetroleumProductsMovementComponent } from '../../widgets/petroleum-products-movement/petroleum-products-movement.component';
import { AdminPanelComponent } from '../../widgets/admin-panel/admin-panel.component';
import { ReportServerConfiguratorComponent } from '../../widgets/report-server-configurator/report-server-configurator.component';
import { ReferenceComponent } from '../../widgets/reference/reference.component';
import { TankCalibrationTableComponent } from '../../widgets/tank-calibration-table/tank-calibration-table.component';
import { CustomReportPropertiesReferenceComponent } from '../../widgets/custom-report-properties-reference/custom-report-properties-reference.component';
import { ProductionTrendComponent } from '../../widgets/production-trend/production-trend.component';
import { TankInformationComponent } from '../../widgets/tank-information/tank-information.component';
import { ReasonsDeviationsComponent } from '../../widgets/reasons-deviations/reasons-deviations.component';
import { DocumentViewerComponent } from '../../widgets/document-viewer/document-viewer.component';
import { DocumentsScansComponent } from '../../widgets/documents-scans/documents-scans.component';
import { QualityDocsPanelComponent } from '../../widgets/quality-docs-panel/quality-docs-panel.component';
import { DocumentCodingComponent } from '../../widgets/document-coding/document-coding.component';
import { OilOperationsComponent } from '../../widgets/oil-operations/oil-operations.component';
import { CdCriticalComponent } from '../../widgets/cd-critical/cd-critical.component';
import { ImplementationPlanComponent } from '../../widgets/SMP/implementation-plan/implementation-plan.component';

export const WIDGETS = {
    'pie-diagram': WidgetPiesComponent,
    'line-chart': LineChartComponent,
    'line-diagram': LineDiagramComponent,
    'manual-input': ManualInputComponent,
    'events': EventsComponent,
    'shift-pass': ChangeShiftComponent,
    'shift-accept': ChangeShiftComponent,
    'events-workspace': EventsWorkSpaceComponent,
    'truncated-diagram-percentage': TruncatedPieSFirstComponent,
    'truncated-diagram-counter': TruncatedPieSIconComponent,
    'point-diagram': PointDiagramComponent,
    'industrial-pyramid': ProductionPyramidComponent,
    'bar-chart': BarChartsComponent,
    'enterprise-map': EnterpriseMapComponent,
    'circle-diagram': CircleDiagramComponent,
    'unity-template': UnityTemplateComponent,
    'map-ecology': MapEcologyComponent,
    'operation-efficiency': OperationEfficiencyComponent,
    'ecology-safety': EcologySafetyComponent,
    'calendar-plan': CalendarPlanComponent,
    'ring-factory-diagram': RingSFactoryDiagramComponent,
    'chain-map': ChainMapComponent,
    'energetics': EnergeticsComponent,
    'dispatcher-screen': DispatcherScreenComponent,
    'table-data': SuspenseMachineComponent,
    'deviations-table': DeviationsTableComponent,
    'triggering-critical-parameters': TriggeringCriticalParametersComponent,
    'circle-factory-diagram': CircleFactoryDiagramComponent,
    'product-stocks': ProductStocksComponent,
    'polar-chart': PolarChartComponent,
    'semicircle-energy': SemicircleEnergyComponent,
    'deviation-circle-diagram': DeviationCircleDiagramComponent,
    'oil-control': OilControlComponent,
    'circle-block-diagram': CircleBlockDiagramComponent,
    'column-chart-stacked': ColumnChartStackedComponent,
    'flame-diagram': FlameDiagramComponent,
    'ring-energy-indicator': RingEnergyIndicatorComponent,
    'time-line-diagram': TimeLineDiagramComponent,
    'solid-gauge-with-marker': SolidGaugesComponent,
    'observation-norm-tr': ObservationNormTRComponent,
    'admin-shift-schedule': AdminShiftScheduleComponent,
    'admin-references': AdminReferencesComponent,
    'petroleum-products-movement': PetroleumProductsMovementComponent,
    'admin-panel': AdminPanelComponent,
    'reference': ReferenceComponent,
    'report-server-configurator': ReportServerConfiguratorComponent,
    'tank-calibration-table': TankCalibrationTableComponent,
    'custom-report-properties-reference': CustomReportPropertiesReferenceComponent,
    'production-trend': ProductionTrendComponent,
    'tank-information': TankInformationComponent,
    'reasons-deviations': ReasonsDeviationsComponent,
    'document-viewer': DocumentViewerComponent,
    'documents-scans': DocumentsScansComponent,
    'quality-docs-panel': QualityDocsPanelComponent,
    'document-coding': DocumentCodingComponent,
    'oil-operations': OilOperationsComponent,
    'cd-critical': CdCriticalComponent,
    'implementation-plan': ImplementationPlanComponent,
};
