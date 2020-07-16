import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeQualityComponent } from './kpe-quality.component';
import { KpeLineChartComponent } from '../shared/kpe-line-chart/kpe-line-chart.component';

@NgModule({
  declarations: [KpeQualityComponent, KpeLineChartComponent],
  imports: [CommonModule],
})
export class KpeQualityModule {
  enterComponent = KpeQualityComponent;
}
