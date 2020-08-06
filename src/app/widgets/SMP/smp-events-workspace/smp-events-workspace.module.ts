import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmpEventsWorkspaceComponent } from './smp-events-workspace.component';
import { SharedModule } from '../../../@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [SmpEventsWorkspaceComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class SmpEventsWorkspaceModule {
    enterComponent = SmpEventsWorkspaceComponent;
}
