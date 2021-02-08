import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeSafetyComponent } from './kpe-safety.component';
import { SharedModule } from '@shared/shared.module';
import { KpeSharedModule } from '../shared/kpe-shared.module';

@NgModule({
    declarations: [KpeSafetyComponent],
    exports: [KpeSafetyComponent],
    imports: [CommonModule, SharedModule, KpeSharedModule],
})
export class KpeSafetyModule {
    enterComponent = KpeSafetyComponent;
}
