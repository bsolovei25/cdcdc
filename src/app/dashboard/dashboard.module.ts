import { ChangeShiftComponent } from './widgets/change-shift/change-shift.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PeriodSelectorComponent } from './components/period-selector/period-selector.component';
import { IndicatorSelectorComponent } from './components/indicator-selector/indicator-selector.component';
import { LineChartComponent } from './widgets/line-chart/line-chart.component';
import { DndModule } from 'ngx-drag-drop';
import { DashboardComponent } from './pages/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { EventsComponent } from './widgets/events/events.component';
import { ManualInputComponent } from './widgets/manual-input/manual-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LineDiagramComponent } from './widgets/line-diagram/line-diagram.component';
import { LineDatetimeComponent } from './components/line-datetime/line-datetime.component';
import { ShiftPersonComponent } from './widgets/change-shift/shift-person/shift-person.component';
import { NewWidgetsPanelComponent } from './components/new-widgets-panel/new-widgets-panel.component';
import { NewWidgetsGridComponent } from './components/new-widgets-grid/new-widgets-grid.component';
import { GridsterModule } from 'angular-gridster2';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { WidgetPiesComponent } from './widgets/widgets-pie/widget-pies/widget-pies.component';
import { WidgetsPieComponent } from './widgets/widgets-pie/widget-pie-circle/widget-pie.component';
import { WidgetHeaderComponent } from './components/widget-header/widget-header.component';
import { EventsWorkSpaceComponent } from './widgets/workspace/events-workspace.component';
import { FrameTopComponent } from './components/frame-top/frame-top.component';
import { FrameBottomComponent } from './components/frame-bottom/frame-bottom.component';
import { TruncatedPieFirstComponent } from './widgets/truncated-pie-first/truncated-pie-first/truncated-pie-first.component';
import { TruncatedPieSFirstComponent } from './widgets/truncated-pie-first/truncated-pie-s-first/truncated-pie-s-first.component';
import { TruncatedPieSIconComponent } from './widgets/truncated-pie-icon/truncated-pie-s-icon/truncated-pie-s-icon.component';
import { TruncatedPieIconComponent } from './widgets/truncated-pie-icon/truncated-pie-icon/truncated-pie-icon.component';
import { PointDiagramComponent } from './widgets/point-diagram/point-diagram.component';
import { OneColumnComponent } from './widgets/point-diagram/one-column/one-column.component';
import { ProductionPyramidComponent } from './widgets/production-pyramid/production-pyramid.component';
import { BarChartsComponent } from './widgets/bar-chart/bar-charts/bar-charts.component';
import { BarChartComponent } from './widgets/bar-chart/bar-chart/bar-chart.component';
import { SuspenseMachineComponent } from './widgets/suspense-machine/suspense-machine.component';
import { EnterpriseMapComponent } from './widgets/map-enterprise/enterprise-map.component';
import { DetailedLineDiagramComponent } from './components/detailed-line-diagram/detailed-line-diagram.component';
import { OperationEfficiencyComponent } from './widgets/operation-efficiency/operation-efficiency.component';
import { MapEcologyComponent } from './widgets/map-ecology/map-ecology.component';
import { UnityTemplateComponent } from './widgets/unity-template/unity-template.component';
import { PowIndexPipe } from './pipes/pow-index.pipe';
import { RingFactoryDiagramComponent } from './widgets/ring-factory-diagrams/ring-factory-diagram/ring-factory-diagram.component';
import { LineChartWorkspaceComponent } from './widgets/workspace/components/line-chart-workspace/line-chart-workspace.component';
import { RingSFactoryDiagramComponent } from './widgets/ring-factory-diagrams/ring-s-factory-diagram/ring-s-factory-diagram.component';
import { CalendarPlanComponent } from './widgets/calendar-plan/calendar-plan.component';
import { EcologySafetyComponent } from './widgets/ecology-safety/ecology-safety.component';
import { ChainMapComponent } from './widgets/chain-map/chain-map.component';
import { DispatcherScreenComponent } from './widgets/dispatcher-screen/dispatcher-screen.component';
import { EnergeticsComponent } from './widgets/energetics/energetics.component';
import { CircleDiagramComponent } from './widgets/circle-diagram/circle-diagram.component';
import { DeviationsTableComponent } from './widgets/deviations-table/deviations-table.component';
import { TriggeringCriticalParametersComponent } from './widgets/triggering-critical-parameters/triggering-critical-parameters.component';
import { CircleFactoryDiagramComponent } from './widgets/circle-factory-diagram/circle-factory-diagram.component';
import { SemicircleEnergyComponent } from './widgets/semicircle-energy/semicircle-energy.component';
import { ProductStocksComponent } from './widgets/product-stocks/product-stocks.component';
import { PolarChartComponent } from './widgets/polar-chart/polar-chart.component';
import { DeviationCircleDiagramComponent } from './widgets/deviation-circle-diagram/deviation-circle-diagram.component';
import { OilControlComponent } from './widgets/oil-control/oil-control.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { PaginatorDirective } from './components/paginator/paginator.directive';
import { SearchComponent } from './components/search/search.component';
import { WidgetPreviewComponent } from './components/widget-preview/widget-preview.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CircleBlockDiagramComponent } from './widgets/circle-block-diagram/circle-block-diagram.component';
import { ColumnChartStackedComponent } from './widgets/column-chart-stacked/column-chart-stacked.component';
import { CcsOneColumnComponent } from './widgets/column-chart-stacked/ccs-one-column/ccs-one-column.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlameDiagramComponent } from './widgets/flame-diagram/flame-diagram.component';
import { RingEnergyIndicatorComponent } from './widgets/ring-energy-indicator/ring-energy-indicator.component';
import { SolidGaugesComponent } from './widgets/solid-gauge-with-marker/solid-gauges/solid-gauges.component';
import { SolidGaugeWithMarkerComponent } from './widgets/solid-gauge-with-marker/solid-gauge-with-marker/solid-gauge-with-marker.component';
import { SearchFilterComponent } from './components/search/search-filter/search-filter.component';
import { SearchInputComponent } from './components/search/search-input/search-input.component';
import { SearchListComponent } from './components/search/search-list/search-list.component';
import { TimeLineDiagramComponent } from './widgets/time-line-diagram/time-line-diagram.component';
import { TimeDiagramComponent } from './widgets/time-line-diagram/time-diagram/time-diagram.component';
import { ObservationNormTRComponent } from './widgets/observation-norm-tr/observation-norm-tr.component';
import { AdminPanelComponent } from './widgets/admin-panel/admin-panel.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AdminShiftScheduleComponent } from './widgets/admin-widget/admin-shift-schedule/admin-shift-schedule.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { AdminReferencesComponent } from './widgets/admin-references/admin-references.component';
import { CardVerifierComponent } from './widgets/change-shift/card-verifier/card-verifier.component';
import { PetroleumProductsMovementComponent } from './widgets/petroleum-products-movement/petroleum-products-movement.component';
import { PetroleumReferenceLeftComponent } from './widgets/petroleum-products-movement/petroleum-reference-left/petroleum-reference-left.component';
import { PetroleumReferenceRightComponent } from './widgets/petroleum-products-movement/petroleum-reference-right/petroleum-reference-right.component';
import { PetroleumReferenceComponent } from './widgets/petroleum-products-movement/petroleum-reference/petroleum-reference.component';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule as OldScrollingModule } from '@angular/cdk/scrolling';
import { AdminEmployeeComponent } from './widgets/admin-panel/admin-employee/admin-employee.component';
import { AdminWorkspaceComponent } from './widgets/admin-panel/admin-workspace/admin-workspace.component';
import { AdminClaimsComponent } from './widgets/admin-panel/admin-workspace/admin-claims/admin-claims.component';
import { AdminBrigadesComponent } from './widgets/admin-panel/admin-brigades/admin-brigades.component';
import { AdminWorkerSettingsComponent } from './widgets/admin-panel/admin-worker-settings/admin-worker-settings.component';
import { AwsCardComponent } from './widgets/admin-panel/admin-worker-settings/aws-card/aws-card.component';
import { AwsWorkspaceCardComponent } from './widgets/admin-panel/admin-worker-settings/aws-workspace-card/aws-workspace-card.component';
import { AwsClaimCardComponent } from './widgets/admin-panel/admin-worker-settings/aws-claim-card/aws-claim-card.component';
import { PetroleumUnityComponent } from './widgets/petroleum-products-movement/petroleum-unity/petroleum-unity.component';
import { AdminWorkspaceCardComponent } from './widgets/admin-panel/admin-workspace/admin-workspace-card/admin-workspace-card.component';
import { AwsSelectCardComponent } from './widgets/admin-panel/admin-worker-settings/aws-select-card/aws-select-card.component';
import { OperationScreenLeftComponent } from './widgets/petroleum-products-movement/petroleum-reference-left/operation-screen-left/operation-screen-left.component';
import { InfoScreenLeftComponent } from './widgets/petroleum-products-movement/petroleum-reference-left/info-screen-left/info-screen-left.component';
import { OperationParkScreenLeftComponent } from './widgets/petroleum-products-movement/petroleum-reference-left/operation-park-screen-left/operation-park-screen-left.component';
import { OperationScreenRightComponent } from './widgets/petroleum-products-movement/petroleum-reference-right/operation-screen-right/operation-screen-right.component';
import { InfoScreenRightComponent } from './widgets/petroleum-products-movement/petroleum-reference-right/info-screen-right/info-screen-right.component';
import { OperationParkScreenRightComponent } from './widgets/petroleum-products-movement/petroleum-reference-right/operation-park-screen-right/operation-park-screen-right.component';
import { OperationScreenComponent } from './widgets/petroleum-products-movement/petroleum-reference/operation-screen/operation-screen.component';
import { OperationParkScreenComponent } from './widgets/petroleum-products-movement/petroleum-reference/operation-park-screen/operation-park-screen.component';
import { InfoScreenComponent } from './widgets/petroleum-products-movement/petroleum-reference/info-screen/info-screen.component';
import { PetroleumUnityInfoComponent } from './widgets/petroleum-products-movement/petroleum-unity-info/petroleum-unity-info.component';
import { AwsCheckboxCardComponent } from './widgets/admin-panel/admin-worker-settings/aws-checkbox-card/aws-checkbox-card.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AwsBlockComponent } from './widgets/admin-panel/admin-worker-settings/aws-block/aws-block.component';
import { UsbVerifierComponent } from './widgets/change-shift/usb-verifier/usb-verifier.component';
import { TimeDataPickerComponent } from './components/time-data-picker/time-data-picker.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReportComponent } from './components/report/reports/report.component';
import { ReportsComponent } from './components/report/reports.component';
import { AwsAvatarComponent } from './widgets/admin-panel/admin-worker-settings/aws-avatar/aws-avatar.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AwsFieldsComponent } from './widgets/admin-panel/admin-worker-settings/aws-fields/aws-fields.component';
import { AwsWorkspacesComponent } from './widgets/admin-panel/admin-worker-settings/aws-workspaces/aws-workspaces.component';
import { AdminGroupsComponent } from './widgets/admin-panel/admin-groups/admin-groups.component';
import { AgGroupCardComponent } from './widgets/admin-panel/admin-groups/ag-group-card/ag-group-card.component';
import { AgGroupWorkerCardComponent } from './widgets/admin-panel/admin-groups/ag-group-worker-card/ag-group-worker-card.component';
import { AwsPasswordAlertComponent } from './widgets/admin-panel/admin-worker-settings/aws-password-alert/aws-password-alert.component';
import { ReferenceComponent } from './widgets/reference/reference.component';
import { ReportServerConfiguratorComponent } from './widgets/report-server-configurator/report-server-configurator.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AwsCreateClaimComponent } from './widgets/admin-panel/admin-worker-settings/aws-create-claim/aws-create-claim.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

