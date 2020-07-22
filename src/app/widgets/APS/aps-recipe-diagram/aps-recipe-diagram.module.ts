import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApsRecipeDiagramComponent } from './aps-recipe-diagram.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewWorkflowWindowComponent } from '../components/view-workflow-window/view-workflow-window.component';
import { ApsInputComponent } from '../components/view-workflow-window/aps-input/aps-input.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ApsRecipeDiagramComponent,
        ViewWorkflowWindowComponent,
        ApsInputComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatCheckboxModule,
        FormsModule
    ]
})
export class ApsRecipeDiagramModule {
    enterComponent = ApsRecipeDiagramComponent;
}
