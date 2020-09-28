import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OzsmMonitoringMainComponent } from './ozsm-monitoring-main.component';
import { SharedModule } from '@shared/shared.module';
import { OzsmSharedModule } from '../ozsm-shared/ozsm-shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [OzsmMonitoringMainComponent],
  imports: [CommonModule, SharedModule, OzsmSharedModule, AngularSvgIconModule],
})
export class OzsmMonitoringMainModule {
    enterComponent = OzsmMonitoringMainComponent;
}
