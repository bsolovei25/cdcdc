import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OqOilQualityComponent } from './oq-oil-quality.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [OqOilQualityComponent],
    imports: [CommonModule, SharedModule],
})
export class OqOilQualityModule {
    enterComponent = OqOilQualityComponent;
}
