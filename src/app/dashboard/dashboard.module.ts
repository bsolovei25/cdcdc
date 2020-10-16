import { UserEventsComponent } from './components/header-components/user-events/user-events.component';
import { UserEventsItemComponent } from './components/header-components/user-events/components/user-events-item/user-events-item.component';
import { SharedModule } from './../@shared/shared.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PeriodSelectorComponent } from './components/header-components/period-selector/period-selector.component';
import { IndicatorSelectorComponent } from './components/header-components/indicator-selector/indicator-selector.component';
import { DndModule } from 'ngx-drag-drop';
import { DashboardComponent } from './pages/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LineDatetimeComponent } from './components/header-components/line-datetime/line-datetime.component';
import { PanelComponent } from './components/panel/panel.component';
import { WidgetsGridComponent } from './components/widgets-grid/widgets-grid.component';
import { GridsterModule } from 'angular-gridster2';
import { UserInfoComponent } from './components/header-components/user-info/user-info.component';
import { PowIndexPipe } from '@shared/pipes/pow-index.pipe';
import { DeviationsTableComponent } from './widgets/deviations-table/deviations-table.component';
import { ProductStocksComponent } from './widgets/product-stocks/product-stocks.component';
import { DeviationCircleDiagramComponent } from './widgets/deviation-circle-diagram/deviation-circle-diagram.component';
import { PaginatorDirective } from '../widgets/LCO/oil-control/components/paginator/paginator.directive';
import { SearchComponent } from './components/search/search.component';
import { WidgetPreviewComponent } from './components/widget-preview/widget-preview.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ColumnChartStackedComponent } from './widgets/column-chart-stacked/column-chart-stacked.component';
import { CcsOneColumnComponent } from './widgets/column-chart-stacked/ccs-one-column/ccs-one-column.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SearchFilterComponent } from './components/search/search-filter/search-filter.component';
import { SearchInputComponent } from './components/search/search-input/search-input.component';
import { SearchListComponent } from './components/search/search-list/search-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ScrollingModule } from '@angular/cdk-experimental/scrolling';
import { ScrollingModule as OldScrollingModule } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReportComponent } from './components/report/reports/report.component';
import { ReportsComponent } from './components/report/reports.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { TreeModule } from 'angular-tree-component';
import { NgxMaskModule } from 'ngx-mask';
import { DevGraphComponent } from './pages/dev-graph/dev-graph.component';
import { ReasonsDeviationsComponent } from './widgets/reasons-deviations/reasons-deviations.component';
import { ReasonsDeviationsLineChartComponent } from './widgets/reasons-deviations/components/reasons-deviations-line-chart/reasons-deviations-line-chart.component';
import { ReasonsDeviationsInfoContentComponent } from './widgets/reasons-deviations/components/reasons-deviations-info-content/reasons-deviations-info-content.component';
import { ReasonsDeviationsInfoTankComponent } from './widgets/reasons-deviations/components/reasons-deviations-info-tank/reasons-deviations-info-tank.component';
import { ReasonsDeviationsPicTankComponent } from './widgets/reasons-deviations/components/reasons-deviations-pic-tank/reasons-deviations-pic-tank.component';
import { ReasonsDeviationsTankLevelComponent } from './widgets/reasons-deviations/components/reasons-deviations-tank-level/reasons-deviations-tank-level.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
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
import { TableGridInputComponent } from './components/table-grid/components/table-grid-input/table-grid-input.component';
import { TableGridFilterComponent } from './components/table-grid/components/table-grid-filter/table-grid-filter.component';
import { TableGridSaveButtonComponent } from './components/table-grid/components/table-grid-save-button/table-grid-save-button.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WidgetPanelComponent } from './components/widget-panel/widget-panel.component';
import { MatMenuModule } from '@angular/material/menu';
import { WidgetContainerComponent } from './widget-container/widget-container.component';
import { PerformanceBarComponent } from './components/performance-bar/performance-bar.component';
import { GroupSelectorComponent } from './components/header-components/group-selector/group-selector.component';
import { GroupSelectorRowComponent } from './components/header-components/group-selector/group-selector-row/group-selector-row.component';
import { IndicatorDiagramComponent } from './components/header-components/indicator-diagram/indicator-diagram.component';
import { MenuButtonComponent } from './components/header-components/menu-button/menu-button.component';
import { MatBadgeModule } from '@angular/material/badge';
import { TankFilterComponent } from '../widgets/NK/tank-information/components/tank-filter/tank-filter.component';
import { ReportServerConfiguratorModule } from '../widgets/admin/report-server-configurator/report-server-configurator.module';

@NgModule({
    declarations: [
        HomeComponent,
        PeriodSelectorComponent,
        IndicatorSelectorComponent,
        LineDatetimeComponent,
        DashboardComponent,
        PanelComponent,
        WidgetsGridComponent,
        UserInfoComponent,
        PanelComponent,
        WidgetsGridComponent,
        UserInfoComponent,
        PowIndexPipe,
        DeviationsTableComponent,
        ProductStocksComponent,
        DeviationCircleDiagramComponent,
        PaginatorDirective,
        SearchComponent,
        ColumnChartStackedComponent,
        CcsOneColumnComponent,
        WidgetPreviewComponent,
        SearchFilterComponent,
        SearchInputComponent,
        SearchListComponent,
        ReportComponent,
        ReportsComponent,
        DevGraphComponent,
        ReasonsDeviationsComponent,
        ReasonsDeviationsLineChartComponent,
        ReasonsDeviationsInfoContentComponent,
        ReasonsDeviationsInfoTankComponent,
        ReasonsDeviationsPicTankComponent,
        ReasonsDeviationsTankLevelComponent,
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
        TableGridInputComponent,
        TableGridFilterComponent,
        TableGridSaveButtonComponent,
        WidgetPanelComponent,
        WidgetContainerComponent,
        PerformanceBarComponent,
        GroupSelectorComponent,
        GroupSelectorRowComponent,
        IndicatorDiagramComponent,
        MenuButtonComponent,
        UserEventsComponent,
        UserEventsItemComponent,
        TankFilterComponent
    ],
    entryComponents: [
        DeviationsTableComponent,
        ProductStocksComponent,
        DeviationCircleDiagramComponent,
        ColumnChartStackedComponent,
        ReportComponent,
        ReportsComponent,
        ReasonsDeviationsComponent,
        QualityDocsPanelComponent,
        DocumentCodingComponent,
        ReportTreeComponent,
        PanelComponent,
    ],
    exports: [HomeComponent,
        PerformanceBarComponent,
        WidgetPreviewComponent,
        PowIndexPipe,
        TankFilterComponent, TableGridInputComponent
    ],
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
        MatRippleModule,
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
        MatDialogModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        TreeModule,
        NgxMaskModule.forChild(),
        PdfViewerModule,
        MatTooltipModule,
        MatMenuModule,
        MatRippleModule,
        MatBadgeModule,
        ReportServerConfiguratorModule
    ],
    bootstrap: [],
    providers: [
        { provide: LOCALE_ID, useValue: 'ru-RU' },
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
    ],
})
export class DashboardModule {}
