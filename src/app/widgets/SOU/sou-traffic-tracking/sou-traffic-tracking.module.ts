import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { SouTrafficTrackingComponent } from './sou-traffic-tracking.component';

@NgModule({
    declarations: [SouTrafficTrackingComponent],
    imports: [CommonModule, SharedModule],
})
export class SouTrafficTrackingModule {
    enterComponent = SouTrafficTrackingComponent;
}
