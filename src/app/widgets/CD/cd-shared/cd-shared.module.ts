import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdLineChartComponent } from './cd-line-chart/cd-line-chart.component';
import { CdMnemonicComponent } from './cd-mnemonic/cd-mnemonic.component';
import { CdModalWindowComponent } from './cd-modal-window/cd-modal-window.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [CdLineChartComponent, CdMnemonicComponent, CdModalWindowComponent],
    exports: [CdLineChartComponent, CdMnemonicComponent, CdModalWindowComponent],
    imports: [
        CommonModule,
        AngularSvgIconModule,
        FormsModule,
        MatSelectModule,
        SharedModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        ReactiveFormsModule,
        MatTooltipModule,
    ],
})
export class CDSharedModule {}
