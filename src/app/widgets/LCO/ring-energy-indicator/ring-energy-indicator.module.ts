import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RingEnergyIndicatorComponent } from './ring-energy-indicator.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [RingEnergyIndicatorComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class RingEnergyIndicatorModule {
    enterComponent = RingEnergyIndicatorComponent;
}
