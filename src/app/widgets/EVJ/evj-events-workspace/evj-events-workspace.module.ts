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
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EvjTasksEventComponent } from './evj-tasks-event/evj-tasks-event.component';
import { EvjShiftPassComponent } from './evj-shift-pass/evj-shift-pass.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EvjEventSearchWindowComponent } from './components/evj-event-search-window/evj-event-search-window.component';
import { EvjMainToggleComponent } from './components/evj-main-toggle/evj-main-toggle.component';
import { EvjEventsWorkspaceDatetimepickerComponent } from './components/evj-events-workspace-datetimepicker/evj-events-workspace-datetimepicker.component';
import { EvjEventsWorkspaceSelectComponent } from './components/evj-events-workspace-select/evj-events-workspace-select.component';
import { EvjEventsWorkspaceResponsibleSelectComponent } from './components/evj-events-workspace-responsible/evj-events-workspace-responsible-select.component';

@NgModule({
    declarations: [
        EvjEventsWorkspaceComponent,
        EvjUsualEventComponent,
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
        EvjEventsWorkspaceResponsibleSelectComponent
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
        MatCheckboxModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'ru-RU' },
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] }
    ],
    exports: [
        EvjEventsWorkspaceComponent
    ]
})
export class EvjEventsWorkspaceModule {
    enterComponent = EvjEventsWorkspaceComponent;
}
