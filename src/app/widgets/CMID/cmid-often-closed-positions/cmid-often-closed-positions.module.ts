import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { CmidOftenClosedPositionsComponent } from './cmid-often-closed-positions.component';

@NgModule({
    declarations: [CmidOftenClosedPositionsComponent],
    imports: [CommonModule, SharedModule],
})
export class CmidOftenClosedPositionsModule {
    enterComponent = CmidOftenClosedPositionsComponent;
}
