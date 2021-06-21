import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EcWidgetTrendAnalysisGraphComponent} from '@widgets/EC/ec-widget-trend-analysis-graph/ec-widget-trend-analysis-graph.component';
import {SharedModule} from '@shared/shared.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EcWidgetTrendAnalysisChartListComponent } from '@widgets/EC/ec-widget-trend-analysis-graph/components/ec-widget-trend-analysis-chart-list/ec-widget-trend-analysis-chart-list.component';
import { EcWidgetTrendAnalysisMultiChartComponent } from '@widgets/EC/ec-widget-trend-analysis-graph/components/ec-widget-trend-analysis-multi-chart/ec-widget-trend-analysis-multi-chart.component';
import { EcWidgetSharedModule } from '@widgets/EC/ec-widget-shared/ec-widget-shared.module';

@NgModule({
    declarations: [
        EcWidgetTrendAnalysisGraphComponent,
        EcWidgetTrendAnalysisChartListComponent,
        EcWidgetTrendAnalysisMultiChartComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        FormsModule,
        EcWidgetSharedModule
    ]
})
export class EcWidgetTrendAnalysisGraphModule {
    enterComponent = EcWidgetTrendAnalysisGraphComponent;

}
