import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ApsOperatingModesComponent } from './aps-operating-modes.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    declarations: [ApsOperatingModesComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatDatepickerModule,
        NgxMatDatetimePickerModule,
        AngularSvgIconModule,
        ScrollingModule,
        ScrollingModule,
        ExperimentalScrollingModule,
        MatTableModule,
    ],
})
export class ApsOperatingModesModule {
    enterComponent = ApsOperatingModesComponent;
}
