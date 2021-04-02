import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminReportServerConfiguratorComponent } from './admin-report-server-configurator.component';
import { SharedModule } from '@shared/shared.module';
import { AdminReportServerConfiguratorRepositoryComponent } from './components/admin-report-server-configurator-repository/admin-report-server-configurator-repository.component';
import { MatRippleModule } from '@angular/material/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AdminReportServerConfiguratorRepositoryHeaderComponent } from './components/admin-report-server-configurator-repository/admin-report-server-configurator-repository-header/admin-report-server-configurator-repository-header.component';
import { AdminReportServerConfiguratorRepositoryAddressComponent } from './components/admin-report-server-configurator-repository/admin-report-server-configurator-repository-address/admin-report-server-configurator-repository-address.component';
import { AdminServerConfiguratorReferenceMenuComponent } from './components/admin-server-configurator-reference-menu/admin-server-configurator-reference-menu.component';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { AdminReportServerConfiguratorRepositoryAddComponent } from './components/admin-report-server-configurator-repository/admin-report-server-configurator-repository-add/admin-report-server-configurator-repository-add.component';



@NgModule({
  declarations: [
    AdminReportServerConfiguratorComponent,
    AdminReportServerConfiguratorRepositoryComponent,
    AdminReportServerConfiguratorRepositoryHeaderComponent,
    AdminReportServerConfiguratorRepositoryAddressComponent,
    AdminServerConfiguratorReferenceMenuComponent,
    AdminReportServerConfiguratorRepositoryAddComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    MatRippleModule,
    OverlayModule,
  ]
})
export class AdminReportServerConfiguratorModule {
  enterComponent = AdminReportServerConfiguratorComponent;
}
