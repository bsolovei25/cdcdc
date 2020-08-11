import { LineChartComponent } from '../../widgets/line-chart/line-chart.component';
import { EventsComponent } from '../../../widgets/EVJ/events/events.component';
import { LineDiagramComponent } from '../../widgets/line-diagram/line-diagram.component';
import { ManualInputComponent } from '../../widgets/manual-input/manual-input.component';
import { ChangeShiftComponent } from '../../widgets/change-shift/change-shift.component';
import { EnergeticsComponent } from '../../widgets/energetics/energetics.component';
import { WidgetPiesComponent } from '../../widgets/widgets-pie/widget-pies/widget-pies.component';
import { EventsWorkSpaceComponent } from '../../widgets/workspace/events-workspace.component';
import { TruncatedPieSFirstComponent } from '../../widgets/truncated-pie-first/truncated-pie-s-first/truncated-pie-s-first.component';
import { TruncatedPieSIconComponent } from '../../widgets/truncated-pie-icon/truncated-pie-s-icon/truncated-pie-s-icon.component';
import { PointDiagramComponent } from '../../widgets/point-diagram/point-diagram.component';
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
import { WorkflowComponent } from '../../widgets/workflow/workflow.component';
import { CdCriticalComponent } from '../../widgets/cd-critical/cd-critical.component';
import { TruncatedDiagramTrafficLightComponent } from '../../widgets/truncated-diagram-traffic-light/truncated-diagram-traffic-light.component';
import { AstueEfficiencyComponent } from '../../widgets/ASTUE/astue-efficiency/astue-efficiency.component';
import { WidgetContainerComponent } from '../../widget-container/widget-container.component';
import { AdminShiftScheduleOldComponent } from '../../widgets/admin-widget/admin-shift-schedule-old/admin-shift-schedule-old.component';

export const WIDGETS = {
    'pie-diagram': WidgetPiesComponent,
    'line-chart': LineChartComponent,
    'line-diagram': LineDiagramComponent,
    'manual-input': ManualInputComponent,
    'shift-pass': ChangeShiftComponent,
    'shift-accept': ChangeShiftComponent,
    'events-workspace': EventsWorkSpaceComponent,
    'truncated-diagram-percentage': TruncatedPieSFirstComponent,
    'truncated-diagram-traffic-light': TruncatedDiagramTrafficLightComponent,
    'truncated-diagram-counter': TruncatedPieSIconComponent,
    'point-diagram': PointDiagramComponent,
    'industrial-pyramid': WidgetContainerComponent,
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
    energetics: EnergeticsComponent,
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
    'admin-references': AdminReferencesComponent,
    'petroleum-products-movement': PetroleumProductsMovementComponent,
    'admin-panel': AdminPanelComponent,
    reference: ReferenceComponent,
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
    workflow: WorkflowComponent,
    'cd-critical': CdCriticalComponent,
    'implementation-plan': WidgetContainerComponent,
    'performance-progress-indicators': WidgetContainerComponent,
    'quality-stock': WidgetContainerComponent,
    'smp-events': WidgetContainerComponent,
    'smp-events-workspace': WidgetContainerComponent,
    'product-groups': WidgetContainerComponent,
    'production-deviations': WidgetContainerComponent,
    'product-groups-short': WidgetContainerComponent,
    'astue-efficiency': AstueEfficiencyComponent,
    'load-chart': WidgetContainerComponent,
    'aps-recipe-diagram': WidgetContainerComponent,
    'aps-gantt-chart': WidgetContainerComponent,
    scenarios: WidgetContainerComponent,
    'admin-shift-schedule': WidgetContainerComponent,
    'admin-shift-schedule-old': AdminShiftScheduleOldComponent,
    'facility-deviation': WidgetContainerComponent,
    'raw-motion': WidgetContainerComponent,
    'stocks-using': WidgetContainerComponent,
    'indicator-load-deviation': WidgetContainerComponent,
    'deviation-details': WidgetContainerComponent,
    'production-details': WidgetContainerComponent,
    'kpe-quality': WidgetContainerComponent,
    'kpe-energetic': WidgetContainerComponent,
    'key-performance-indicators': WidgetContainerComponent,
    'kpe-readiness': WidgetContainerComponent,
    events: WidgetContainerComponent,
    'cd-events': WidgetContainerComponent,
    'spline-trends-chart': WidgetContainerComponent,
    'cd-mat-balance': WidgetContainerComponent,
    'cd-deviation-mat': WidgetContainerComponent,
    'cd-reactor-parameters': WidgetContainerComponent,
    'sou-operational-accounting-system': WidgetContainerComponent,
    'astue-onpz-product-charts': WidgetContainerComponent,
};

