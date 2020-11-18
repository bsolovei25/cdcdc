import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AstueOnpzTableIndicatorsComponent } from './astue-onpz-table-indicators.component';
import { EvjEventsWorkspaceModule } from '../../EVJ/evj-events-workspace/evj-events-workspace.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AstueOnpzConventionalFuelModule } from '../astue-onpz-conventional-fuel/astue-onpz-conventional-fuel.module';



@NgModule({
  declarations: [AstueOnpzTableIndicatorsComponent],
    imports: [
        CommonModule,
        SharedModule,
        AngularSvgIconModule,
        MatCheckboxModule,
        FormsModule,
        MatTooltipModule,
        EvjEventsWorkspaceModule,
        MatFormFieldModule,
        MatSelectModule,
        AstueOnpzConventionalFuelModule
    ]
})
export class AstueOnpzTableIndicatorsModule {
    enterComponent = AstueOnpzTableIndicatorsComponent;
}
