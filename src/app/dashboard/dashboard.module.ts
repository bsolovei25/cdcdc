import { ChangeShiftComponent } from './widgets/change-shift/change-shift.component';
import { NgModule } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { LineDiagramComponent } from './widgets/line-diagram/line-diagram.component';
import { LineDatetimeComponent } from './components/line-datetime/line-datetime.component';
import { ShiftPersonComponent } from './widgets/change-shift/shift-person/shift-person.component';
import { NewWidgetsPanelComponent } from './components/new-widgets-panel/new-widgets-panel.component';
import { NewWidgetsGridComponent } from './components/new-widgets-grid/new-widgets-grid.component';
import { GridsterModule } from 'angular-gridster2';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { WidgetPiesComponent } from './widgets/widgets-pie/widget-pies/widget-pies/widget-pies.component';
import { WidgetsPieComponent } from './widgets/widgets-pie/widget-pie-circle/widget-pie/widget-pie.component';
import { WidgetHeaderComponent } from './components/widget-header/widget-header.component';
import { EventsWorkSpaceComponent } from './widgets/workspace/events-workspace.component';
import { FrameTopComponent } from './components/frame-top/frame-top.component';
import { FrameBottomComponent } from './components/frame-bottom/frame-bottom.component';
import { ClickOutsideModule } from 'ng-click-outside';
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
import { MapEcologyComponent } from './widgets/map-ecology/map-ecology/map-ecology.component';
import { UnityTemplateComponent } from './widgets/unity-template/unity-template.component';
import { PowIndexPipe } from './pipes/pow-index.pipe';
import { RingFactoryDiagramComponent } from './widgets/ring-factory-diagrams/ring-factory-diagram/ring-factory-diagram.component';
import { LineChartWorkspaceComponent } from './widgets/workspace/line-chart-workspace/line-chart-workspace.component';
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
import { AdminWorkspaceCardComponent } from './widgets/admin-panel/admin-workspace/admin-workspace-card/admin-workspace-card.component';
import { AdminReferencesComponent } from './widgets/admin-references/admin-references.component';
import { CardVerifierComponent } from './widgets/change-shift/card-verifier/card-verifier.component';
import { PetroleumProductsMovementComponent } from './widgets/petroleum-products-movement/petroleum-products-movement.component';
import { PetroleumReferenceLeftComponent } from './widgets/petroleum-products-movement/petroleum-reference-left/petroleum-reference-left.component';
import { PetroleumReferenceRightComponent } from './widgets/petroleum-products-movement/petroleum-reference-right/petroleum-reference-right.component';
import { PetroleumReferenceComponent } from './widgets/petroleum-products-movement/petroleum-reference/petroleum-reference.component';
import { PetroleumWorkspaceComponent } from './widgets/petroleum-products-movement/petroleum-workspace/petroleum-workspace.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
import { AdminPanelService } from './services/admin-panel/admin-panel.service';

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
        AdminWorkspaceCardComponent,
        AdminReferencesComponent,
        CardVerifierComponent,
        PetroleumProductsMovementComponent,
        PetroleumReferenceLeftComponent,
        PetroleumReferenceRightComponent,
        PetroleumReferenceComponent,
        PetroleumWorkspaceComponent,
        AdminEmployeeComponent,
        AdminWorkspaceComponent,
        AdminClaimsComponent,
        AdminBrigadesComponent,
        AdminWorkerSettingsComponent,
        AwsCardComponent,
        AwsWorkspaceCardComponent,
        AwsClaimCardComponent,
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
        AdminReferencesComponent,
        PetroleumProductsMovementComponent,
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
        ClickOutsideModule,
        DashboardRoutingModule,
        MatSnackBarModule,
        ScrollingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatFormFieldModule,
        ScrollingModule,
        OldScrollingModule,
    ],
    bootstrap: [],
    providers: [AdminPanelService],
})
export class DashboardModule {}