export const WIDGETS_LAZY = {
    // #region APS
    'load-chart': {
        import: async () => {
            return await import('src/app/widgets/APS/load-chart/load-chart.module');
        },
        module: 'LoadChartModule', // название модуля
        itemCols: 41,
        itemRows: 12,
        minItemCols: 40,
        minItemRows: 10,
        // preview: 'load-chart',
    },
    scenarios: {
        import: async () => {
            return await import('src/app/widgets/APS/scenarios/scenarios.module');
        },
        module: 'ScenariosModule',
        itemCols: 15,
        itemRows: 10,
        minItemCols: 15,
        minItemRows: 10,
        // preview: 'scenarios',
    },
    'aps-gantt-chart': {
        import: async () => {
            return await import('src/app/widgets/APS/aps-gantt-chart/aps-gantt-chart.module');
        },
        module: 'ApsGanttChartModule',
        itemCols: 15,
        itemRows: 30,
        minItemCols: 40,
        minItemRows: 10,
        // preview: 'gant-chart',
    },
    'aps-recipe-diagram': {
        import: async () => {
            return await import('src/app/widgets/APS/aps-recipe-diagram/aps-recipe-diagram.module');
        },
        module: 'ApsRecipeDiagramModule',
        itemCols: 15,
        itemRows: 30,
        minItemCols: 40,
        minItemRows: 10,
        // preview: 'aps-recipe-diagram',
    },
    'facility-deviation': {
        import: async () => {
            return await import('src/app/widgets/APS/facility-deviation/facility-deviation.module');
        },
        module: 'FacilityDeviationModule',
        itemCols: 41,
        itemRows: 12,
        minItemCols: 40,
        minItemRows: 10,
    },
    'raw-motion': {
        import: async () => {
            return await import('src/app/widgets/APS/raw-motion/raw-motion.module');
        },
        module: 'RawMotionModule',
        itemCols: 41,
        itemRows: 12,
        minItemCols: 40,
        minItemRows: 10,
        // preview: 'raw-motion',
    },
    'stocks-using': {
        import: async () => {
            return await import('src/app/widgets/APS/stocks-using/stocks-using.module');
        },
        module: 'StocksUsingModule',
        itemCols: 41,
        itemRows: 12,
        minItemCols: 30,
        minItemRows: 8,
    },

    'deviation-details': {
        import: async () => {
            return await import('src/app/widgets/APS/deviation-details/deviation-details.module');
        },
        module: 'DeviationDetailsModule',
        itemCols: 11,
        itemRows: 20,
        minItemCols: 11,
        minItemRows: 11,
    },
    'production-details': {
        import: async () => {
            return await import('src/app/widgets/APS/production-details/production-details.module');
        },
        module: 'ProductionDetailsModule',
        itemCols: 11,
        itemRows: 20,
        minItemCols: 11,
        minItemRows: 11,
    },
    'indicator-load-deviation': {
        import: async () => {
            return await import(
                'src/app/widgets/APS/indicator-load-deviation/indicator-load-deviation.module'
            );
        },
        module: 'IndicatorLoadDeviationModule',
        itemCols: 12,
        itemRows: 12,
        minItemCols: 11,
        minItemRows: 11,
        // preview: 'indicator-load-deviation',
    },

    // #endregion APS

    // #region KPE

    'key-performance-indicators': {
        import: async () => {
            return await import(
                'src/app/widgets/KPE/key-performance-indicators/key-performance-indicators.module'
            );
        },
        module: 'KeyPerformanceIndicatorsModule',
        itemCols: 19,
        itemRows: 12,
        minItemCols: 19,
        minItemRows: 12,
    },
    'kpe-quality': {
        import: async () => {
            return await import('src/app/widgets/KPE/kpe-quality/kpe-quality.module');
        },
        module: 'KpeQualityModule',
        itemCols: 15,
        itemRows: 15,
        minItemCols: 15,
        minItemRows: 10,
        // preview: 'kpe-quality',
    },
    'kpe-readiness': {
        import: async () => {
            return await import('src/app/widgets/KPE/kpe-readiness/kpe-readiness.module');
        },
        module: 'KpeReadinessModule',
        itemCols: 15,
        itemRows: 15,
        minItemCols: 15,
        minItemRows: 10,
        // preview: 'kpe-quality',
    },

    'kpe-energetic': {
        import: async () => {
            return await import('src/app/widgets/KPE/kpe-energy/kpe-energy.module');
        },
        module: 'KpeEnergyModule',
        itemCols: 15,
        itemRows: 7,
        minItemCols: 15,
        minItemRows: 6,
        // preview: 'kpe-quality',
    },

    'spline-trends-chart': {
        import: async () => {
            return await import(
                'src/app/widgets/LCO/spline-trends-chart/spline-trends-chart.module'
            );
        },
        module: 'SplineTrendsChartModule',
        itemCols: 24,
        itemRows: 14,
        minItemCols: 24,
        minItemRows: 14
    },

    // #endregion KPE

    // #region Admin

    'admin-shift-schedule': {
        import: async () => {
            return await import(
                'src/app/widgets/admin/admin-shift-schedule/admin-shift-schedule.module'
            );
        },
        module: 'AdminShiftScheduleModule',
        itemCols: 15,
        itemRows: 15,
        minItemCols: 15,
        minItemRows: 15,
        preview: 'admin-shift-schedule',
    },

    // #endregion Admin

    // #region CD

    'cd-events': {
        import: async () => {
            return await import('src/app/widgets/EVJ/events/events.module');
        },
        module: 'EventsModule',
        itemCols: 32,
        itemRows: 30,
        minItemCols: 32,
        minItemRows: 30,
        preview: 'cd-events',
    },

    'cd-mat-balance': {
        import: async () => {
            return await import('src/app/widgets/CD/cd-mat-balance/cd-mat-balance.module');
        },
        module: 'CdMatBalanceModule',
        itemCols: 40,
        itemRows: 30,
        minItemCols: 40,
        minItemRows: 30,
        preview: 'cd-mat-balance',
    },

    'cd-reactor-parameters': {
        import: async () => {
            return await import(
                'src/app/widgets/CD/cd-reactor-parameters/cd-reactor-parameters.module'
            );
        },
        module: 'CdReactorParametersModule',
        itemCols: 15,
        itemRows: 15,
        minItemCols: 8,
        minItemRows: 8,
        preview: 'cd-reactor-parameters',
    },

    'cd-deviation-mat': {
        import: async () => {
            return await import('src/app/widgets/CD/cd-deviation-mat/cd-deviation-mat.module');
        },
        module: 'CdDeviationMatModule',
        itemCols: 15,
        itemRows: 15,
        minItemCols: 8,
        minItemRows: 8,
        preview: 'cd-deviation-mat',
    },

    // #endregion CD

    // #region EVJ

    events: {
        import: async () => {
            return await import('src/app/widgets/EVJ/events/events.module');
        },
        module: 'EventsModule',
        itemCols: 32,
        itemRows: 30,
        minItemCols: 32,
        minItemRows: 30,
        preview: 'events',
    },

    // #endregion EVJ

    // #region SOU

    'sou-operational-accounting-system': {
        import: async () => {
            return await import(
                'src/app/widgets/SOU/sou-operational-accounting-system/sou-operational-accounting-system.module'
            );
        },
        module: 'SouOperationalAccountingSystemModule',
        itemCols: 32,
        itemRows: 30,
        minItemCols: 32,
        minItemRows: 30,
        preview: 'sou-operational-accounting-system',
    },

    // #endregion SOU

    //#region ASTUE-ONPZ
    'astue-onpz-product-charts': {
        import: async () => {
            return await import(
                'src/app/widgets/ASTUE-ONPZ/astue-onpz-product-charts/astue-onpz-product-charts.module'
            );
        },
        module: 'AstueOnpzProductChartsModule',
        itemCols: 32,
        itemRows: 30,
        minItemCols: 32,
        minItemRows: 30,
        preview: 'astue-onpz-product-charts',
    },
    //#endregion

    // 'pie-diagram': {
    //     import: async () => await import('src/app/widgets/pie-diagram/pie-diagram.module'),
    // },
    // 'line-chart': {
    //     import: async () => await import('src/app/widgets/line-chart/line-chart.module'),
    // },
    // 'line-diagram': {
    //     import: async () => await import('src/app/widgets/line-diagram/line-diagram.module'),
    // },
    // 'manual-input': {
    //     import: async () => await import('src/app/widgets/manual-input/manual-input.module'),
    // },

    // 'shift-pass': {
    //     import: async () => await import('src/app/widgets/shift-pass/shift-pass.module'),
    // },
    // 'shift-accept': {
    //     import: async () => await import('src/app/widgets/shift-accept/shift-accept.module'),
    // },
    // 'events-workspace': {
    //     import: async () => await import('src/app/widgets/events-workspace/events-workspace.module'),
    // },
    // 'truncated-diagram-percentage': {
    //     import: async () => await import('src/app/widgets/truncated-diagram-percentage/truncated-diagram-percentage.module'),
    // },
    // 'truncated-diagram-traffic-light': {
    //     import: async () => await import('src/app/widgets/truncated-diagram-traffic-light/truncated-diagram-traffic-light.module'),
    // },
    // 'truncated-diagram-counter': {
    //     import: async () => await import('src/app/widgets/truncated-diagram-counter/truncated-diagram-counter.module'),
    // },
    // 'point-diagram': {
    //     import: async () => await import('src/app/widgets/point-diagram/point-diagram.module'),
    // },

    'industrial-pyramid': {
        import: async () => {
            return await import('src/app/widgets/production-pyramid/production-pyramid.module');
        },
        module: 'ProductionPyramidModule',
        itemCols: 20,
        itemRows: 16,
        minItemCols: 20,
        minItemRows: 16,
        preview: 'industrial-pyramid',
    },

    // 'bar-chart': {
    //     import: async () => await import('src/app/widgets/bar-chart/bar-chart.module'),
    // },
    // 'enterprise-map': {
    //     import: async () => await import('src/app/widgets/enterprise-map/enterprise-map.module'),
    // },
    // 'circle-diagram': {
    //     import: async () => await import('src/app/widgets/circle-diagram/circle-diagram.module'),
    // },
    // 'unity-template': {
    //     import: async () => await import('src/app/widgets/unity-template/unity-template.module'),
    // },
    // 'map-ecology': {
    //     import: async () => await import('src/app/widgets/map-ecology/map-ecology.module'),
    // },
    // 'operation-efficiency': {
    //     import: async () => await import('src/app/widgets/operation-efficiency/operation-efficiency.module'),
    // },
    // 'ecology-safety': {
    //     import: async () => await import('src/app/widgets/ecology-safety/ecology-safety.module'),
    // },
    // 'calendar-plan': {
    //     import: async () => await import('src/app/widgets/calendar-plan/calendar-plan.module'),
    // },
    // 'ring-factory-diagram': {
    //     import: async () => await import('src/app/widgets/ring-factory-diagram/ring-factory-diagram.module'),
    // },
    // 'chain-map': {
    //     import: async () => await import('src/app/widgets/chain-map/chain-map.module'),
    // },
    // 'energetics': {
    //     import: async () => await import('src/app/widgets/energetics/energetics.module'),
    // },
    // 'dispatcher-screen': {
    //     import: async () => await import('src/app/widgets/dispatcher-screen/dispatcher-screen.module'),
    // },
    // 'table-data': {
    //     import: async () => await import('src/app/widgets/table-data/table-data.module'),
    // },
    // 'deviations-table': {
    //     import: async () => await import('src/app/widgets/deviations-table/deviations-table.module'),
    // },
    // 'triggering-critical-parameters': {
    //     import: async () => await import('src/app/widgets/triggering-critical-parameters/triggering-critical-parameters.module'),
    // },
    // 'circle-factory-diagram': {
    //     import: async () => await import('src/app/widgets/circle-factory-diagram/circle-factory-diagram.module'),
    // },
    // 'product-stocks': {
    //     import: async () => await import('src/app/widgets/product-stocks/product-stocks.module'),
    // },
    // 'polar-chart': {
    //     import: async () => await import('src/app/widgets/polar-chart/polar-chart.module'),
    // },
    // 'semicircle-energy': {
    //     import: async () => await import('src/app/widgets/semicircle-energy/semicircle-energy.module'),
    // },
    // 'deviation-circle-diagram': {
    //     import: async () => await import('src/app/widgets/deviation-circle-diagram/deviation-circle-diagram.module'),
    // },
    // 'oil-control': {
    //     import: async () => await import('src/app/widgets/oil-control/oil-control.module'),
    // },
    // 'circle-block-diagram': {
    //     import: async () => await import('src/app/widgets/circle-block-diagram/circle-block-diagram.module'),
    // },
    // 'column-chart-stacked': {
    //     import: async () => await import('src/app/widgets/column-chart-stacked/column-chart-stacked.module'),
    // },
    // 'flame-diagram': {
    //     import: async () => await import('src/app/widgets/flame-diagram/flame-diagram.module'),
    // },
    // 'ring-energy-indicator': {
    //     import: async () => await import('src/app/widgets/ring-energy-indicator/ring-energy-indicator.module'),
    // },
    // 'time-line-diagram': {
    //     import: async () => await import('src/app/widgets/time-line-diagram/time-line-diagram.module'),
    // },
    // 'solid-gauge-with-marker': {
    //     import: async () => await import('src/app/widgets/solid-gauge-with-marker/solid-gauge-with-marker.module'),
    // },
    // 'observation-norm-tr': {
    //     import: async () => await import('src/app/widgets/observation-norm-tr/observation-norm-tr.module'),
    // },
    // 'admin-shift-schedule': {
    //     import: async () => await import('src/app/widgets/admin-shift-schedule/admin-shift-schedule.module'),
    // },
    // 'admin-references': {
    //     import: async () => await import('src/app/widgets/admin-references/admin-references.module'),
    // },
    // 'petroleum-products-movement': {
    //     import: async () => await import('src/app/widgets/petroleum-products-movement/petroleum-products-movement.module'),
    // },
    // 'admin-panel': {
    //     import: async () => await import('src/app/widgets/admin-panel/admin-panel.module'),
    // },
    // 'reference': {
    //     import: async () => await import('src/app/widgets/reference/reference.module'),
    // },
    // 'report-server-configurator': {
    //     import: async () => await import('src/app/widgets/report-server-configurator/report-server-configurator.module'),
    // },
    // 'tank-calibration-table': {
    //     import: async () => await import('src/app/widgets/tank-calibration-table/tank-calibration-table.module'),
    // },
    // 'custom-report-properties-reference': {
    //     import: async () => await import('src/app/widgets/custom-report-properties-reference/custom-report-properties-reference.module'),
    // },
    // 'production-trend': {
    //     import: async () => await import('src/app/widgets/production-trend/production-trend.module'),
    // },
    // 'tank-information': {
    //     import: async () => await import('src/app/widgets/tank-information/tank-information.module'),
    // },
    // 'reasons-deviations': {
    //     import: async () => await import('src/app/widgets/reasons-deviations/reasons-deviations.module'),
    // },
    // 'document-viewer': {
    //     import: async () => await import('src/app/widgets/document-viewer/document-viewer.module'),
    // },
    // 'documents-scans': {
    //     import: async () => await import('src/app/widgets/documents-scans/documents-scans.module'),
    // },
    // 'quality-docs-panel': {
    //     import: async () => await import('src/app/widgets/quality-docs-panel/quality-docs-panel.module'),
    // },
    // 'document-coding': {
    //     import: async () => await import('src/app/widgets/document-coding/document-coding.module'),
    // },
    // 'oil-operations': {
    //     import: async () => await import('src/app/widgets/oil-operations/oil-operations.module'),
    // },
    // 'workflow': {
    //     import: async () => await import('src/app/widgets/workflow/workflow.module'),
    // },
    // 'cd-critical': {
    //     import: async () => await import('src/app/widgets/cd-critical/cd-critical.module'),
    // },
    'implementation-plan': {
        import: async () =>
            await import('src/app/widgets/SMP/implementation-plan/implementation-plan.module'),
        module: 'ImplementationPlanModule',
        itemCols: 9,
        itemRows: 7,
        minItemCols: 9,
        minItemRows: 7,
        preview: 'implementation-plan',
    },
    'performance-progress-indicators': {
        import: async () =>
            await import(
                'src/app/widgets/SMP/performance-progress-indicators/performance-progress-indicators.module'
            ),
        module: 'PerformanceProgressIndicatorsModule',
        itemCols: 9,
        itemRows: 7,
        minItemCols: 9,
        minItemRows: 7,
        preview: 'performance-progress-indicators',
    },
    'quality-stock': {
        import: async () => await import('src/app/widgets/SMP/quality-stock/quality-stock.module'),
        module: 'QualityStockModule',
        itemCols: 14,
        itemRows: 14,
        minItemCols: 14,
        minItemRows: 14,
        preview: 'quality-stock',
    },
    'smp-events': {
        import: async () => await import('src/app/widgets/SMP/smp-events/smp-events.module'),
        module: 'SmpEventsModule',
        itemCols: 14,
        itemRows: 20,
        minItemCols: 14,
        minItemRows: 20,
        preview: 'smp-events',
    },
    'smp-events-workspace': {
        import: async () =>
            await import('src/app/widgets/SMP/smp-events-workspace/smp-events-workspace.module'),
        module: 'SmpEventsWorkspaceModule',
        itemCols: 20,
        itemRows: 30,
        minItemCols: 20,
        minItemRows: 30,
        preview: 'smp-events-workspace',
    },
    'product-groups': {
        import: async () =>
            await import('src/app/widgets/SMP/product-groups/product-groups.module'),
        module: 'ProductGroupsModule',
        itemCols: 25,
        itemRows: 20,
        minItemCols: 20,
        minItemRows: 17,
        preview: 'product-groups',
    },
    'production-deviations': {
        import: async () => {
            {
                return await import(
                    'src/app/widgets/SMP/production-deviations/production-deviations.module'
                );
            }
        },
        module: 'ProductionDeviationsModule',
        itemCols: 37,
        itemRows: 27,
        minItemCols: 37,
        minItemRows: 27,
        preview: 'production-deviations',
    },
    // 'product-groups-short': {
    //     import: async () => await import('src/app/widgets/product-groups-short/product-groups-short.module'),
    // },

    'product-groups-short': {
        import: async () =>
            await import('src/app/widgets/SMP/product-groups-short/product-groups-short.module'),
        module: 'ProductGroupsShortModule',
        itemCols: 25,
        itemRows: 20,
        minItemCols: 20,
        minItemRows: 17,
        preview: 'product-groups-short',
    },
    // 'astue-efficiency': {
    //     import: async () => await import('src/app/widgets/astue-efficiency/astue-efficiency.module'),
    // },
};
