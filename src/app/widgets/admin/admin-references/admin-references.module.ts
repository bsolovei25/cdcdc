import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AdminReferencesComponent } from './admin-references.component';
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

@NgModule({
    declarations: [AdminReferencesComponent],
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
    ],
})
export class AdminReferencesModule {
    enterComponent = AdminReferencesComponent;
}
