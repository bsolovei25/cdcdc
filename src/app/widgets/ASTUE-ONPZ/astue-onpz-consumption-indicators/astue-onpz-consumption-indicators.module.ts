import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzConsumptionIndicatorsComponent } from './astue-onpz-consumption-indicators.component';
import { AstueOnpzConsumptionIndicatorsService } from './astue-onpz-consumption-indicators.service';
import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    declarations: [AstueOnpzConsumptionIndicatorsComponent],
    imports: [CommonModule, SharedModule, MatSelectModule],
    providers: [AstueOnpzConsumptionIndicatorsService],
})
export class AstueOnpzConsumptionIndicatorsModule {
    enterComponent = AstueOnpzConsumptionIndicatorsComponent;
}
