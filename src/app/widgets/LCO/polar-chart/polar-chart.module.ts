import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolarChartComponent } from './polar-chart.component';



@NgModule({
  declarations: [PolarChartComponent],
  imports: [
    CommonModule
  ]
})
export class PolarChartModule {
    enterComponent = PolarChartComponent;
}
