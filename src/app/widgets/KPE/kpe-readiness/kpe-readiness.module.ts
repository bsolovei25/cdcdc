import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeReadinessComponent } from './kpe-readiness.component';
import { KpeSharedModule } from '../shared/kpe-shared.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [KpeReadinessComponent],
    imports: [CommonModule, SharedModule, KpeSharedModule],
})
export class KpeReadinessModule {
    enterComponent = KpeReadinessComponent;
}
