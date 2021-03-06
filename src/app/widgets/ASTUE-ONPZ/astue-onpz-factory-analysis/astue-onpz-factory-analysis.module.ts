import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzFactoryAnalysisComponent } from './astue-onpz-factory-analysis.component';
import { AstueOnpzFactoryAnalysisCellComponent } from './components/astue-onpz-factor-analisys-components/astue-onpz-factory-analysis-cell/astue-onpz-factory-analysis-cell.component';
import { SharedModule } from '@shared/shared.module';
import { AstueOnpzFactoryAnalysisGroupComponent } from './components/astue-onpz-factor-analisys-components/astue-onpz-factory-analysis-group/astue-onpz-factory-analysis-group.component';
import { AstueOnpzFactoryAnalysisBarComponent } from './components/astue-onpz-factor-analisys-components/astue-onpz-factory-analysis-bar/astue-onpz-factory-analysis-bar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AstueOnpzFactorAnalysisPageComponent } from './components/astue-onpz-factor-analysis-page/astue-onpz-factor-analysis-page.component';
import { AstueOnpzFactoryAnalysisHeaderComponent } from './components/astue-onpz-factory-analysis-header/astue-onpz-factory-analysis-header.component';
import { MatSelectModule } from '@angular/material/select';
import { AstueOnpzFactoryAnalysisChartPageComponent } from './components/astue-onpz-factory-analysis-chart-page/astue-onpz-factory-analysis-chart-page.component';
import { AstueOnpzFactorAnalysisChartInfoComponent } from './components/astue-onpz-factor-analisys-chart-components/astue-onpz-factor-analysis-chart-info/astue-onpz-factor-analysis-chart-info.component';
import { AstueOnpzFactoryAnalysisChartComponent } from './components/astue-onpz-factor-analisys-chart-components/astue-onpz-factory-analysis-chart/astue-onpz-factory-analysis-chart.component';
import { AstueOnpzSharedModule } from '../astue-onpz-shared/astue-onpz-shared.module';
import { AstueOnpzFactoryAnalysisBarMultiLevelComponent } from './components/astue-onpz-factor-analisys-components/astue-onpz-factory-analysis-bar-multi-level/astue-onpz-factory-analysis-bar-multi-level.component';
import { AstueOnpzFactoryAnalysisBarMultiLevelTooltipComponent } from './components/astue-onpz-factor-analisys-components/astue-onpz-factory-analysis-bar-multi-level/components/astue-onpz-factory-analysis-bar-multi-level-tooltip/astue-onpz-factory-analysis-bar-multi-level-tooltip.component';
import { FactoryAnalysisTooltipDirective } from './components/astue-onpz-factor-analisys-components/astue-onpz-factory-analysis-bar-multi-level/directives/factory-analysis-tooltip.directive';
@NgModule({
    declarations: [
        AstueOnpzFactoryAnalysisComponent,
        AstueOnpzFactoryAnalysisCellComponent,
        AstueOnpzFactoryAnalysisGroupComponent,
        AstueOnpzFactoryAnalysisBarComponent,
        AstueOnpzFactorAnalysisPageComponent,
        AstueOnpzFactoryAnalysisHeaderComponent,
        AstueOnpzFactoryAnalysisChartPageComponent,
        AstueOnpzFactorAnalysisChartInfoComponent,
        AstueOnpzFactoryAnalysisChartComponent,
        AstueOnpzFactoryAnalysisBarMultiLevelComponent,
        AstueOnpzFactoryAnalysisBarMultiLevelTooltipComponent,
        FactoryAnalysisTooltipDirective,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatTooltipModule,
        AngularSvgIconModule,
        MatSelectModule,
        AstueOnpzSharedModule,
    ],
    exports: [AstueOnpzFactoryAnalysisComponent],
})
export class AstueOnpzFactoryAnalysisModule {
    enterComponent = AstueOnpzFactoryAnalysisComponent;
}
