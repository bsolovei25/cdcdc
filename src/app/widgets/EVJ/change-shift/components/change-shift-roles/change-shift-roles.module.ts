import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeShiftRolesComponent } from './change-shift-roles.component';
import { ChangShiftRolesPersonComponent } from './components/chang-shift-roles-person/chang-shift-roles-person.component';
import { ChangeShiftRolesFooterComponent } from './components/change-shift-roles-footer/change-shift-roles-footer.component';
import { ChangeShiftRolesHeaderLeftComponent } from './components/change-shift-roles-header-left/change-shift-roles-header-left.component';
import { ChangeShiftRolesHeaderRightComponent } from './components/change-shift-roles-header-right/change-shift-roles-header-right.component';
import { ChangeShiftRolesReferenceComponent } from './components/change-shift-roles-reference/change-shift-roles-reference.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '@shared/shared.module';
import { ChangeShiftRolesService } from './services/change-shift-roles.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ChangeShiftRolesComponent,
        ChangShiftRolesPersonComponent,
        ChangeShiftRolesFooterComponent,
        ChangeShiftRolesHeaderLeftComponent,
        ChangeShiftRolesHeaderRightComponent,
        ChangeShiftRolesReferenceComponent,
    ],
    imports: [CommonModule, SharedModule, AngularSvgIconModule, MatSelectModule, ReactiveFormsModule],
    exports: [ChangeShiftRolesComponent],
    providers: [ChangeShiftRolesService],
})
export class ChangeShiftRolesModule {}
