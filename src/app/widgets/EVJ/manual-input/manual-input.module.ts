import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualInputComponent } from './manual-input.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [ManualInputComponent],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        FormsModule
    ]
})
export class ManualInputModule {
    enterComponent = ManualInputComponent;
}