import { AgNewGroupComponent } from './widgets/admin-panel/admin-groups/ag-new-group/ag-new-group.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { AdminAdImportComponent } from './widgets/admin-panel/admin-ad-import/admin-ad-import.component';
import { AddReportFileComponent } from './widgets/report-server-configurator/add-report-file/add-report-file.component';
import { TankCalibrationTableComponent } from './widgets/tank-calibration-table/tank-calibration-table.component';
import { TankCalibrationTableFilesComponent } from './widgets/tank-calibration-table/tank-calibration-table-files/tank-calibration-table-files.component';
import { UploadDropComponent } from './widgets/tank-calibration-table/upload-form/upload-drop/upload-drop.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TanksTableComponent } from './widgets/tank-calibration-table/tanks-table/tanks-table.component';
import { UploadFormComponent } from './widgets/tank-calibration-table/upload-form/upload-form.component';
import { SmotrEventComponent } from './widgets/workspace/smotr-event/smotr-event.component';
import { UsualEventComponent } from './widgets/workspace/usual-event/usual-event.component';
import { RetrievalWindowComponent } from './widgets/workspace/components/retrieval-window/retrieval-window.component';
import { EventDescriptionComponent } from './widgets/workspace/components/event-description/event-description.component';
import { ChatComponent } from './widgets/workspace/components/chat/chat.component';
import { CustomReportPropertiesReferenceComponent } from './widgets/custom-report-properties-reference/custom-report-properties-reference.component';
import { PopupUserOptionsComponent } from './widgets/report-server-configurator/popup-user-options/popup-user-options.component';
import { NecessaryParamComponent } from './widgets/report-server-configurator/popup-user-options/necessary-param/necessary-param.component';
import { AdditionalParamComponent } from './widgets/report-server-configurator/popup-user-options/additional-param/additional-param.component';
import { CustomReportOptionsComponent } from './widgets/custom-report-properties-reference/custom-report-options/custom-report-options.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { TreeModule } from 'angular-tree-component';
import { PopupSystemOptionsComponent } from './widgets/report-server-configurator/popup-system-options/popup-system-options.component';
import { SystemPeriodEditComponent } from './widgets/report-server-configurator/popup-system-options/system-period-edit/system-period-edit.component';
import { SystemParameterValuesAutogenerationComponent } from './widgets/report-server-configurator/popup-system-options/system-parameter-values-autogeneration/system-parameter-values-autogeneration.component';
import { SystemReportSheetsComponent } from './widgets/report-server-configurator/popup-system-options/system-report-sheets/system-report-sheets.component';
import { SystemMacroEditComponent } from './widgets/report-server-configurator/popup-system-options/system-macro-edit/system-macro-edit.component';
import { SystemPathEditComponent } from './widgets/report-server-configurator/popup-system-options/system-path-edit/system-path-edit.component';
import { SystemAutogenerateComponent } from './widgets/report-server-configurator/popup-system-options/system-autogenerate/system-autogenerate.component';
import { SystemPathUserComponent } from './widgets/report-server-configurator/popup-system-options/system-path-edit/system-path-user/system-path-user.component';
import { ParameterAutogenerationComponent } from './widgets/report-server-configurator/popup-system-options/system-parameter-values-autogeneration/parameter-autogeneration/parameter-autogeneration.component';
import { EventsWorkspaceButtonComponent } from './widgets/workspace/components/events-workspace-button/events-workspace-button.component';
import { EventsResponsibleSelectComponent } from './widgets/workspace/components/events-responsible-select/events-responsible-select.component';
import { EventsReasonsComponent } from './widgets/workspace/components/events-reasons/events-reasons.component';
import { EventsCorrectComponent } from './widgets/workspace/components/events-correct/events-correct.component';
import { EventsCorrectCardComponent } from './widgets/workspace/components/events-correct-card/events-correct-card.component';
import { EventsSmotrIconComponent } from './widgets/workspace/components/events-smotr-icon/events-smotr-icon.component';
import { EventsCommentWindowComponent } from './widgets/workspace/components/events-comment-window/events-comment-window.component';
import { EventsListWindowComponent } from './widgets/workspace/components/events-list-window/events-list-window.component';
import { FilterPopupComponent } from './widgets/petroleum-products-movement/components/filter-popup/filter-popup.component';
import { NgxMaskModule } from 'ngx-mask';
import { SystemPeriodDateComponent } from './widgets/report-server-configurator/popup-system-options/system-period-edit/system-period-date/system-period-date.component';
import { TransferTableComponent } from './widgets/petroleum-products-movement/components/transfer-table/transfer-table.component';
import { ProductionTrendComponent } from './widgets/production-trend/production-trend.component';
import { DevGraphComponent } from './pages/dev-graph/dev-graph.component';
import { MainIconComponent } from './widgets/production-trend/components/main-icon/main-icon.component';
import { ProductionTrendFacilitiesComponent } from './widgets/production-trend/components/production-trend-facilities/production-trend-facilities.component';
import { FacilityComponent } from './widgets/production-trend/components/facility/facility.component';
import { ProductionTrendPanelComponent } from './widgets/production-trend/components/production-trend-panel/production-trend-panel.component';
import { ProductionTrendCardInfoComponent } from './widgets/production-trend/components/production-trend-card-info/production-trend-card-info.component';
import { SystemPeriodDateYearComponent } from './widgets/report-server-configurator/popup-system-options/system-period-edit/system-period-date/system-period-date-year/system-period-date-year.component';
import { SystemPeriodDateMonthComponent } from './widgets/report-server-configurator/popup-system-options/system-period-edit/system-period-date/system-period-date-month/system-period-date-month.component';
import { SystemPeriodDateDayComponent } from './widgets/report-server-configurator/popup-system-options/system-period-edit/system-period-date/system-period-date-day/system-period-date-day.component';
import { TankInformationComponent } from './widgets/tank-information/tank-information.component';
import { TankCardComponent } from './widgets/tank-information/components/tank-card/tank-card.component';
import { TankLineComponent } from './widgets/tank-information/components/tank-line/tank-line.component';
import { TankFillingComponent } from './widgets/tank-information/components/tank-filling/tank-filling.component';
import { TankFilterComponent } from './widgets/tank-information/components/tank-filter/tank-filter.component';
import { ReasonsDeviationsComponent } from './widgets/reasons-deviations/reasons-deviations.component';
import { ReasonsDeviationsLineChartComponent } from './widgets/reasons-deviations/components/reasons-deviations-line-chart/reasons-deviations-line-chart.component';
import { ReasonsDeviationsInfoContentComponent } from './widgets/reasons-deviations/components/reasons-deviations-info-content/reasons-deviations-info-content.component';
import { ReasonsDeviationsInfoTankComponent } from './widgets/reasons-deviations/components/reasons-deviations-info-tank/reasons-deviations-info-tank.component';
import { ReasonsDeviationsPicTankComponent } from './widgets/reasons-deviations/components/reasons-deviations-pic-tank/reasons-deviations-pic-tank.component';
import { ReasonsDeviationsTankLevelComponent } from './widgets/reasons-deviations/components/reasons-deviations-tank-level/reasons-deviations-tank-level.component';
import { ProductionTrendGraphComponent } from './widgets/production-trend/components/production-trend-graph/production-trend-graph.component';
import { DocumentViewerComponent } from './widgets/document-viewer/document-viewer.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DocumentsScansComponent } from './widgets/documents-scans/documents-scans.component';
import { DocumentsScansReportComponent } from './widgets/documents-scans/components/documents-scans-report/documents-scans-report.component';
import { QualityDocsPanelComponent } from './widgets/quality-docs-panel/quality-docs-panel.component';
import { QualityDocsRecordComponent } from './widgets/quality-docs-panel/components/quality-docs-record/quality-docs-record.component';
import { DocumentCodingComponent } from './widgets/document-coding/document-coding.component';
import { DocumentCodingTableComponent } from './widgets/document-coding/components/document-coding-table/document-coding-table.component';
import { DocumentCodingTanksComponent } from './widgets/document-coding/components/document-coding-tanks/document-coding-tanks.component';
import { DocumentCodingMenuComponent } from './widgets/document-coding/components/document-coding-menu/document-coding-menu.component';
import { ReportTreeComponent } from './components/report/report-tree/report-tree.component';
import { DocumentCodingTableRecordComponent } from './widgets/document-coding/components/document-coding-table-record/document-coding-table-record.component';
import { DocumentCodingFilterComponent } from './widgets/document-coding/components/document-coding-filter/document-coding-filter.component';
import { TableGridComponent } from './components/table-grid/table-grid.component';
import { ColumnGridComponent } from './components/table-grid/components/column-grid/column-grid.component';
import { OilOperationsComponent } from './widgets/oil-operations/oil-operations.component';
import { TableGridInputComponent } from './components/table-grid/components/table-grid-input/table-grid-input.component';
import { TableGridFilterComponent } from './components/table-grid/components/table-grid-filter/table-grid-filter.component';
import { TableGridSaveButtonComponent } from './components/table-grid/components/table-grid-save-button/table-grid-save-button.component';
import { OilOperationsReceivedOperationsComponent } from './widgets/oil-operations/components/oil-operations-received-operations/oil-operations-received-operations.component';
import { OilOperationsShipmentFormationComponent } from './widgets/oil-operations/components/oil-operations-shipment-formation/oil-operations-shipment-formation.component';
import { OilOperationsFilterComponent } from './widgets/oil-operations/components/oil-operations-filter/oil-operations-filter.component';
import { OilOperationsTankFilterComponent } from './widgets/oil-operations/components/oil-operations-tank-filter/oil-operations-tank-filter.component';
import { OilOperationsLineChartComponent } from './widgets/oil-operations/components/oil-operations-line-chart/oil-operations-line-chart.component';
import { OilOperationsLineMenuComponent } from './widgets/oil-operations/components/oil-operations-line-menu/oil-operations-line-menu.component';
import { OilOperationsLineComponent } from './widgets/oil-operations/components/oil-operations-line/oil-operations-line.component';
import { ReportFileSelectBoxComponent } from './widgets/report-server-configurator/report-file-select-box/report-file-select-box.component';
import { WidgetHeaderSmpComponent } from './components/widget-header-smp/widget-header-smp.component';
import { OilOperationsAdjustmentComponent } from './widgets/oil-operations/components/oil-operations-adjustment/oil-operations-adjustment.component';
import { OilOperationsFreeShipmentComponent } from './widgets/oil-operations/components/oil-operations-free-shipment/oil-operations-free-shipment.component';
import { DocumentViewerFullscreenComponent } from './widgets/document-viewer/document-viewer-fullscreen/document-viewer-fullscreen.component';
import { CdCriticalComponent } from './widgets/cd-critical/cd-critical.component';
import { ImplementationPlanComponent } from './widgets/SMP/implementation-plan/implementation-plan.component';
import { ImplementationPieComponent } from './widgets/SMP/implementation-plan/components/implementation-pie/implementation-pie.component';
import { ImplementationTankComponent } from './widgets/SMP/implementation-plan/components/implementation-tank/implementation-tank.component';
import { ImplementationsComponent } from './widgets/SMP/implementation-plan/components/implementations/implementations.component';
import { PerformanceProgressIndicatorsComponent } from './widgets/SMP/performance-progress-indicators/performance-progress-indicators.component';
import { PerformanceProgressParkComponent } from './widgets/SMP/performance-progress-indicators/components/performance-progress-park/performance-progress-park.component';
import { PerformanceProgressShippedComponent } from './widgets/SMP/performance-progress-indicators/components/performance-progress-shipped/performance-progress-shipped.component';
import { PerformanceProgressBarComponent } from './widgets/SMP/performance-progress-indicators/components/performance-progress-bar/performance-progress-bar.component';
import { PerformanceProgressCircleComponent } from './widgets/SMP/performance-progress-indicators/components/performance-progress-circle/performance-progress-circle.component';
import { PerformanceProgressLineCircleComponent } from './widgets/SMP/performance-progress-indicators/components/performance-progress-line-circle/performance-progress-line-circle.component';
import { QualityStockComponent } from './widgets/SMP/quality-stock/quality-stock.component';
import { QualityStockSecurityComponent } from './widgets/SMP/quality-stock/components/quality-stock-security/quality-stock-security.component';
import { QualityStockCircleComponent } from './widgets/SMP/quality-stock/components/quality-stock-circle/quality-stock-circle.component';
import { ProductGroupsComponent } from './widgets/SMP/product-groups/product-groups.component';
import { ProductGroupsLeftComponent } from './widgets/SMP/product-groups/components/product-groups-left/product-groups-left.component';
import { ProductGroupsMiddleComponent } from './widgets/SMP/product-groups/components/product-groups-middle/product-groups-middle.component';
import { ProductGroupsRightComponent } from './widgets/SMP/product-groups/components/product-groups-right/product-groups-right.component';
import { ProductGroupsTableComponent } from './widgets/SMP/product-groups/components/product-groups-table/product-groups-table.component';
import { ProductGroupsShortComponent } from './widgets/smp/product-groups-short/product-groups-short.component';

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
    BarChartComponent,
    SuspenseMachineComponent,
    CircleDiagramComponent,
    UnityTemplateComponent,
    EnterpriseMapComponent,
    PowIndexPipe,
    MapEcologyComponent,
    DetailedLineDiagramComponent,
    OperationEfficiencyComponent,
    RingFactoryDiagramComponent,
    RingSFactoryDiagramComponent,
    LineChartWorkspaceComponent,
    CalendarPlanComponent,
    EcologySafetyComponent,
    ChainMapComponent,
    DispatcherScreenComponent,
    EnergeticsComponent,
    DeviationsTableComponent,
    TriggeringCriticalParametersComponent,
    CircleFactoryDiagramComponent,
    SemicircleEnergyComponent,
    ProductStocksComponent,
    PolarChartComponent,
    DeviationCircleDiagramComponent,
    OilControlComponent,
    PaginatorComponent,
    PaginatorDirective,
    SearchComponent,
    CircleBlockDiagramComponent,
    ColumnChartStackedComponent,
    CcsOneColumnComponent,
    FlameDiagramComponent,
    RingEnergyIndicatorComponent,
    WidgetPreviewComponent,
    TimeLineDiagramComponent,
    TimeDiagramComponent,
    SolidGaugesComponent,
    SolidGaugeWithMarkerComponent,
    SearchFilterComponent,
    SearchInputComponent,
    SearchListComponent,
    ObservationNormTRComponent,
    AdminPanelComponent,
    AdminShiftScheduleComponent,
    AdminReferencesComponent,
    CardVerifierComponent,
    PetroleumProductsMovementComponent,
    PetroleumReferenceLeftComponent,
    PetroleumReferenceRightComponent,
    PetroleumReferenceComponent,
    AdminEmployeeComponent,
    AdminWorkspaceComponent,
    AdminWorkspaceCardComponent,
    AdminClaimsComponent,
    AdminBrigadesComponent,
    AdminWorkerSettingsComponent,
    AwsCardComponent,
    AwsWorkspaceCardComponent,
    AwsClaimCardComponent,
    PetroleumUnityComponent,
    AwsSelectCardComponent,
    OperationScreenLeftComponent,
    InfoScreenLeftComponent,
    OperationParkScreenLeftComponent,
    OperationScreenRightComponent,
    InfoScreenRightComponent,
    OperationParkScreenRightComponent,
    OperationScreenComponent,
    OperationParkScreenComponent,
    InfoScreenComponent,
    PetroleumUnityInfoComponent,
    AwsCheckboxCardComponent,
    AwsBlockComponent,
    UsbVerifierComponent,
    TimeDataPickerComponent,
    ReportComponent,
    ReportsComponent,
    AwsAvatarComponent,
    AwsFieldsComponent,
    AwsWorkspacesComponent,
    AdminGroupsComponent,
    AgGroupCardComponent,
    AgGroupWorkerCardComponent,
    AwsPasswordAlertComponent,
    ReferenceComponent,
    ReportServerConfiguratorComponent,
    AwsCreateClaimComponent,
    AgNewGroupComponent,
    AdminAdImportComponent,
    AddReportFileComponent,
    TankCalibrationTableComponent,
    TankCalibrationTableFilesComponent,
    UploadFormComponent,
    UploadDropComponent,
    TanksTableComponent,
    SmotrEventComponent,
    UsualEventComponent,
    RetrievalWindowComponent,
    EventDescriptionComponent,
    ChatComponent,
    CustomReportPropertiesReferenceComponent,
    PopupUserOptionsComponent,
    NecessaryParamComponent,
    AdditionalParamComponent,
    CustomReportOptionsComponent,
    PopupSystemOptionsComponent,
    SystemPeriodEditComponent,
    SystemParameterValuesAutogenerationComponent,
    SystemReportSheetsComponent,
    SystemMacroEditComponent,
    SystemPathEditComponent,
    SystemAutogenerateComponent,
    SystemPathUserComponent,
    ParameterAutogenerationComponent,
    EventsWorkspaceButtonComponent,
    EventsResponsibleSelectComponent,
    EventsReasonsComponent,
    EventsCorrectComponent,
    EventsCorrectCardComponent,
    EventsSmotrIconComponent,
    EventsCommentWindowComponent,
    EventsListWindowComponent,
    FilterPopupComponent,
    SystemPeriodDateComponent,
    TransferTableComponent,
    ProductionTrendComponent,
    DevGraphComponent,
    MainIconComponent,
    ProductionTrendFacilitiesComponent,
    FacilityComponent,
    ProductionTrendPanelComponent,
    ProductionTrendCardInfoComponent,
    SystemPeriodDateYearComponent,
    SystemPeriodDateMonthComponent,
    SystemPeriodDateDayComponent,
    TankInformationComponent,
    TankCardComponent,
    TankLineComponent,
    TankFillingComponent,
    TankFilterComponent,
    ReasonsDeviationsComponent,
    ReasonsDeviationsLineChartComponent,
    ReasonsDeviationsInfoContentComponent,
    ReasonsDeviationsInfoTankComponent,
    ReasonsDeviationsPicTankComponent,
    ReasonsDeviationsTankLevelComponent,
    ProductionTrendGraphComponent,
    DocumentViewerComponent,
    DocumentsScansComponent,
    DocumentsScansReportComponent,
    QualityDocsPanelComponent,
    QualityDocsRecordComponent,
    DocumentCodingComponent,
    DocumentCodingTableComponent,
    DocumentCodingTanksComponent,
    DocumentCodingMenuComponent,
    ReportTreeComponent,
    DocumentCodingTableRecordComponent,
    DocumentCodingFilterComponent,
    TableGridComponent,
    ColumnGridComponent,
    OilOperationsComponent,
    TableGridInputComponent,
    TableGridFilterComponent,
    TableGridSaveButtonComponent,
    OilOperationsReceivedOperationsComponent,
    OilOperationsShipmentFormationComponent,
    OilOperationsFilterComponent,
    OilOperationsTankFilterComponent,
    OilOperationsLineChartComponent,
    OilOperationsLineMenuComponent,
    OilOperationsLineComponent,
    ReportFileSelectBoxComponent,
    WidgetHeaderSmpComponent,
    DocumentViewerFullscreenComponent,
    OilOperationsAdjustmentComponent,
    OilOperationsFreeShipmentComponent,
    DocumentViewerFullscreenComponent,
    CdCriticalComponent,
    ImplementationPlanComponent,
    ImplementationPieComponent,
    ImplementationTankComponent,
    ImplementationsComponent,
    PerformanceProgressIndicatorsComponent,
    PerformanceProgressParkComponent,
    PerformanceProgressShippedComponent,
    PerformanceProgressBarComponent,
    PerformanceProgressCircleComponent,
    PerformanceProgressLineCircleComponent,
    QualityStockComponent,
    QualityStockSecurityComponent,
    QualityStockCircleComponent,
    ProductGroupsComponent,
    ProductGroupsLeftComponent,
    ProductGroupsMiddleComponent,
    ProductGroupsRightComponent,
    ProductGroupsTableComponent,
    ProductGroupsShortComponent,
  ],
  entryComponents: [
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
    SuspenseMachineComponent,
    CircleDiagramComponent,
    MapEcologyComponent,
    UnityTemplateComponent,
    EnterpriseMapComponent,
    OperationEfficiencyComponent,
    CalendarPlanComponent,
    EcologySafetyComponent,
    RingFactoryDiagramComponent,
    LineChartWorkspaceComponent,
    EnergeticsComponent,
    RingSFactoryDiagramComponent,
    LineChartWorkspaceComponent,
    ChainMapComponent,
    DispatcherScreenComponent,
    DeviationsTableComponent,
    TriggeringCriticalParametersComponent,
    CircleFactoryDiagramComponent,
    ProductStocksComponent,
    PolarChartComponent,
    SemicircleEnergyComponent,
    DeviationCircleDiagramComponent,
    OilControlComponent,
    CircleBlockDiagramComponent,
    ColumnChartStackedComponent,
    FlameDiagramComponent,
    RingEnergyIndicatorComponent,
    TimeLineDiagramComponent,
    SolidGaugesComponent,
    ObservationNormTRComponent,
    AdminShiftScheduleComponent,
    AdminReferencesComponent,
    PetroleumProductsMovementComponent,
    AdminPanelComponent,
    ReferenceComponent,
    ReportServerConfiguratorComponent,
    ReportComponent,
    ReportsComponent,
    TankCalibrationTableComponent,
    UploadFormComponent,
    UploadDropComponent,
    TanksTableComponent,
    CustomReportPropertiesReferenceComponent,
    TankInformationComponent,
    ReasonsDeviationsComponent,
    DocumentsScansComponent,
    QualityDocsPanelComponent,
    DocumentCodingComponent,
    ReportTreeComponent,
    OilOperationsComponent,
    ImplementationPlanComponent,
    PerformanceProgressIndicatorsComponent,
    QualityStockComponent,
    ProductGroupsComponent,
    ProductGroupsShortComponent,
  ],
  exports: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    DndModule,
    HttpClientModule,
    FormsModule,
    GridsterModule,
    DashboardRoutingModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ScrollingModule,
    MatSelectModule,
    ScrollingModule,
    OldScrollingModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatExpansionModule,
    ImageCropperModule,
    DragDropModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule,
    OverlayModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    TreeModule,
    NgxMaskModule.forChild(),
    PdfViewerModule
  ],
  bootstrap: [],
  providers: [{ provide: LOCALE_ID, useValue: 'ru-RU' },
  { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  { provide: MatDialogRef, useValue: {} },
  { provide: MAT_DIALOG_DATA, useValue: [] },
  ],

})
export class DashboardModule { }
