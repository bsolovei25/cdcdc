import { NgModule } from '@angular/core';
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
import { WidgetPreviewComponent } from '../../../dashboard/components/widget-preview/widget-preview.component';

@NgModule({
  declarations: [AdminShiftScheduleComponent, AdminShiftBrigadeComponent,
    AdminShiftInfoEmployeeComponent, AdminShiftCardComponent,
    AdminShiftListEmployeesComponent, WidgetPreviewComponent],
  imports: [CommonModule, SharedModule, AngularSvgIconModule, MatTooltipModule,
    DragDropModule, MatMenuModule, MatDatepickerModule],
})
export class AdminShiftScheduleModule {
  enterComponent = AdminShiftScheduleComponent;
}
