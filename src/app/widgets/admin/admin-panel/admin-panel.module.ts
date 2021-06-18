import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { SharedModule } from '../../../@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminAdImportComponent } from './components/admin-ad-import/admin-ad-import.component';
import { AdminEmployeeComponent } from './components/admin-employee/admin-employee.component';
import { AdminGroupsComponent } from './components/admin-groups/admin-groups.component';
import { AdminWorkerSettingsComponent } from './components/admin-worker-settings/admin-worker-settings.component';
import { AdminWorkspaceCardComponent } from './components/admin-workspace/admin-workspace-card/admin-workspace-card.component';
import { AdminWorkspaceComponent } from './components/admin-workspace/admin-workspace.component';
import { AdminClaimsComponent } from './components/admin-workspace/admin-claims/admin-claims.component';
import { AwsAvatarComponent } from './components/admin-worker-settings/aws-avatar/aws-avatar.component';
import { AwsBlockComponent } from './components/admin-worker-settings/aws-block/aws-block.component';
import { AwsCardComponent } from './components/admin-worker-settings/aws-card/aws-card.component';
import { AwsCheckboxCardComponent } from './components/admin-worker-settings/aws-checkbox-card/aws-checkbox-card.component';
import { AwsClaimCardComponent } from './components/admin-worker-settings/aws-claim-card/aws-claim-card.component';
import { AwsCreateClaimComponent } from './components/admin-worker-settings/aws-create-claim/aws-create-claim.component';
import { AwsFieldsComponent } from './components/admin-worker-settings/aws-fields/aws-fields.component';
import { AwsSelectCardComponent } from './components/admin-worker-settings/aws-select-card/aws-select-card.component';
import { AwsWorkspaceCardComponent } from './components/admin-worker-settings/aws-workspace-card/aws-workspace-card.component';
import { AwsWorkspacesComponent } from './components/admin-worker-settings/aws-workspaces/aws-workspaces.component';
import { AgGroupCardComponent } from './components/admin-groups/ag-group-card/ag-group-card.component';
import { AgGroupWorkerCardComponent } from './components/admin-groups/ag-group-worker-card/ag-group-worker-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatInputModule } from '@angular/material/input';
import { SearchWidgetPipe } from './components/admin-worker-settings/aws-create-claim/search-widget.pipe';
import { SearchUnitPipe } from './components/admin-worker-settings/aws-create-claim/search-unit.pipe';
import { SearchEventsCategoriesPipe } from './components/admin-worker-settings/aws-create-claim/search-events-categories.pipe';
import { WorkerCardComponent } from './components/worker-card/worker-card.component';

@NgModule({
    declarations: [
        AdminPanelComponent,
        AdminAdImportComponent,
        AdminEmployeeComponent,
        AdminGroupsComponent,
        AdminWorkerSettingsComponent,
        AdminWorkspaceCardComponent,
        AdminWorkspaceComponent,
        AdminClaimsComponent,
        AwsAvatarComponent,
        AwsBlockComponent,
        AwsCardComponent,
        AwsCheckboxCardComponent,
        AwsClaimCardComponent,
        AwsCreateClaimComponent,
        AwsFieldsComponent,
        AwsSelectCardComponent,
        AwsWorkspaceCardComponent,
        AwsWorkspacesComponent,
        AgGroupCardComponent,
        AgGroupWorkerCardComponent,
        SearchWidgetPipe,
        SearchUnitPipe,
        SearchEventsCategoriesPipe,
        WorkerCardComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        NgxMaskModule.forChild(),
        ImageCropperModule,
    ],
})
export class AdminPanelModule {
    enterComponent = AdminPanelComponent;
}
