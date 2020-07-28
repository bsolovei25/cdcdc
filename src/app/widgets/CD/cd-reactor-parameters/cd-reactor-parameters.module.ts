import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdReactorParametersComponent } from './cd-reactor-parameters.component';
import { ContemporaryWidgetHeaderComponent } from '@shared/components/contemporary-widget-header/contemporary-widget-header.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewWorkflowWindowComponent } from '../../APS/components/view-workflow-window/view-workflow-window.component';
import { ApsInputComponent } from '../../APS/components/view-workflow-window/aps-input/aps-input.component';
import { ApsRecipeDiagramQualityComponent } from '../../APS/aps-recipe-diagram/components/aps-recipe-diagram-quility/aps-recipe-diagram-quality.component';
import { SharedModule } from '@shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        CdReactorParametersComponent,
        ContemporaryWidgetHeaderComponent,
        ViewWorkflowWindowComponent,
        ApsInputComponent,
        ApsRecipeDiagramQualityComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatCheckboxModule,
        FormsModule
    ]
})
export class CdReactorParametersModule {
    enterComponent = CdReactorParametersComponent;
}
