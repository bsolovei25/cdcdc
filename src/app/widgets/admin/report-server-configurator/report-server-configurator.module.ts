import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportServerConfiguratorComponent } from './report-server-configurator.component';
import { AddReportFileComponent } from './add-report-file/add-report-file.component';
import { SystemAutogenerateComponent } from './popup-system-options/system-autogenerate/system-autogenerate.component';
import { PopupSystemOptionsComponent } from './popup-system-options/popup-system-options.component';
import { SystemMacroEditComponent } from './popup-system-options/system-macro-edit/system-macro-edit.component';
import { SystemParameterValuesAutogenerationComponent } from './popup-system-options/system-parameter-values-autogeneration/system-parameter-values-autogeneration.component';
import { SystemReportSheetsComponent } from './popup-system-options/system-report-sheets/system-report-sheets.component';
import { PopupUserOptionsComponent } from './popup-user-options/popup-user-options.component';
import { AdditionalParamComponent } from './popup-user-options/additional-param/additional-param.component';
import { NecessaryParamComponent } from './popup-user-options/necessary-param/necessary-param.component';
import { ReportFileSelectBoxComponent } from './report-file-select-box/report-file-select-box.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatSelectModule } from '@angular/material/select';
import { ParameterAutogenerationComponent } from './popup-system-options/system-parameter-values-autogeneration/parameter-autogeneration/parameter-autogeneration.component';
import { SystemPathUserComponent } from './popup-system-options/system-path-edit/system-path-user/system-path-user.component';
import { SystemPathEditComponent } from './popup-system-options/system-path-edit/system-path-edit.component';
import { SystemPeriodDateComponent } from './popup-system-options/system-period-edit/system-period-date/system-period-date.component';
import { SystemPeriodDateDayComponent } from './popup-system-options/system-period-edit/system-period-date/system-period-date-day/system-period-date-day.component';
import { SystemPeriodDateMonthComponent } from './popup-system-options/system-period-edit/system-period-date/system-period-date-month/system-period-date-month.component';
import { SystemPeriodDateYearComponent } from './popup-system-options/system-period-edit/system-period-date/system-period-date-year/system-period-date-year.component';
import { SystemPeriodEditComponent } from './popup-system-options/system-period-edit/system-period-edit.component';
import { TreeModule } from '@circlon/angular-tree-component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportNameConfiguratorComponent } from './report-name-configurator/report-name-configurator.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        ReportServerConfiguratorComponent,
        AddReportFileComponent,
        PopupSystemOptionsComponent,
        SystemAutogenerateComponent,
        SystemMacroEditComponent,
        SystemParameterValuesAutogenerationComponent,
        SystemReportSheetsComponent,
        PopupUserOptionsComponent,
        AdditionalParamComponent,
        NecessaryParamComponent,
        ReportFileSelectBoxComponent,
        ParameterAutogenerationComponent,
        SystemPathEditComponent,
        SystemPathUserComponent,
        SystemPeriodEditComponent,
        SystemPeriodDateYearComponent,
        SystemPeriodDateMonthComponent,
        SystemPeriodDateDayComponent,
        SystemPeriodDateComponent,
        ReportNameConfiguratorComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatFormFieldModule,
        MatIconModule,
        MatTooltipModule,
        MatMenuModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatNativeDateModule,
        NgxMatMomentModule,
        FormsModule,
        MatIconModule,
        OverlayModule,
        ReactiveFormsModule,
        MatSelectModule,
        TreeModule,
        MatDialogModule,
        MatSlideToggleModule,
        DragDropModule,

    ],
    exports: [
        SystemPeriodDateYearComponent,
        SystemPeriodDateMonthComponent,
        SystemPeriodDateDayComponent,
        SystemPeriodDateComponent,
    ],
})
export class ReportServerConfiguratorModule {
    enterComponent = ReportServerConfiguratorComponent;
}
