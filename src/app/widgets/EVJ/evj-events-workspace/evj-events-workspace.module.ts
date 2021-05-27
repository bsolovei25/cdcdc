import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvjEventsWorkspaceComponent } from './evj-events-workspace.component';
import { SharedModule } from '@shared/shared.module';
import { EvjLineChartWorkspaceComponent } from './components/evj-line-chart-workspace/evj-line-chart-workspace.component';
import { EvjChatComponent } from './components/evj-chat/evj-chat.component';
import { EvjEventDescriptionComponent } from './components/evj-event-description/evj-event-description.component';
import { EvjEventsCommentWindowComponent } from './components/evj-events-comment-window/evj-events-comment-window.component';
import { EvjEventsCorrectComponent } from './components/evj-events-correct/evj-events-correct.component';
import { EvjEventsCorrectCardComponent } from './components/evj-events-correct-card/evj-events-correct-card.component';
import { EvjEventsListWindowComponent } from './components/evj-events-list-window/evj-events-list-window.component';
import { EvjEventsReasonsComponent } from './components/evj-events-reasons/evj-events-reasons.component';
import { EvjEventsReasonsSingleComponent } from './components/evj-events-reasons-single/evj-events-reasons-single.component';
import { EvjEventsResponsibleSelectComponent } from './components/evj-events-responsible-select/evj-events-responsible-select.component';
import { EvjEventsSmotrIconComponent } from './components/evj-events-smotr-icon/evj-events-smotr-icon.component';
import { EvjEventsWorkspaceButtonComponent } from './components/evj-events-workspace-button/evj-events-workspace-button.component';
import { EvjFileAttachMenuComponent } from './components/evj-file-attach-menu/evj-file-attach-menu.component';
import { EvjUsualEventComponent } from './evj-usual-event/evj-usual-event.component';
import { EvjCmidEventComponent } from './evj-cmid-event/evj-cmid-event.component';
import { EvjCmidEventEditFormComponent } from './evj-cmid-event/components/evj-cmid-event-edit-form/evj-cmid-event-edit-form.component';
import { EvjCmidEventViewFormComponent } from './evj-cmid-event/components/evj-cmid-event-view-form/evj-cmid-event-view-form.component';
import { EvjCmidEventToggleComponent } from './evj-cmid-event/components/evj-cmid-event-toggle/evj-cmid-event-toggle.component';
import { EvjCmidDatetimepickerComponent } from './evj-cmid-event/components/evj-cmid-datetimepicker/evj-cmid-datetimepicker.component';
import { EvjCmidEventPlanTableComponent } from './evj-cmid-event/components/evj-cmid-event-plan-table/evj-cmid-event-plan-table.component';
import { EvjCmidEventChipsComponent } from './evj-cmid-event/components/evj-cmid-event-chips/evj-cmid-event-chips.component';
import { EvjCmidEventChipPopoverComponent } from './evj-cmid-event/components/evj-cmid-event-chips/components/evj-cmid-event-chip-popover/evj-cmid-event-chip-popover.component';
import { EvjEventDropdownComponent } from './components/evj-event-dropdown/evj-event-dropdown.component';
import { EvjCmidEventFileDropzoneComponent } from './evj-cmid-event/components/evj-cmid-event-file-dropzone/evj-cmid-event-file-dropzone.component';
import { EvjSmpoEventComponent } from './evj-smpo-event/evj-smpo-event.component';
import { EvjSmpoEventDatetimepickerComponent } from './evj-smpo-event/components/evj-smpo-event-datetimepicker/evj-smpo-event-datetimepicker.component';
import { EvjSmotrEventComponent } from './evj-smotr-event/evj-smotr-event.component';
import { EvjEjsEventComponent } from './evj-ejs-event/evj-ejs-event.component';
import { EvjCdcpEventComponent } from './evj-cdcp-event/evj-cdcp-event.component';
import { EvjAsusEventComponent } from './evj-asus-event/evj-asus-event.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MAT_DATE_LOCALE, MatRippleModule } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { EvjTasksEventComponent } from './evj-tasks-event/evj-tasks-event.component';
import { EvjShiftPassComponent } from './evj-shift-pass/evj-shift-pass.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EvjEventSearchWindowComponent } from './components/evj-event-search-window/evj-event-search-window.component';
import { EvjMainToggleComponent } from './components/evj-main-toggle/evj-main-toggle.component';
import { EvjEventsWorkspaceDatetimepickerComponent } from './components/evj-events-workspace-datetimepicker/evj-events-workspace-datetimepicker.component';
import { EvjEventsWorkspaceSelectComponent } from './components/evj-events-workspace-select/evj-events-workspace-select.component';
import { EvjEventsWorkspaceResponsibleSelectComponent } from './components/evj-events-workspace-responsible/evj-events-workspace-responsible-select.component';
import { EvjEventsPlaceComponent } from './components/evj-events-place/evj-events-place.component';
import { EvjEventsWorkspaceExtraOptionsComponent } from './components/evj-events-workspace-extra-options/evj-events-workspace-extra-options.component';
import { EvjEventsWorkspaceRestrictionsComponent } from './components/evj-events-workspace-restrictions/evj-events-workspace-restrictions.component';
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaskModule } from 'ngx-mask';
import { EvjEventsSmpoReasonsComponent } from './components/evj-events-smpo-reasons/evj-events-smpo-reasons.component';
import { EvjEventsSmpoReasonsMenuComponent } from './components/evj-events-smpo-reasons-menu/evj-events-smpo-reasons-menu.component';
import { EvjEventsSmpoReasonItemComponent } from './components/evj-events-smpo-reasons/evj-events-smpo-reason-item/evj-events-smpo-reason-item.component';
import { EvjEventsSmpoReasonsMenuItemComponent } from './components/evj-events-smpo-reasons-menu/evj-events-smpo-reasons-menu-item/evj-events-smpo-reasons-menu-item.component';
import { EvjEventsSmpoCorrectComponent } from './components/evj-events-smpo-correct/evj-events-smpo-correct.component';
import { EvjEventsSmpoCorrectMenuComponent } from './components/evj-events-smpo-correct-menu/evj-events-smpo-correct-menu.component';
import { EvjEventsSmpoCorrectItemComponent } from './components/evj-events-smpo-correct/evj-events-smpo-correct-item/evj-events-smpo-correct-item.component';
import { EvjSmpoEventCriticalComponent } from './evj-smpo-event/components/evj-smpo-event-critical/evj-smpo-event-critical.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EvjTasksEventNoCheckboxComponent } from './evj-tasks-event-no-checkbox/evj-tasks-event-no-checkbox.component';
import { CmidDictionaryService } from "@dashboard/services/widgets/CMID/cmid-dictionary.service";

