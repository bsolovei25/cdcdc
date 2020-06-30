import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScenariosComponent } from './scenarios.component';
import { ExpandableBottomFrameComponent } from './components/expandable-bottom-frame/expandable-bottom-frame.component';
import { ApsNotchedContainerComponent } from '@shared/components/aps-notched-container/aps-notched-container.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        ScenariosComponent,
        ExpandableBottomFrameComponent,
        ApsNotchedContainerComponent,
        ProgressBarComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatSelectModule,
        FormsModule,
    ],
})
export class ScenariosModule {
    enterComponent = ScenariosComponent;
}
