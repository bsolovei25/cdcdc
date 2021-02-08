import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriggeringCriticalParametersComponent } from './triggering-critical-parameters.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [TriggeringCriticalParametersComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class TriggeringCriticalParametersModule {
    enterComponent = TriggeringCriticalParametersComponent;
}
