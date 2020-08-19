import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { IInputOptions } from '../../../../@shared/models/input.model';
import { IChatMessageWithAttachments } from '../components/chat/chat.component';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/events-workspace.service';
import { UserSettingsService } from '../../../../dashboard/services/user-settings.service';

@Component({
    selector: 'evj-cdcp-event',
    templateUrl: './cdcp-event.component.html',
    styleUrls: ['./cdcp-event.component.scss'],
})
export class CdcpEventComponent implements OnInit {
    public inputOptions: IInputOptions = {
        type: 'text',
        state: 'normal',
        placeholder: 'Номер позиции',
        isMovingPlaceholder: true,
    };

    constructor(
        public ewService: EventsWorkspaceService,
        private userService: UserSettingsService
    ) {}

    ngOnInit(): void {}

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onSendMessage(
        message: IChatMessageWithAttachments,
        msgType: 'comments' | 'facts'
    ): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    public openMnemo(): void {
        this.userService.LoadScreenByWidget('cd-mat-balance');
    }
}
