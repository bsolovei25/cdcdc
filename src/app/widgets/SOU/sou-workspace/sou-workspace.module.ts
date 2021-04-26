import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouWorkspaceComponent } from './sou-workspace.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    declarations: [SouWorkspaceComponent],
    imports: [CommonModule, SharedModule],
})
export class SouWorkspaceModule {
    enterComponent = SouWorkspaceComponent;
}
