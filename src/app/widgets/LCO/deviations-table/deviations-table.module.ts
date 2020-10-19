import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviationsTableComponent } from './deviations-table.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    declarations: [DeviationsTableComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class DeviationsTableModule {
    enterComponent = DeviationsTableComponent;
}
