import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjcoOnpzFsbLoadComponent } from './ejco-onpz-fsb-load.component';
import { SharedModule } from '@shared/shared.module';
import { EjcoOnpzSharedModule } from '../ejco-onpz-shared/ejco-onpz-shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [EjcoOnpzFsbLoadComponent],
    imports: [CommonModule, SharedModule, EjcoOnpzSharedModule, MatTooltipModule],
})
export class EjcoOnpzFsbLoadModule {
    enterComponent = EjcoOnpzFsbLoadComponent;
}
