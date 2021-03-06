import { Component, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { IInputOptions } from '@shared/interfaces/input.model';
import { IChatMessageWithAttachments } from '../components/evj-chat/evj-chat.component';
import { EventsWorkspaceService } from '../../../../dashboard/services/widgets/EVJ/events-workspace.service';

@Component({
    selector: 'evj-usual-event',
    templateUrl: './evj-usual-event.component.html',
    styleUrls: ['./evj-usual-event.component.scss'],
})
export class EvjUsualEventComponent {
    @Input()
    public noOverflow: boolean = false;

    @ViewChild('progress') progress: ElementRef;

    public inputOptions: IInputOptions = {
        type: 'text',
        state: 'normal',
        placeholder: 'Номер позиции',
        isMovingPlaceholder: true,
    };
    progressLineHeight: number;

    constructor(public ewService: EventsWorkspaceService) {}

    @HostListener('document:resize', ['$event'])
    OnResize(event): void {
        try {
            // this.progressLine();
        } catch (error) {}
    }

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

    public countDifference(): Date {
        return new Date(
            new Date(this.ewService.event?.deadline).getDate() - new Date(this.ewService.event?.eventDateTime).getDate()
        );
    }
    // TODO
    public progressLine(): void {
        const heightMiddle = this.progress.nativeElement.offsetParent.offsetHeight - 103;
        const countRetAll = this.ewService.event.retrievalEvents.length;
        let countRetComplete = 0;
        for (const i of this.ewService.event.retrievalEvents) {
            if (i.status.name === 'closed') {
                countRetComplete++;
            }
        }
        this.progressLineHeight = (heightMiddle / countRetAll) * countRetComplete;
    }

    public setStartToEvent(value: Date): void {
        this.ewService.setStartToEvent(value);
    }

    public setDeadlineToEvent(value: Date): void {
        this.ewService.setDeadlineToEvent(value);
    }
}
