import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpeTotalReserveComponent } from './kpe-total-reserve.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [KpeTotalReserveComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class KpeTotalReserveModule {
    enterComponent = KpeTotalReserveComponent;
}
