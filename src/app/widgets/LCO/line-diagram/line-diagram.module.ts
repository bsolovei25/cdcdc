import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineDiagramComponent } from './line-diagram.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [LineDiagramComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule],
})
export class LineDiagramModule {
    enterComponent = LineDiagramComponent;
}
