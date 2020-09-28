import { LineChartComponent } from '../../widgets/line-chart/line-chart.component';
import { ManualInputComponent } from '../../widgets/manual-input/manual-input.component';
import { ChangeShiftComponent } from '../../widgets/change-shift/change-shift.component';
import { EnergeticsComponent } from '../../widgets/energetics/energetics.component';
import { WidgetPiesComponent } from '../../widgets/widgets-pie/widget-pies/widget-pies.component';
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
import { ReportServerConfiguratorComponent } from '../../widgets/report-server-configurator/report-server-configurator.component';
import { ReferenceComponent } from '../../widgets/reference/reference.component';
import { TankCalibrationTableComponent } from '../../widgets/tank-calibration-table/tank-calibration-table.component';
import { CustomReportPropertiesReferenceComponent } from '../../widgets/custom-report-properties-reference/custom-report-properties-reference.component';
import { ProductionTrendComponent } from '../../widgets/production-trend/production-trend.component';
import { ReasonsDeviationsComponent } from '../../widgets/reasons-deviations/reasons-deviations.component';
import { DocumentViewerComponent } from '../../widgets/document-viewer/document-viewer.component';
import { DocumentsScansComponent } from '../../widgets/documents-scans/documents-scans.component';
import { QualityDocsPanelComponent } from '../../widgets/quality-docs-panel/quality-docs-panel.component';
import { DocumentCodingComponent } from '../../widgets/document-coding/document-coding.component';
import { OilOperationsComponent } from '../../widgets/oil-operations/oil-operations.component';
import { WorkflowComponent } from '../../widgets/workflow/workflow.component';
import { CdCriticalComponent } from '../../widgets/cd-critical/cd-critical.component';
import { TruncatedDiagramTrafficLightComponent } from '../../widgets/truncated-diagram-traffic-light/truncated-diagram-traffic-light.component';
import { WidgetContainerComponent } from '../../widget-container/widget-container.component';
import { AdminShiftScheduleOldComponent } from '../../widgets/admin-widget/admin-shift-schedule-old/admin-shift-schedule-old.component';
import { CdMatBalanceChartCardComponent } from '../../../widgets/CD/cd-mat-balance/components/cd-mat-balance-chart-card/cd-mat-balance-chart-card.component';
import { TankInformationComponent } from '../../widgets/tank-information/tank-information.component';
import { OzsmResourcesCircleDiagramComponent } from 'src/app/widgets/OZSM/ozsm-shared/ozsm-resources-circle-diagram/ozsm-resources-circle-diagram.component';

