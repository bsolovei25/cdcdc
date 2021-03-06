import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { IChatMessageWithAttachments } from '../components/chat/chat.component';

@Component({
    selector: 'evj-ejs-event',
    templateUrl: './ejs-event.component.html',
    styleUrls: ['./ejs-event.component.scss'],
})
export class EjsEventComponent implements OnInit, OnDestroy {
    @Input()
    public noOverflow: boolean = false;
    private readonly urlOrigin: string = 'http://10.80.128.41/meridium';

    constructor(public ewService: EventsWorkspaceService) {}

    ngOnInit(): void {
        if (this.ewService.isCreateNewEvent) {
            window.open(this.urlOrigin);
            this.ewService.goBackEvent();
        }
    }

    ngOnDestroy(): void {}

    public onChangeEventDescription(description: string, el?: string): void {
        if (el) {
            this.ewService.event.shiftPassEvent[el] = description;
        }
    }

    public onSendMessage(message: IChatMessageWithAttachments, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public compareFn<T extends { id: number }>(a: T, b: T): boolean {
        return a && b && a.id === b.id;
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    onClickEjs(): void {
        window.open(`${this.ewService.event.ejsData.urlOriginalSystem}`);
    }
}
