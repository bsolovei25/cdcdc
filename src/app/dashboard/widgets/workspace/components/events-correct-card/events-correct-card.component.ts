import { Component, OnInit, Input } from '@angular/core';
import { EventsWorkspaceService } from '../../../../services/events-workspace.service';
import {
    EventsWidgetNotificationStatus,
    IRetrievalEvents,
    EventsWidgetNotification,
} from '../../../../models/events-widget';

@Component({
    selector: 'evj-events-correct-card',
    templateUrl: './events-correct-card.component.html',
    styleUrls: ['./events-correct-card.component.scss'],
})
export class EventsCorrectCardComponent implements OnInit {
    @Input() public event: IRetrievalEvents = null;
    public status: string = 'danger';

    public readonly statusesColors: { [id in EventsWidgetNotificationStatus]: string } = {
        new: 'standart',
        inWork: 'warning',
        closed: 'danger',
    };

    constructor(public ewService: EventsWorkspaceService) {}

    ngOnInit(): void {}

    public onClickDelete(): void {
        this.ewService.deleteRetrievalEvent(this.event);
    }

    public onClickEdit(): void {
        this.ewService.isEditRetrievalEvent = true;
        this.ewService.retrievalEvent = this.event.innerNotification;
        this.ewService.isOverlayRetrivealOpen = true;
    }

    public onClickCard(): void {
        this.setEventByInfo(this.event.innerNotification.id);
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
}
