import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeyPerformanceIndicatorsComponent } from './key-performance-indicators.component';
import { GaugeDiagramComponent } from './components/gauge-diagram/gauge-diagram.component';
import { SharedModule } from '@shared/shared.module';
import { KpeSharedModule } from "../shared/kpe-shared.module";

@NgModule({
    declarations: [KeyPerformanceIndicatorsComponent, GaugeDiagramComponent],
    imports: [CommonModule, SharedModule, KpeSharedModule],
    exports: [GaugeDiagramComponent],
})
export class KeyPerformanceIndicatorsModule {
    enterComponent = KeyPerformanceIndicatorsComponent;
}