@NgModule({
    declarations: [
        EvjEventsWorkspaceComponent,
        EvjUsualEventComponent,
        EvjCmidEventComponent,
        EvjCmidEventEditFormComponent,
        EvjCmidEventViewFormComponent,
        EvjCmidEventToggleComponent,
        EvjCmidDatetimepickerComponent,
        EvjCmidEventPlanTableComponent,
        EvjCmidEventChipsComponent,
        EvjCmidEventChipPopoverComponent,
        EvjEventDropdownComponent,
        EvjCmidEventFileDropzoneComponent,
        EvjSmpoEventComponent,
        EvjSmpoEventDatetimepickerComponent,
        EvjSmotrEventComponent,
        EvjEjsEventComponent,
        EvjCdcpEventComponent,
        EvjAsusEventComponent,
        EvjLineChartWorkspaceComponent,
        EvjChatComponent,
        EvjEventDescriptionComponent,
        EvjEventSearchWindowComponent,
        EvjEventsCommentWindowComponent,
        EvjEventsCorrectComponent,
        EvjEventsCorrectCardComponent,
        EvjEventsListWindowComponent,
        EvjEventsReasonsComponent,
        EvjEventsReasonsSingleComponent,
        EvjEventsResponsibleSelectComponent,
        EvjEventsSmotrIconComponent,
        EvjEventsWorkspaceButtonComponent,
        EvjFileAttachMenuComponent,
        EvjTasksEventComponent,
        EvjShiftPassComponent,
        EvjMainToggleComponent,
        EvjEventsWorkspaceDatetimepickerComponent,
        EvjEventsWorkspaceSelectComponent,
        EvjEventsWorkspaceResponsibleSelectComponent,
        EvjEventsPlaceComponent,
        EvjEventsWorkspaceExtraOptionsComponent,
        EvjEventsSmpoReasonsComponent,
        EvjEventsSmpoReasonsMenuComponent,
        EvjEventsSmpoReasonItemComponent,
        EvjEventsSmpoReasonsMenuItemComponent,
        EvjEventsSmpoCorrectComponent,
        EvjEventsSmpoCorrectMenuComponent,
        EvjEventsSmpoCorrectItemComponent,
        EvjEventsWorkspaceRestrictionsComponent,
        EvjSmpoEventCriticalComponent,
        EvjTasksEventNoCheckboxComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        AngularSvgIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatRippleModule,
        MatDialogModule,
        NgxMatDatetimePickerModule,
        MatDatepickerModule,
        NgxMaskModule,
        MatProgressSpinnerModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'ru-RU' },
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        CmidDictionaryService
    ],
    exports: [EvjEventsWorkspaceComponent, EvjEventsWorkspaceSelectComponent, EvjTasksEventNoCheckboxComponent],
})
export class EvjEventsWorkspaceModule {
    enterComponent = EvjEventsWorkspaceComponent;
}
