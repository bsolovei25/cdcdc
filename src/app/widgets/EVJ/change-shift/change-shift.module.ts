import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeShiftComponent } from './change-shift.component';
import { SharedModule } from '@shared/shared.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChangeShiftMainWorkerComponent } from './components/change-shift-main-worker/change-shift-main-worker.component';
import { ChangeShiftDatesComponent } from './components/change-shift-dates/change-shift-dates.component';
import { ChangeShiftRolesComponent } from './components/change-shift-roles/change-shift-roles.component';
import { MatSelectModule } from '@angular/material/select';
import { ChangeShiftRolesModule } from './components/change-shift-roles/change-shift-roles.module';
import { ChangeShiftKeeperService } from './services/change-shift-keeper.service';
import { ChangeShiftMemberComponent } from './components/change-shift-member/change-shift-member.component';
import { ChangeShiftVerifierComponent } from './components/change-shift-verifier/change-shift-verifier.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangeShiftMemberContextComponent } from './components/change-shift-member-context/change-shift-member-context.component';

@NgModule({
    declarations: [
        ChangeShiftComponent,
        ChangeShiftMainWorkerComponent,
        ChangeShiftDatesComponent,
        ChangeShiftMemberComponent,
        ChangeShiftVerifierComponent,
        ChangeShiftMemberContextComponent,
    ],
    imports: [
        CommonModule,
        ChangeShiftRolesModule,
        SharedModule,
        AngularSvgIconModule,
        MatRippleModule,
        MatTooltipModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
    exports: [ChangeShiftRolesComponent],
    providers: [ChangeShiftKeeperService],
})
export class ChangeShiftModule {
    enterComponent = ChangeShiftComponent;
}
