import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatedDiagramTrafficLightComponent } from './truncated-diagram-traffic-light.component';
import { PieDiagramComponent } from './components/pie-diagram/pie-diagram.component';
import { SharedModule } from '@shared/shared.module';
import { DashboardModule } from '../../../dashboard/dashboard.module';



@NgModule({
  declarations: [TruncatedDiagramTrafficLightComponent, PieDiagramComponent],
    imports: [
        CommonModule,
        SharedModule,
        DashboardModule
    ]
})
export class TruncatedDiagramTrafficLightModule {
    enterComponent = TruncatedDiagramTrafficLightComponent
}
