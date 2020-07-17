import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeQualityComponent } from './kpe-quality.component';
import { KpeLineChartComponent } from '../shared/kpe-line-chart/kpe-line-chart.component';
import { KpeSharedModule } from '../shared/kpe-shared.module';
import { KpeLineDiagramComponent } from '../shared/kpe-line-diagram/kpe-line-diagram.component';

@NgModule({
  declarations: [KpeQualityComponent, KpeLineChartComponent],
  imports: [CommonModule, KpeSharedModule],
})
export class KpeQualityModule {
  enterComponent = KpeQualityComponent;
}
