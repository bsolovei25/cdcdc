import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouStreamsComponent } from '@widgets/SOU/sou-streams/sou-streams.component';
import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRadioModule } from '@angular/material/radio';
import { SouWorkspaceModule } from '@widgets/SOU/sou-workspace/sou-workspace.module';


@NgModule({
    declarations: [
        SouStreamsComponent
    ],
    imports: [CommonModule, SharedModule, MatSelectModule, AngularSvgIconModule, ScrollingModule, MatRadioModule, SouWorkspaceModule]
})
export class SouStreamsModule {
    enterComponent = SouStreamsComponent;
}
