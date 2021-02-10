import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzConsumptionIndicatorsComponent } from './astue-onpz-consumption-indicators.component';
import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [AstueOnpzConsumptionIndicatorsComponent],
    imports: [CommonModule, SharedModule, MatSelectModule],
})
export class AstueOnpzConsumptionIndicatorsModule {
    enterComponent = AstueOnpzConsumptionIndicatorsComponent;
}
