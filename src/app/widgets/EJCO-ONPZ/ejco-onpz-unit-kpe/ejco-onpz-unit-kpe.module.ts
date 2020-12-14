import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjcoOnpzUnitKpeComponent } from './ejco-onpz-unit-kpe.component';
import { SharedModule } from '@shared/shared.module';
import { EjcoOnpzSharedModule } from '../ejco-onpz-shared/ejco-onpz-shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    declarations: [EjcoOnpzUnitKpeComponent],
    imports: [CommonModule, SharedModule, EjcoOnpzSharedModule, MatTooltipModule, MatRippleModule],
})
export class EjcoOnpzUnitKpeModule {
    enterComponent = EjcoOnpzUnitKpeComponent;
}
