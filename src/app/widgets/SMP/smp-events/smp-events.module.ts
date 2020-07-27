import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmpEventsComponent } from './smp-events.component';
import { SmpEventsCardComponent } from './components/smp-events-card/smp-events-card.component';
import { SmpEventsHeaderComponent } from './components/smp-events-header/smp-events-header.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '../../../@shared/shared.module';

@NgModule({
    declarations: [SmpEventsComponent, SmpEventsCardComponent, SmpEventsHeaderComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class SmpEventsModule {
    enterComponent = SmpEventsComponent;
}
