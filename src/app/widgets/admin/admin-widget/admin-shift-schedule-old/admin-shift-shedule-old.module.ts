import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxMatTimepickerModule, NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { OverlayModule } from '@angular/cdk/overlay';
import { AdminShiftScheduleOldComponent } from './admin-shift-schedule-old.component';
import { AdminShiftBrigadeOldComponent } from './components/admin-shift-brigade-old/admin-shift-brigade-old.component';
import { AdminShiftInfoEmployeeOldComponent } from './components/admin-shift-info-employee-old/admin-shift-info-employee-old.component';
import { AdminShiftCardOldComponent } from './components/admin-shift-card-old/admin-shift-card-old.component';
import { AdminShiftListEmployeesOldComponent } from './components/admin-shift-list-employees-old/admin-shift-list-employees-old.component';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';



@NgModule({
  declarations: [
    AdminShiftScheduleOldComponent,
    AdminShiftBrigadeOldComponent,
    AdminShiftInfoEmployeeOldComponent,
    AdminShiftCardOldComponent,
    AdminShiftListEmployeesOldComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSvgIconModule,
    MatTooltipModule,
    DragDropModule,
    MatMenuModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxMatMomentModule,
    MatFormFieldModule,
    MatIconModule,
    DashboardModule,
    FormsModule,
    MatInputModule,
    OverlayModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
  ],
})
export class AdminShiftSheduleOldModule {
  enterComponent = AdminShiftScheduleOldComponent;
}
