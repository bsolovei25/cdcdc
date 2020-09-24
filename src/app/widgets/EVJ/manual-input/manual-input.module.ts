import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualInputComponent } from './manual-input.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
    declarations: [ManualInputComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class ManualInputModule {
    enterComponent = ManualInputComponent;
}
