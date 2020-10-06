import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarPlanComponent } from './calendar-plan.component';
import { SharedModule } from '@shared/shared.module';
import { LcoSharedModule } from '../lco-shared/lco-shared.module';



@NgModule({
  declarations: [ CalendarPlanComponent ],
  imports: [
    CommonModule,
    SharedModule,
    LcoSharedModule
  ]
})
export class CalendarPlanModule {
  enterComponent = CalendarPlanComponent;
}
