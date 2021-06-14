import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SouStreamsComponent } from '@widgets/SOU/sou-streams/sou-streams.component';
import { SharedModule } from '@shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatRadioModule } from '@angular/material/radio';
import { SmartTrendComponent } from './smart-trend/smart-trend.component';
import { TrendsComponent } from './smart-trend/components/trends/trends.component';
import { TrendTableComponent } from './smart-trend/components/trend-table/trend-table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SouWorkspaceModule } from '@widgets/SOU/sou-workspace/sou-workspace.module';

@NgModule({
    declarations: [
        SouStreamsComponent,
        SmartTrendComponent,
        TrendsComponent,
        TrendTableComponent
    ],
  imports: [CommonModule, SharedModule, MatSelectModule, AngularSvgIconModule, ScrollingModule, MatRadioModule, DragDropModule, SouWorkspaceModule
  ]
})
export class SouStreamsModule {
    enterComponent = SouStreamsComponent;
}
