import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/events-workspace.service';
import { IChatMessageWithAttachments } from '../components/chat/chat.component';

@Component({
    selector: 'evj-ejs-event',
    templateUrl: './ejs-event.component.html',
    styleUrls: ['./ejs-event.component.scss']
})
export class EjsEventComponent implements OnInit, OnDestroy {

    constructor(public ewService: EventsWorkspaceService) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    public onChangeEventDescription(description: string, el?: string): void {
        if (el) {
            this.ewService.event.shiftPassEvent[el] = description;
        }
    }

    public onSendMessage(
        message: IChatMessageWithAttachments,
        msgType: 'comments' | 'facts'
    ): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public compareFn<T extends { id: number }>(a: T, b: T): boolean {
        return a && b && a.id === b.id;
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }


}
