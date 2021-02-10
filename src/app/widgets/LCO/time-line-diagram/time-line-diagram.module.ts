import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeLineDiagramComponent } from './time-line-diagram.component';
import { TimeDiagramComponent } from './time-diagram/time-diagram.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [TimeLineDiagramComponent, TimeDiagramComponent],
    imports: [CommonModule, SharedModule],
})
export class TimeLineDiagramModule {
    enterComponent = TimeLineDiagramComponent;
}
