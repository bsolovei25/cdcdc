import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminReportServerConfiguratorComponent } from './admin-report-server-configurator.component';
import { SharedModule } from '@shared/shared.module';
import { AdminReportServerConfiguratorRepositoryComponent } from './components/admin-report-server-configurator-repository/admin-report-server-configurator-repository.component';



@NgModule({
  declarations: [AdminReportServerConfiguratorComponent, AdminReportServerConfiguratorRepositoryComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminReportServerConfiguratorModule {
  enterComponent = AdminReportServerConfiguratorComponent;
}
