import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AdminShiftScheduleComponent } from './admin-shift-schedule.component';
import { AdminShiftBrigadeComponent } from './components/admin-shift-brigade/admin-shift-brigade.component';
import { AdminShiftCardComponent } from './components/admin-shift-card/admin-shift-card.component';
import { AdminShiftInfoEmployeeComponent } from './components/admin-shift-info-employee/admin-shift-info-employee.component';
import { AdminShiftListEmployeesComponent } from './components/admin-shift-list-employees/admin-shift-list-employees.component';
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

@NgModule({
  declarations: [
    AdminShiftScheduleComponent,
    AdminShiftBrigadeComponent,
    AdminShiftInfoEmployeeComponent,
    AdminShiftCardComponent,
    AdminShiftListEmployeesComponent
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
export class AdminShiftScheduleModule {
  enterComponent = AdminShiftScheduleComponent;
}
