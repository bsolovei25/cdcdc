import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { IUser, EventsWidgetNotification } from '../../../models/events-widget';
import { EventsWorkspaceService } from '../../../services/widgets/events-workspace.service';

@Component({
    selector: 'evj-usual-event',
    templateUrl: './usual-event.component.html',
    styleUrls: ['./usual-event.component.scss'],
})
export class UsualEventComponent implements OnInit {
    @ViewChild('progress') progress: ElementRef;

    progressLineHeight: number;

    constructor(public ewService: EventsWorkspaceService) { }

    ngOnInit(): void { }

    @HostListener('document:resize', ['$event'])
    OnResize(event): void {
        try {
            // this.progressLine();
        } catch (error) { }
    }

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onSendMessage(message: string, msgType: 'comments' | 'facts'): void {
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

    public overlayChartClose(): void {
        this.ewService.isOverlayChartOpen = false;
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
}
