import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouWorkspaceComponent } from './sou-workspace.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from "angular-svg-icon";
import { SouWorkspaceInfoBarComponent } from './components/sou-workspace-info-bar/sou-workspace-info-bar.component';
import { MatSelectModule } from "@angular/material/select";

@NgModule({
    declarations: [SouWorkspaceComponent, SouWorkspaceInfoBarComponent],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, MatSelectModule]
})
export class SouWorkspaceModule {
    enterComponent = SouWorkspaceComponent;
}
