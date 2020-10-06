import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolidGaugesComponent } from './solid-gauges.component';
import { SharedModule } from '@shared/shared.module';
import { SolidGaugeWithMarkerComponent } from '../solid-gauge-with-marker/solid-gauge-with-marker.component';



@NgModule({
  declarations: [ SolidGaugesComponent, SolidGaugeWithMarkerComponent ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SolidGaugesModule {
  enterComponent = SolidGaugesComponent;
}
