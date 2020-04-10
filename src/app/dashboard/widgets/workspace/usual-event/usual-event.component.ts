import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { EventsWorkspaceService } from '../../../services/events-workspace.service';
import { IUser, EventsWidgetNotification } from '../../../models/events-widget';

@Component({
    selector: 'evj-usual-event',
    templateUrl: './usual-event.component.html',
    styleUrls: ['./usual-event.component.scss'],
})
export class UsualEventComponent implements OnInit {
    @ViewChild('progress') progress: ElementRef;

    progressLineHeight: number;

    constructor(public ewService: EventsWorkspaceService) {}

    ngOnInit(): void {}

    @HostListener('document:resize', ['$event'])
    OnResize(event): void {
        try {
            // this.progressLine();
        } catch (error) {}
    }

    public compareFn(a, b): boolean {
        return a && b && a.id === b.id;
    }

    public onSendMessage(message: string, msgType: 'comments' | 'facts'): void {
        this.ewService.sendMessageToEvent(message, msgType, false);
    }

    public onChangeEventDescription(description: string): void {
        this.ewService.event.description = description;
    }

    public dateTimePicker(date: Date): void {
        this.ewService.setDeadlineToEvent(date);
    }

    public chooseRespons(data: IUser): void {
        this.ewService.event.fixedBy = data;
    }

    public onLoadEvent(id: number): void {
        this.setEventByInfo(id);
    }

    private async setEventByInfo(value: EventsWidgetNotification | number): Promise<void> {
        this.ewService.isLoading = true;

        this.ewService.setEventByInfo(value);

        setTimeout(() => (this.ewService.isLoading = false), 500);

        // this.progressLine();
    }

    public overlayConfirmationOpen(): void {
        this.ewService.isOverlayConfirmOpen = true;
    }

    public overlayConfirmationClose(): void {
        this.ewService.isOverlayConfirmOpen = false;
    }

    public openLineChart(): void {
        this.ewService.isOverlayChartOpen = true;
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public overlayChartClose(): void {
        this.ewService.isOverlayChartOpen = false;
    }

    public onEditRetrieval(retNotid: EventsWidgetNotification): void {
        this.ewService.isEditRetrievalEvent = true;
        this.ewService.retrievalEvent = retNotid;
        this.ewService.isOverlayRetrivealOpen = true;
    }

    public addRetrieval(): void {
        this.ewService.createNewEvent(true);

        this.ewService.isOverlayRetrivealOpen = true;
    }

    // TODO
    public progressLine(): void {
        const heightMiddle = this.progress.nativeElement.offsetParent.offsetHeight - 103;
        const countRetAll = this.ewService.event.retrievalEvents.length;
        let countRetComplete = 0;
        for (let i of this.ewService.event.retrievalEvents) {
            if (i.innerNotification.status.name === 'closed') {
                countRetComplete++;
            }
        }
        this.progressLineHeight = (heightMiddle / countRetAll) * countRetComplete;
    }
}
