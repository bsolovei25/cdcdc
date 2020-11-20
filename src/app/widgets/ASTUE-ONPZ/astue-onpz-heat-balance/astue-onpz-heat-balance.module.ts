import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AstueOnpzHeatBalanceComponent } from './astue-onpz-heat-balance.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [AstueOnpzHeatBalanceComponent],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatCheckboxModule,
        FormsModule,
        MatTooltipModule
    ]
})
export class AstueOnpzHeatBalanceModule {
    enterComponent = AstueOnpzHeatBalanceComponent;
}
