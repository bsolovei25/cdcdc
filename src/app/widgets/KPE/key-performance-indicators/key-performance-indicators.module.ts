import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyPerformanceIndicatorsComponent } from './key-performance-indicators.component';
import { GaugeDiagramComponent } from './components/gauge-diagram/gauge-diagram.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [KeyPerformanceIndicatorsComponent, GaugeDiagramComponent],
    imports: [CommonModule, SharedModule],
    exports: [GaugeDiagramComponent],
})
export class KeyPerformanceIndicatorsModule {
    enterComponent = KeyPerformanceIndicatorsComponent;
}
