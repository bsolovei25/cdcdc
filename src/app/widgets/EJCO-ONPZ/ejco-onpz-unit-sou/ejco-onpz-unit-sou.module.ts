import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjcoOnpzUnitSouComponent } from './ejco-onpz-unit-sou.component';
import { SharedModule } from '@shared/shared.module';
import { EjcoOnpzSharedModule } from '../ejco-onpz-shared/ejco-onpz-shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    declarations: [EjcoOnpzUnitSouComponent],
    imports: [CommonModule, SharedModule, EjcoOnpzSharedModule, MatTooltipModule, MatRippleModule],
})
export class EjcoOnpzUnitSouModule {
    enterComponent = EjcoOnpzUnitSouComponent;
}
