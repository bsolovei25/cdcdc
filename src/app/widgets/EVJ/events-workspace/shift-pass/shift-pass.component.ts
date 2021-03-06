import { Component, OnInit } from '@angular/core';
import { IChatMessageWithAttachments } from '../components/chat/chat.component';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';

@Component({
    selector: 'evj-shift-pass',
    templateUrl: './shift-pass.component.html',
    styleUrls: ['./shift-pass.component.scss'],
})
export class ShiftPassComponent implements OnInit {
    constructor(public ewService: EventsWorkspaceService) {}

    public ngOnInit(): void {
        if (this.ewService.isEditEvent) {
            this.ewService.event.priority = this.ewService.priority.find((value) => value.name === 'danger');
            this.ewService.event.status = this.ewService.status.find((value) => value.name === 'inWork');
        }
    }

    public openLineChart(): void {
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public onSendMessage(message: IChatMessageWithAttachments, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public infoFunc(infoType: 'start' | 'inWork' | 'close'): any {
        const obj = this.ewService.event?.productionTasks;
        return obj ? obj[infoType] : undefined;
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    public dateTimePickerStart(date: Date): void {
        this.ewService.setStartToEvent(date);
    }

    public onChangeEventDescription(description: string, el?: string): void {
        if (el) {
            this.ewService.event.shiftPassEvent[el] = description;
        }
    }

    public setStartToEvent(value: Date): void {
        this.ewService.setStartToEvent(value);
    }

    public setDeadlineToEvent(value: Date): void {
        this.ewService.setDeadlineToEvent(value);
    }
}
