import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpePlanEnforceabilityComponent } from './kpe-plan-enforceability.component';
import { SharedModule } from '../../../@shared/shared.module';
import { KpeSharedModule } from '../shared/kpe-shared.module';



@NgModule({
  declarations: [KpePlanEnforceabilityComponent],
  imports: [
    CommonModule,
    SharedModule,
    KpeSharedModule
  ]
})
export class KpePlanEnforceabilityModule {
  enterComponent = KpePlanEnforceabilityComponent;
}
