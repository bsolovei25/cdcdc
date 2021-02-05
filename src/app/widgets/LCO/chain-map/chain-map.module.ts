import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChainMapComponent } from './chain-map.component';
import { SharedModule } from '../../../@shared/shared.module';

@NgModule({
    declarations: [ChainMapComponent],
    imports: [CommonModule, SharedModule],
})
export class ChainMapModule {
    enterComponent = ChainMapComponent;
}
