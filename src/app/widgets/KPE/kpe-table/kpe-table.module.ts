import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeTableComponent } from './kpe-table.component';
import { SharedModule } from '@shared/shared.module';
import { KpeDatetimepickerComponent } from './components/kpe-datetimepicker/kpe-datetimepicker.component';
import { KpeSelectComponent } from './components/kpe-select/kpe-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
    declarations: [KpeTableComponent, KpeDatetimepickerComponent, KpeSelectComponent],
    imports: [
        CommonModule,
        SharedModule,
        MatFormFieldModule,
        MatSelectModule,
        AngularSvgIconModule,
        MatTooltipModule,
        MatRippleModule
    ]
})
export class KpeTableModule {
    enterComponent = KpeTableComponent;
}
