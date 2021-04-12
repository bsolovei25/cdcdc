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
import { OverlayModule } from '@angular/cdk/overlay';
import { AdminReportServerConfiguratorRepositoryAddComponent } from './components/admin-report-server-configurator-repository/admin-report-server-configurator-repository-add/admin-report-server-configurator-repository-add.component';
import { AdminReportNameConfiguratorComponent } from './components/admin-report-name-configurator/admin-report-name-configurator.component';
import {  MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminReportServerConfiguratorFileComponent } from './components/admin-report-server-configurator-repository/admin-report-server-congigurator-file/admin-report-server-configurator-file.component';
import { AdminReportServerConfiguratorParametersComponent } from './components/admin-report-server-configurator-parameters/admin-report-server-configurator-parameters.component';
import { AdminReportServerConfiguratorParametersHeaderComponent } from './components/admin-report-server-configurator-parameters/admin-report-server-configurator-parameters-header/admin-report-server-configurator-parameters-header.component';
import { AdminReportServerConfiguratorParametersChangeComponent } from './components/admin-report-server-configurator-parameters/admin-report-server-configurator-parameters-change/admin-report-server-configurator-parameters-change.component';
import { AdminReportServerConfiguratorParametersSelectComponent } from './components/admin-report-server-configurator-parameters/admin-report-server-configurator-parameters-select/admin-report-server-configurator-parameters-select.component';



@NgModule({
  declarations: [
    AdminReportServerConfiguratorComponent,
    AdminReportServerConfiguratorRepositoryComponent,
    AdminReportServerConfiguratorRepositoryHeaderComponent,
    AdminReportServerConfiguratorRepositoryAddressComponent,
    AdminServerConfiguratorReferenceMenuComponent,
    AdminReportServerConfiguratorRepositoryAddComponent,
    AdminReportNameConfiguratorComponent,
    AdminReportServerConfiguratorFileComponent,
    AdminReportServerConfiguratorParametersComponent,
    AdminReportServerConfiguratorParametersHeaderComponent,
    AdminReportServerConfiguratorParametersChangeComponent,
    AdminReportServerConfiguratorParametersSelectComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    MatRippleModule,
    OverlayModule,
    MatSlideToggleModule
  ]
})
export class AdminReportServerConfiguratorModule {
  enterComponent = AdminReportServerConfiguratorComponent;
}
