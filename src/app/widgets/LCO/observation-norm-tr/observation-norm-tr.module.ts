import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationNormTRComponent } from './observation-norm-tr.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [ ObservationNormTRComponent ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ObservationNormTRModule {
  enterComponent = ObservationNormTRComponent;
}
