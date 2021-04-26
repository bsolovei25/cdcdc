import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouWorkspaceComponent } from './sou-workspace.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from "angular-svg-icon";

@NgModule({
    declarations: [SouWorkspaceComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule]
})
export class SouWorkspaceModule {
    enterComponent = SouWorkspaceComponent;
}
