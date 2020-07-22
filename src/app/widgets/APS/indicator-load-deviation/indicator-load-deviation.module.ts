import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorLoadDeviationComponent } from './indicator-load-deviation.component';
import { SharedModule } from '../../../@shared/shared.module';

@NgModule({
    declarations: [IndicatorLoadDeviationComponent],
    imports: [CommonModule, SharedModule],
})
export class IndicatorLoadDeviationModule {
    enterComponent = IndicatorLoadDeviationComponent;
}
