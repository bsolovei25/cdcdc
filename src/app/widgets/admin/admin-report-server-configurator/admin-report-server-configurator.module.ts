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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminReportServerConfiguratorFileComponent } from './components/admin-report-server-configurator-repository/admin-report-server-congigurator-file/admin-report-server-configurator-file.component';
import { AdminReportServerConfiguratorParametersComponent } from './components/admin-report-server-configurator-parameters/admin-report-server-configurator-parameters.component';
import { AdminReportServerConfiguratorParametersHeaderComponent } from './components/admin-report-server-configurator-parameters/admin-report-server-configurator-parameters-header/admin-report-server-configurator-parameters-header.component';
import { AdminReportServerConfiguratorParametersSelectComponent } from './components/admin-report-server-configurator-parameters/admin-report-server-configurator-parameters-select/admin-report-server-configurator-parameters-select.component';
import { AdminReportServerConfiguratorAccessComponent } from './components/admin-report-server-configurator-parameters/admin-report-server-configurator-access/admin-report-server-configurator-access.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AdminReportServerConfiguratorRepositoryAddFileComponent } from './components/admin-report-server-configurator-repository/admin-report-server-configurator-repository-add-file/admin-report-server-configurator-repository-add-file.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdminReportServerConfiguratorListGroupComponent } from './components/admin-report-server-configurator-parameters/admin-report-server-configurator-list-group/admin-report-server-configurator-list-group.component';
import { AdminFileWorkModule } from "@widgets/admin/admin-file-work/admin-file-work.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AdminReportConfiguratorService } from './services/admin-report-server-configurator.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AdminReportServerConfiguratorAccessDeniedComponent } from './components/admin-report-server-configurator-parameters/admin-report-server-configurator-access-denied/admin-report-server-configurator-access-denied.component';
import { AdminRscMacrosEditComponent } from './components/admin-report-server-configurator-parameters/admin-rsc-macros-edit/admin-rsc-macros-edit.component';
import { AdminRscAutogenerationComponent } from './components/admin-report-server-configurator-parameters/admin-rsc-autogeneration/admin-rsc-autogeneration.component';
import { AdminRscDatetimepickerComponent } from './components/admin-report-server-configurator-parameters/admin-rsc-datetimepicker/admin-rsc-datetimepicker.component';
import { AdminRscReportSheetComponent } from './components/admin-report-server-configurator-parameters/admin-rsc-report-sheet/admin-rsc-report-sheet.component';
import { AdminRscPeriodEditComponent } from './components/admin-report-server-configurator-parameters/admin-rsc-period-edit/admin-rsc-period-edit.component';
import { MatRadioModule } from '@angular/material/radio';
import { AdminRscParameterAutogenerationComponent } from './components/admin-report-server-configurator-parameters/admin-rsc-parameter-autogeneration/admin-rsc-parameter-autogeneration.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminRscPathEditComponent } from './components/admin-report-server-configurator-parameters/admin-rsc-path-edit/admin-rsc-path-edit.component';
import { AdminRscCustomOptionsComponent } from './components/admin-report-server-configurator-parameters/admin-rsc-custom-options/admin-rsc-custom-options.component';
import { SearchPipe } from './shared/search.pipe';
import { AdminRscRepositoryEditComponent } from './components/admin-report-server-configurator-repository/admin-rsc-repository-edit/admin-rsc-repository-edit.component';



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
    AdminReportServerConfiguratorParametersSelectComponent,
    AdminReportServerConfiguratorAccessComponent,
    AdminReportServerConfiguratorRepositoryAddFileComponent,
    AdminReportServerConfiguratorAccessDeniedComponent,
    AdminRscMacrosEditComponent,
    AdminRscAutogenerationComponent,
    AdminRscDatetimepickerComponent,
    AdminRscReportSheetComponent,
    AdminRscPeriodEditComponent,
    AdminRscParameterAutogenerationComponent,
    AdminRscPathEditComponent,
    AdminRscCustomOptionsComponent,
    SearchPipe,
    AdminRscRepositoryEditComponent,
    AdminReportServerConfiguratorListGroupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    MatRippleModule,
    OverlayModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatExpansionModule,
  ],
  exports: [
    SearchPipe
  ],
  providers: [
    AdminReportConfiguratorService,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    AdminFileWorkModule
  ]
})
export class AdminReportServerConfiguratorModule {
    enterComponent = AdminReportServerConfiguratorComponent;
}
