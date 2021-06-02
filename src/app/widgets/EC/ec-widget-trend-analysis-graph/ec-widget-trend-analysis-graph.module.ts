import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EcWidgetTrendAnalysisGraphComponent} from '@widgets/EC/ec-widget-trend-analysis-graph/ec-widget-trend-analysis-graph.component';
import {SharedModule} from '@shared/shared.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [EcWidgetTrendAnalysisGraphComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        FormsModule,
    ]
})
export class EcWidgetTrendAnalysisGraphModule {
    enterComponent = EcWidgetTrendAnalysisGraphComponent;

}
