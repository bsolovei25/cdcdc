import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnergeticsComponent } from './energetics.component';
import { SharedModule } from '@shared/shared.module';
import { LcoSharedModule } from '../lco-shared/lco-shared.module';

@NgModule({
    declarations: [EnergeticsComponent],
    imports: [CommonModule, SharedModule, LcoSharedModule],
})
export class EnergeticsModule {
    enterComponent = EnergeticsComponent;
}
