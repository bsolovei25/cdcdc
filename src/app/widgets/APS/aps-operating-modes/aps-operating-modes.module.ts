import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ApsOperatingModesComponent } from './aps-operating-modes.component';



@NgModule({
  declarations: [ ApsOperatingModesComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ApsOperatingModesModule {
    enterComponent = ApsOperatingModesComponent;
}
