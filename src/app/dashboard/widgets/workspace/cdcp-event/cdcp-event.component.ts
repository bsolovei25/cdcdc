import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { EventsWorkspaceService } from '../../../services/widgets/events-workspace.service';
import { IInputOptions } from '../../../../@shared/models/input.model';
import { IChatMessageWithAttachments } from '../components/chat/chat.component';

@Component({
  selector: 'evj-cdcp-event',
  templateUrl: './cdcp-event.component.html',
  styleUrls: ['./cdcp-event.component.scss']
})
export class CdcpEventComponent implements OnInit {

    public inputOptions: IInputOptions = {
        type: 'text',
        state: 'normal',
        placeholder: 'Номер позиции',
        isMovingPlaceholder: true,
    };

    constructor(public ewService: EventsWorkspaceService) {}

    ngOnInit(): void {}

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onSendMessage(message: IChatMessageWithAttachments, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType);
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    public openLineChart(): void {
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }
}
