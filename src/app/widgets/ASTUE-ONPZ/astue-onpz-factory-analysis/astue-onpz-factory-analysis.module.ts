import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzFactoryAnalysisComponent } from './astue-onpz-factory-analysis.component';
import { AstueOnpzFactoryAnalysisCellComponent } from './components/astue-onpz-factory-analysis-cell/astue-onpz-factory-analysis-cell.component';
import { SharedModule } from '@shared/shared.module';
import { AstueOnpzFactoryAnalysisGroupComponent } from './components/astue-onpz-factory-analysis-group/astue-onpz-factory-analysis-group.component';
import { AstueOnpzFactoryAnalysisBarComponent } from './components/astue-onpz-factory-analysis-bar/astue-onpz-factory-analysis-bar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [
        AstueOnpzFactoryAnalysisComponent,
        AstueOnpzFactoryAnalysisCellComponent,
        AstueOnpzFactoryAnalysisGroupComponent,
        AstueOnpzFactoryAnalysisBarComponent,
    ],
    imports: [CommonModule, SharedModule, MatTooltipModule, AngularSvgIconModule],
    exports: [AstueOnpzFactoryAnalysisComponent],
})
export class AstueOnpzFactoryAnalysisModule {
    enterComponent = AstueOnpzFactoryAnalysisComponent;
}
