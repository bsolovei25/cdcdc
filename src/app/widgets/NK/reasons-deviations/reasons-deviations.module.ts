import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReasonsDeviationsComponent } from './reasons-deviations.component';
import { ReasonsDeviationsInfoContentComponent } from './components/reasons-deviations-info-content/reasons-deviations-info-content.component';
import { ReasonsDeviationsInfoTankComponent } from './components/reasons-deviations-info-tank/reasons-deviations-info-tank.component';
import { ReasonsDeviationsLineChartComponent } from './components/reasons-deviations-line-chart/reasons-deviations-line-chart.component';
import { ReasonsDeviationsPicTankComponent } from './components/reasons-deviations-pic-tank/reasons-deviations-pic-tank.component';
import { ReasonsDeviationsTankLevelComponent } from './components/reasons-deviations-tank-level/reasons-deviations-tank-level.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReasonsDeviationsService } from './reasons-deviations.service';

@NgModule({
    declarations: [
        ReasonsDeviationsComponent,
        ReasonsDeviationsInfoContentComponent,
        ReasonsDeviationsInfoTankComponent,
        ReasonsDeviationsLineChartComponent,
        ReasonsDeviationsPicTankComponent,
        ReasonsDeviationsTankLevelComponent,
    ],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
    providers: [ReasonsDeviationsService],
})
export class ReasonsDeviationsModule {
    enterComponent = ReasonsDeviationsComponent;
}
