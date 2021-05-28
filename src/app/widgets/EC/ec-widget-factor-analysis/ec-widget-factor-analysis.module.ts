import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcWidgetFactorAnalysisComponent } from './ec-widget-factor-analysis.component';
import { EcWidgetFactorAnalysisCellComponent } from './components/ec-widget-factor-analisys-components/ec-widget-factor-analysis-cell/ec-widget-factor-analysis-cell.component';
import { SharedModule } from '@shared/shared.module';
import { EcWidgetFactorAnalysisGroupComponent } from './components/ec-widget-factor-analisys-components/ec-widget-factor-analysis-group/ec-widget-factor-analysis-group.component';
import { EcWidgetFactorAnalysisBarComponent } from './components/ec-widget-factor-analisys-components/ec-widget-factor-analysis-bar/ec-widget-factor-analysis-bar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { EcWidgetFactorAnalysisPageComponent } from './components/ec-widget-factor-analysis-page/ec-widget-factor-analysis-page.component';
import { EcWidgetFactorAnalysisHeaderComponent } from './components/ec-widget-factor-analysis-header/ec-widget-factor-analysis-header.component';
import { MatSelectModule } from '@angular/material/select';
import { EcWidgetFactorAnalysisChartPageComponent } from './components/ec-widget-factor-analysis-chart-page/ec-widget-factor-analysis-chart-page.component';
import { EcWidgetFactorAnalysisChartInfoComponent } from './components/ec-widget-factor-analisys-chart-components/ec-widget-factor-analysis-chart-info/ec-widget-factor-analysis-chart-info.component';
import { EcWidgetFactorAnalysisChartComponent } from './components/ec-widget-factor-analisys-chart-components/ec-widget-factor-analysis-chart/ec-widget-factor-analysis-chart.component';
import { EcWidgetSharedModule } from '../ec-widget-shared/ec-widget-shared.module';
import { EcWidgetFactorAnalysisBarMultiLevelComponent } from './components/ec-widget-factor-analisys-components/ec-widget-factor-analysis-bar-multi-level/ec-widget-factor-analysis-bar-multi-level.component';
import { EcWidgetFactorAnalysisBarMultiLevelTooltipComponent } from './components/ec-widget-factor-analisys-components/ec-widget-factor-analysis-bar-multi-level/components/ec-widget-factor-analysis-bar-multi-level-tooltip/ec-widget-factor-analysis-bar-multi-level-tooltip.component';
import { FactoryAnalysisTooltipDirective } from './components/ec-widget-factor-analisys-components/ec-widget-factor-analysis-bar-multi-level/directives/factory-analysis-tooltip.directive';
@NgModule({
    declarations: [
        EcWidgetFactorAnalysisComponent,
        EcWidgetFactorAnalysisCellComponent,
        EcWidgetFactorAnalysisGroupComponent,
        EcWidgetFactorAnalysisBarComponent,
        EcWidgetFactorAnalysisPageComponent,
        EcWidgetFactorAnalysisHeaderComponent,
        EcWidgetFactorAnalysisChartPageComponent,
        EcWidgetFactorAnalysisChartInfoComponent,
        EcWidgetFactorAnalysisChartComponent,
        EcWidgetFactorAnalysisBarMultiLevelComponent,
        EcWidgetFactorAnalysisBarMultiLevelTooltipComponent,
        FactoryAnalysisTooltipDirective,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatTooltipModule,
        AngularSvgIconModule,
        MatSelectModule,
        EcWidgetSharedModule,
    ],
    exports: [EcWidgetFactorAnalysisComponent],
})
export class EcWidgetFactorAnalysisModule {
    enterComponent = EcWidgetFactorAnalysisComponent;
}
