import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';
import { IChatMessageWithAttachments } from '../components/evj-chat/evj-chat.component';

@Component({
    selector: 'evj-ejs-event',
    templateUrl: './evj-ejs-event.component.html',
    styleUrls: ['./evj-ejs-event.component.scss']
})
export class EvjEjsEventComponent implements OnInit, OnDestroy, OnChanges {

    @Input()
    public noOverflow: boolean = false;

    public createIcon: boolean = true;
    @Output() eventCreated: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() blockWorkspaceButton: boolean;
    @Input() isEventOpen: boolean;

    constructor(public ewService: EventsWorkspaceService) {
    }

    ngOnInit(): void {
        if (this.ewService.isCreateNewEvent) {
            this.onClickEjs();
            this.ewService.goBackEvent();
        }
    }
    public ngOnChanges(changes: SimpleChanges): void {
        this.createIcon = this.isEventOpen;
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

    onClickEjs(): void {
        window.open('http://10.80.128.41/meridium');
    }
    public createEvent(event: boolean): void {
        this.createIcon = false;
        this.blockWorkspaceButton = true;
        this.eventCreated.emit(event);
    }
}
