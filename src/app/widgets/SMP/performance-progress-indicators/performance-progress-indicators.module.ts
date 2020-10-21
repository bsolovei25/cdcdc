import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceProgressIndicatorsComponent } from './performance-progress-indicators.component';
import { PerformanceProgressBarComponent } from './components/performance-progress-bar/performance-progress-bar.component';
import { PerformanceProgressLineCircleComponent } from './components/performance-progress-line-circle/performance-progress-line-circle.component';
import { PerformanceProgressParkComponent } from './components/performance-progress-park/performance-progress-park.component';
import { PerformanceProgressShippedComponent } from './components/performance-progress-shipped/performance-progress-shipped.component';
import { SharedModule } from '../../../@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { PerformanceProgressCircleComponent } from './components/performance-progress-circle/performance-progress-circle.component';

@NgModule({
    declarations: [
        PerformanceProgressIndicatorsComponent,
        PerformanceProgressBarComponent,
        PerformanceProgressCircleComponent,
        PerformanceProgressLineCircleComponent,
        PerformanceProgressParkComponent,
        PerformanceProgressShippedComponent,
    ],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class PerformanceProgressIndicatorsModule {
    enterComponent = PerformanceProgressIndicatorsComponent;
}
