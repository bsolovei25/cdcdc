import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsWorkspaceComponent } from './events-workspace.component';
import { SharedModule } from '@shared/shared.module';
import { LineChartWorkspaceComponent } from './components/line-chart-workspace/line-chart-workspace.component';
import { ChatComponent } from './components/chat/chat.component';
import { EventDescriptionComponent } from './components/event-description/event-description.component';
import { EventSearchWindowComponent } from './components/event-search-window/event-search-window.component';
import { EventsCommentWindowComponent } from './components/events-comment-window/events-comment-window.component';
import { EventsCorrectComponent } from './components/events-correct/events-correct.component';
import { EventsCorrectCardComponent } from './components/events-correct-card/events-correct-card.component';
import { EventsListWindowComponent } from './components/events-list-window/events-list-window.component';
import { EventsReasonsComponent } from './components/events-reasons/events-reasons.component';
import { EventsReasonsSingleComponent } from './components/events-reasons-single/events-reasons-single.component';
import { EventsResponsibleSelectComponent } from './components/events-responsible-select/events-responsible-select.component';
import { EventsSmotrIconComponent } from './components/events-smotr-icon/events-smotr-icon.component';
import { EventsWorkspaceButtonComponent } from './components/events-workspace-button/events-workspace-button.component';
import { FileAttachMenuComponent } from './components/file-attach-menu/file-attach-menu.component';
import { UsualEventComponent } from './usual-event/usual-event.component';
import { SmotrEventComponent } from './smotr-event/smotr-event.component';
import { EjsEventComponent } from './ejs-event/ejs-event.component';
import { CdcpEventComponent } from './cdcp-event/cdcp-event.component';
import { AsusEventComponent } from './asus-event/asus-event.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksEventComponent } from './tasks-event/tasks-event.component';
import { ShiftPassComponent } from './shift-pass/shift-pass.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EventsPlaceComponent } from './components/events-place/events-place.component';
import { FormatStatusPipe } from "../evj-events-workspace/components/evj-events-workspace-select/formatStatus.pipe";

@NgModule({
    declarations: [
        EventsWorkspaceComponent,
        UsualEventComponent,
        SmotrEventComponent,
        EjsEventComponent,
        CdcpEventComponent,
        AsusEventComponent,
        LineChartWorkspaceComponent,
        ChatComponent,
        EventDescriptionComponent,
        EventSearchWindowComponent,
        EventsCommentWindowComponent,
        EventsCorrectComponent,
        EventsCorrectCardComponent,
        EventsListWindowComponent,
        EventsReasonsComponent,
        EventsReasonsSingleComponent,
        EventsResponsibleSelectComponent,
        EventsSmotrIconComponent,
        EventsWorkspaceButtonComponent,
        FileAttachMenuComponent,
        TasksEventComponent,
        ShiftPassComponent,
        EventsPlaceComponent,
        FormatStatusPipe
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
        EventsWorkspaceComponent
    ]
})
export class EventsWorkspaceModule {
    enterComponent = EventsWorkspaceComponent;
}
