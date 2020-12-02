import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ApsOperatingModesComponent } from './aps-operating-modes.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';


@NgModule({
  declarations: [ ApsOperatingModesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule
  ]
})
export class ApsOperatingModesModule {
    enterComponent = ApsOperatingModesComponent;
}
