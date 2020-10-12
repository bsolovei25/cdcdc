import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationEfficiencyComponent } from './operation-efficiency.component';
import { SharedModule } from '@shared/shared.module';
import { LcoSharedModule } from '../lco-shared/lco-shared.module';



@NgModule({
  declarations: [ OperationEfficiencyComponent ],
  imports: [
    CommonModule,
    SharedModule,
    LcoSharedModule
  ]
})
export class OperationEfficiencyModule {
  enterComponent = OperationEfficiencyComponent;
}
