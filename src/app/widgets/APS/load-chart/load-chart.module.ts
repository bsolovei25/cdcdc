import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadChartComponent } from './load-chart.component';
import { SharedModule } from '../../../@shared/shared.module';

@NgModule({
    declarations: [LoadChartComponent],
    imports: [CommonModule, SharedModule],
})
export class LoadChartModule {
    enterComponent = LoadChartComponent;
}
