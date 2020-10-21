import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuspenseMachineComponent } from './suspense-machine.component';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [ SuspenseMachineComponent ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SuspenseMachineModule {
    enterComponent = SuspenseMachineComponent;
}
