import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EjcoOnpzUnitKpeComponent } from './ejco-onpz-unit-kpe.component';
import { SharedModule } from '@shared/shared.module';
import { EjcoOnpzSharedModule } from '../ejco-onpz-shared/ejco-onpz-shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [
        EjcoOnpzUnitKpeComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        EjcoOnpzSharedModule,
        MatTooltipModule,
    ],
})
export class EjcoOnpzUnitKpeModule {
    enterComponent = EjcoOnpzUnitKpeComponent;
}
