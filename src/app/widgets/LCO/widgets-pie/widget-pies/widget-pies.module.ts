import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetPiesComponent } from './widget-pies.component';
import { WidgetsPieComponent } from '../widget-pie-circle/widget-pie.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardModule } from '../../../../dashboard/dashboard.module';



@NgModule({
  declarations: [WidgetPiesComponent, WidgetsPieComponent],
    imports: [
        CommonModule,
        SharedModule,
        DashboardModule
    ]
})
export class WidgetPiesModule {
    enterComponent = WidgetPiesComponent;
}