export const WIDGETS = {
    'pie-diagram': WidgetPiesComponent,
    'line-chart': LineChartComponent,
    'manual-input': ManualInputComponent,
    'shift-pass': ChangeShiftComponent,
    'shift-accept': ChangeShiftComponent,
    'events-workspace': WidgetContainerComponent,
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
    'admin-panel': WidgetContainerComponent,
    reference: ReferenceComponent,
    'report-server-configurator': ReportServerConfiguratorComponent,
    'tank-calibration-table': TankCalibrationTableComponent,
    'custom-report-properties-reference': CustomReportPropertiesReferenceComponent,
    'production-trend': ProductionTrendComponent,
    'reasons-deviations': ReasonsDeviationsComponent,
    'document-viewer': DocumentViewerComponent,
    'documents-scans': DocumentsScansComponent,
    'quality-docs-panel': QualityDocsPanelComponent,
    'document-coding': DocumentCodingComponent,
    'oil-operations': OilOperationsComponent,
    'tank-information': TankInformationComponent,
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
    'astue-efficiency': WidgetContainerComponent,
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
    'kpe-safety': WidgetContainerComponent,
    events: WidgetContainerComponent,
    'events-ed': WidgetContainerComponent,
    'cd-events': WidgetContainerComponent,
    'spline-trends-chart': WidgetContainerComponent,
    'cd-mat-balance': WidgetContainerComponent,
    'cd-deviation-mat': WidgetContainerComponent,
    'cd-reactor-parameters': WidgetContainerComponent,
    'sou-operational-accounting-system': WidgetContainerComponent,
    'astue-onpz-conventional-fuel': WidgetContainerComponent,
    'astue-onpz-conventional-fuel-predictors': WidgetContainerComponent,
    'astue-onpz-predictors': WidgetContainerComponent,
    'astue-onpz-main-indicators': WidgetContainerComponent,
    'astue-onpz-product-charts': WidgetContainerComponent,
    'astue-onpz-menu-structure': WidgetContainerComponent,
    'astue-onpz-consumption-indicators': WidgetContainerComponent,
    'astue-onpz-deviation-cards': WidgetContainerComponent,
    'astue-onpz-planning-charts': WidgetContainerComponent,
    'astue-onpz-interactive-indicators': WidgetContainerComponent,
    'nk-tank-information': WidgetContainerComponent,
    'ozsm-resources-circle-diagram': WidgetContainerComponent,
    // TODO
    'cd-mat-balance-sensor': CdMatBalanceChartCardComponent,
    'cd-mat-balance-stream': CdMatBalanceChartCardComponent,
    //
    'line-diagram': WidgetContainerComponent,
    'evj-events': WidgetContainerComponent,
    'ejco-onpz-unit-sou': WidgetContainerComponent,
    'ejco-onpz-fsb-load': WidgetContainerComponent,
    'ejco-onpz-unit-kpe': WidgetContainerComponent,
    'ozsm-components': WidgetContainerComponent,
    'ozsm-diagrams': WidgetContainerComponent,
    'ozsm-main-indicators': WidgetContainerComponent,
    'oq-oil-quality': WidgetContainerComponent,
    'ozsm-circle-planning-diagram': WidgetContainerComponent,
    'ozsm-main-toggle': WidgetContainerComponent,
    'ozsm-scenarios': WidgetContainerComponent,
    'ozsm-planning-main': WidgetContainerComponent,
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
        preview: 'load-chart'
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
        preview: 'scenarios'
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
        preview: 'gant-chart'
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
        preview: 'aps-recipe-diagram'
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
        preview: 'facility-deviation'
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
        preview: 'raw-motion'
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
        preview: 'stocks-using'
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
        preview: 'deviation-details'
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
        preview: 'production-details'
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
        preview: 'indicator-load-deviation'
    },

    // #endregion APS

    // #region NK

    'nk-tank-information': {
        import: async () => {
            return await import(
                'src/app/widgets/NK/nk-tank-information.module'
                );
        },
        module: 'NkTankInformationModule',
        itemCols: 19,
        itemRows: 12,
        minItemCols: 19,
        minItemRows: 12,
        preview: 'default'
    },

    // #endregion NK

    // #region OZSM
    'ozsm-resources-circle-diagram': {
        import: async () => {
            return await import(
                'src/app/widgets/OZSM/ozsm-shared/ozsm-resources-circle-diagram/ozsm-resources-circle-diagram.module'
                );
        },
        module: 'OzsmResourcesCircleDiagramModule',
        itemCols: 19,
        itemRows: 5,
        minItemCols: 19,
        minItemRows: 5,
        preview: 'default'
    },
    // #endregion OZSM

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
        preview: 'key-performance-indicators'
    },
    'kpe-quality': {
        import: async () => {
            return await import('src/app/widgets/KPE/kpe-quality/kpe-quality.module');
        },
        module: 'KpeQualityModule',
        itemCols: 21,
        itemRows: 22,
        minItemCols: 21,
        minItemRows: 22,
        preview: 'kpe-quality'
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
        preview: 'kpe-readiness'
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
        preview: 'kpe-energetic'
    },

    'kpe-safety': {
        import: async () => {
            return await import('src/app/widgets/KPE/kpe-safety/kpe-safety.module');
        },
        module: 'KpeSafetyModule',
        itemCols: 15,
        itemRows: 7,
        minItemCols: 15,
        minItemRows: 6,
        preview: 'default'
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
        preview: 'admin-shift-schedule'
    },
    'admin-panel': {
        import: async () => {
            return await import('src/app/widgets/admin/admin-panel/admin-panel.module');
        },
        module: 'AdminPanelModule',
        itemCols: 43,
        itemRows: 28,
        minItemCols: 43,
        minItemRows: 28,
        preview: 'admin-panel'
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
        preview: 'cd-events'
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
        preview: 'cd-mat-balance'
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
        preview: 'cd-reactor-parameters'
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
        preview: 'cd-deviation-mat'
    },

    // #endregion CD

    // #region EVJ

    events: {
        import: async () => {
            return await import('src/app/widgets/EVJ/events/events.module');
        },
        module: 'EventsModule',
        itemCols: 32,
        itemRows: 20,
        minItemCols: 32,
        minItemRows: 20,
        preview: 'events'
    },

    'events-ed': {
        import: async () => {
            return await import('src/app/widgets/EVJ/events/events.module');
        },
        module: 'EventsModule',
        itemCols: 32,
        itemRows: 30,
        minItemCols: 32,
        minItemRows: 30,
        preview: 'events'
    },

    'events-workspace': {
        import: async () => {
            return await import('src/app/widgets/EVJ/events-workspace/events-workspace.module');
        },
        module: 'EventsWorkspaceModule',
        itemCols: 32,
        itemRows: 20,
        minItemCols: 32,
        minItemRows: 20,
        preview: 'events-workspace'
    },

    'evj-events': {
        import: async () => {
            return await import('src/app/widgets/EVJ/evj-events/evj-events.module');
        },
        module: 'EvjEventsModule',
        itemCols: 32,
        itemRows: 30,
        minItemCols: 32,
        minItemRows: 30,
        preview: 'cd-events'
    },

    // #endregion EVJ

    //#region LCO
    'spline-trends-chart': {
        import: async () => {
            return await import(
                'src/app/widgets/LCO/spline-trends-chart/spline-trends-chart.module'
                );
        },
        module: 'SplineTrendsChartModule',
        itemCols: 21,
        itemRows: 10,
        minItemCols: 21,
        minItemRows: 10,
        preview: 'spline-trends-chart'
    },

    'industrial-pyramid': {
        import: async () => {
            return await import('src/app/widgets/LCO/production-pyramid/production-pyramid.module');
        },
        module: 'ProductionPyramidModule',
        itemCols: 20,
        itemRows: 16,
        minItemCols: 20,
        minItemRows: 16,
        preview: 'industrial-pyramid'
    },

    'line-diagram': {
        import: async () => {
            return await import('src/app/widgets/LCO/line-diagram/line-diagram.module');
        },
        module: 'LineDiagramModule',
        itemCols: 20,
        itemRows: 16,
        minItemCols: 20,
        minItemRows: 16,
        preview: 'line-diagram'
    },

    //#endregion LCO

    //#region SMP
    'implementation-plan': {
        import: async () =>
            await import('src/app/widgets/SMP/implementation-plan/implementation-plan.module'),
        module: 'ImplementationPlanModule',
        itemCols: 9,
        itemRows: 7,
        minItemCols: 9,
        minItemRows: 7,
        preview: 'implementation-plan'
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
        preview: 'performance-progress-indicators'
    },

    'quality-stock': {
        import: async () => await import('src/app/widgets/SMP/quality-stock/quality-stock.module'),
        module: 'QualityStockModule',
        itemCols: 14,
        itemRows: 14,
        minItemCols: 14,
        minItemRows: 14,
        preview: 'quality-stock'
    },

    'smp-events': {
        import: async () => await import('src/app/widgets/SMP/smp-events/smp-events.module'),
        module: 'SmpEventsModule',
        itemCols: 14,
        itemRows: 20,
        minItemCols: 14,
        minItemRows: 20,
        preview: 'smp-events'
    },

    'smp-events-workspace': {
        import: async () =>
            await import('src/app/widgets/SMP/smp-events-workspace/smp-events-workspace.module'),
        module: 'SmpEventsWorkspaceModule',
        itemCols: 20,
        itemRows: 30,
        minItemCols: 20,
        minItemRows: 30,
        preview: 'smp-events-workspace'
    },

    'product-groups': {
        import: async () =>
            await import('src/app/widgets/SMP/product-groups/product-groups.module'),
        module: 'ProductGroupsModule',
        itemCols: 25,
        itemRows: 20,
        minItemCols: 20,
        minItemRows: 17,
        preview: 'product-groups'
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
        preview: 'production-deviations'
    },

    'product-groups-short': {
        import: async () =>
            await import('src/app/widgets/SMP/product-groups-short/product-groups-short.module'),
        module: 'ProductGroupsShortModule',
        itemCols: 25,
        itemRows: 20,
        minItemCols: 20,
        minItemRows: 17,
        preview: 'product-groups-short'
    },
    //#endregion SMP

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
        preview: 'sou-operational-accounting-system'
    },

    // #endregion SOU

    //#region ASTUE-MNPZ

    'astue-efficiency': {
        import: async () =>
            await import(
                'src/app/widgets/ASTUE-MNPZ/astue-mnpz-efficiency/astue-mnpz-efficiency.module'
                ),
        module: 'AstueMnpzEfficiencyModule',
        itemCols: 58,
        itemRows: 25,
        minItemCols: 58,
        minItemRows: 20,
        preview: 'astue-efficiency'
    },
    //#endregion ASTUE-MNPZ

    //#region ASTUE-ONPZ

    'astue-onpz-conventional-fuel': {
        import: async () => {
            return await import(
                // tslint:disable-next-line:max-line-length
                'src/app/widgets/ASTUE-ONPZ/astue-onpz-conventional-fuel/astue-onpz-conventional-fuel.module'
                );
        },
        module: 'AstueOnpzConventionalFuelModule',
        itemCols: 30,
        itemRows: 18,
        minItemCols: 30,
        minItemRows: 16,
        preview: 'astue-onpz-conventional-fuel'
    },

    'astue-onpz-conventional-fuel-predictors': {
        import: async () => {
            return await import(
                // tslint:disable-next-line:max-line-length
                'src/app/widgets/ASTUE-ONPZ/astue-onpz-conventional-fuel/astue-onpz-conventional-fuel.module'
                );
        },
        module: 'AstueOnpzConventionalFuelModule',
        itemCols: 30,
        itemRows: 18,
        minItemCols: 30,
        minItemRows: 16,
        preview: 'astue-onpz-conventional-fuel'
    },

    'astue-onpz-predictors': {
        import: async () => {
            return await import(
                'src/app/widgets/ASTUE-ONPZ/astue-onpz-predictors/astue-onpz-predictors.module'
                );
        },
        module: 'AstueOnpzPredictorsModule',
        itemCols: 13,
        itemRows: 10,
        minItemCols: 13,
        minItemRows: 10,
        preview: 'astue-onpz-predictors'
    },

    'astue-onpz-main-indicators': {
        import: async () => {
            return await import(
                'src/app/widgets/ASTUE-ONPZ/astue-onpz-main-indicators/astue-onpz-main-indicators.module'
                );
        },
        module: 'AstueOnpzMainIndicatorsModule',
        itemCols: 13,
        itemRows: 8,
        minItemCols: 13,
        minItemRows: 8,
        preview: 'astue-onpz-main-indicators'
    },

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
        preview: 'astue-onpz-product-charts'
    },

    'astue-onpz-menu-structure': {
        import: async () => {
            return await import(
                'src/app/widgets/ASTUE-ONPZ/astue-onpz-menu-structure/astue-onpz-menu-structure.module'
                );
        },
        module: 'AstueOnpzMenuStructureModule',
        itemCols: 11,
        itemRows: 8,
        minItemCols: 11,
        minItemRows: 8,
        preview: 'astue-onpz-menu-structure'
    },

    'astue-onpz-consumption-indicators': {
        import: async () => {
            return await import(
                'src/app/widgets/ASTUE-ONPZ/astue-onpz-consumption-indicators/astue-onpz-consumption-indicators.module'
                );
        },
        module: 'AstueOnpzConsumptionIndicatorsModule',
        itemCols: 11,
        itemRows: 6,
        minItemCols: 11,
        minItemRows: 6,
        preview: 'astue-onpz-consumption-indicators'
    },

    'astue-onpz-deviation-cards': {
        import: async () => {
            return await import(
                'src/app/widgets/ASTUE-ONPZ/astue-onpz-deviation-cards/astue-onpz-deviation-cards.module'
                );
        },
        module: 'AstueOnpzDeviationCardsModule',
        itemCols: 13,
        itemRows: 28,
        minItemCols: 13,
        minItemRows: 23,
        preview: 'astue-onpz-deviation-cards'
    },

    'astue-onpz-planning-charts': {
        import: async () => {
            return await import(
                'src/app/widgets/ASTUE-ONPZ/astue-onpz-planning-charts/astue-onpz-planning-charts.module'
                );
        },
        module: 'AstueOnpzPlanningChartsModule',
        itemCols: 30,
        itemRows: 12,
        minItemCols: 30,
        minItemRows: 12
        // preview: 'astue-onpz-planning-charts',
    },

    'astue-onpz-interactive-indicators': {
        import: async () => {
            return await import(
                'src/app/widgets/ASTUE-ONPZ/astue-onpz-interactive-indicators/astue-onpz-interactive-indicators.module'
                );
        },
        module: 'AstueOnpzInteractiveIndicatorsModule',
        itemCols: 24,
        itemRows: 10,
        minItemCols: 24,
        minItemRows: 10
        // preview: 'astue-onpz-interactive-indicators',
    },
    'ejco-onpz-unit-sou': {
        import: async () => {
            return await import(
                'src/app/widgets/EJCO-ONPZ/ejco-onpz-unit-sou/ejco-onpz-unit-sou.module'
                );
        },
        module: 'EjcoOnpzUnitSouModule',
        itemCols: 28,
        itemRows: 7,
        minItemCols: 28,
        minItemRows: 7
        // preview: 'ejco-onpz-unit-sou',
    },
    'ejco-onpz-fsb-load': {
        import: async () => {
            return await import(
                'src/app/widgets/EJCO-ONPZ/ejco-onpz-fsb-load/ejco-onpz-fsb-load.module'
                );
        },
        module: 'EjcoOnpzFsbLoadModule',
        itemCols: 12,
        itemRows: 7,
        minItemCols: 12,
        minItemRows: 7
        // preview: 'ejco-onpz-fsb-load',
    },
    'ejco-onpz-unit-kpe': {
        import: async () => {
            return await import(
                'src/app/widgets/EJCO-ONPZ/ejco-onpz-unit-kpe/ejco-onpz-unit-kpe.module'
                );
        },
        module: 'EjcoOnpzUnitKpeModule',
        itemCols: 12,
        itemRows: 7,
        minItemCols: 12,
        minItemRows: 7
        // preview: 'ejco-onpz-unit-kpe',
    },

    //#endregion ASTUE-ONPZ

    // #region OZSM

    'ozsm-components': {
        import: async () => {
            return await import(
                'src/app/widgets/OZSM/ozsm-line-diagrams/ozsm-line-diagrams.module'
                );
        },
        module: 'OzsmLineDiagramsModule',
        itemCols: 12,
        itemRows: 7,
        minItemCols: 12,
        minItemRows: 7,
        preview: 'ozsm-line-diagrams'
    },
    'ozsm-diagrams': {
        import: async () => {
            return await import(
                'src/app/widgets/OZSM/ozsm-diagrams-widget/ozsm-diagrams-widget.module'
                );
        },
        module: 'OzsmDiagramsWidgetModule',
        itemCols: 13,
        itemRows: 24,
        minItemCols: 13,
        minItemRows: 24,
        // preview: 'ozsm-diagrams',
    },
    'ozsm-main-indicators': {
        import: async () => {
            return await import(
                'src/app/widgets/OZSM/ozsm-main-indicators/ozsm-main-indicators.module'
                );
        },
        module: 'OzsmMainIndicatorsModule',
        itemCols: 12,
        itemRows: 4,
        minItemCols: 12,
        minItemRows: 4,
        preview: 'default'
    },
    'ozsm-circle-planning-diagram': {
        import: async () => {
            return await import(
                'src/app/widgets/OZSM/ozsm-circle-planning-diagram/ozsm-circle-planning-diagram.module'
                );
        },
        module: 'OzsmCirclePlanningDiagramModule',
        itemCols: 25,
        itemRows: 5,
        minItemCols: 25,
        minItemRows: 5,
        preview: 'default'
    },

    'ozsm-main-toggle': {
        import: async () => {
            return await import(
                'src/app/widgets/OZSM/ozsm-main-toggle/ozsm-main-toggle.module'
            );
        },
        module: 'OzsmMainToggleModule',
        itemCols: 10,
        itemRows: 2,
        minItemCols: 10,
        minItemRows: 2,
        preview: 'default',
    },

    'ozsm-scenarios': {
        import: async () => {
            return await import('src/app/widgets/OZSM/ozsm-scenarios/ozsm-scenarios.module');
        },
        module: 'OzsmScenariosModule',
        itemCols: 15,
        itemRows: 10,
        minItemCols: 15,
        minItemRows: 10,
        preview: 'default'
    },

    'ozsm-planning-main': {
        import: async () => {
            return await import(
                'src/app/widgets/OZSM/ozsm-planning-main/ozsm-planning-main.module'
                );
        },
        module: 'OzsmPlanningMainModule',
        itemCols: 10,
        itemRows: 2,
        minItemCols: 10,
        minItemRows: 2,
        preview: 'default',
    },

    //#endregion OZSM

    //#region OQ

    'oq-oil-quality': {
        import: async () =>
            await import(
                'src/app/widgets/OQ/oq-oil-quality/oq-oil-quality.module'
                ),
        module: 'OqOilQualityModule',
        itemCols: 10,
        itemRows: 10,
        minItemCols: 10,
        minItemRows: 10,
        preview: 'default'
    }

    //#endregion OQ

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

    // 'product-groups-short': {
    //     import: async () => await import('src/app/widgets/product-groups-short/product-groups-short.module'),
    // },
};
