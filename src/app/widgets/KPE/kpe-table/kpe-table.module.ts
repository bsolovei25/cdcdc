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
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { KpeTableHeaderComponent } from './components/kpe-table-header/kpe-table-header.component';
import { KpeTableDevelopmentComponentComponent } from './components/kpe-table-development-component/kpe-table-development-component.component';
import { KpeTableLoadingComponentComponent } from './components/kpe-table-loading-component/kpe-table-loading-component.component';
import { KpeComponentsSearchPipe } from './components/kpe-components-search.pipe';

@NgModule({
    declarations: [
        KpeTableComponent,
        KpeDatetimepickerComponent,
        KpeSelectComponent,
        KpeTableHeaderComponent,
        KpeTableDevelopmentComponentComponent,
        KpeTableLoadingComponentComponent,
        KpeComponentsSearchPipe,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatFormFieldModule,
        MatOptionModule,
        MatSelectModule,
        AngularSvgIconModule,
        MatTooltipModule,
        MatRippleModule,
        FormsModule,
        MatDatepickerModule,
    ],
    exports: [
        KpeDatetimepickerComponent
    ]
})
export class KpeTableModule {
    enterComponent = KpeTableComponent;
}
