import { Component, OnInit, Input } from '@angular/core';
import {
    EventsWidgetNotificationStatus,
    IRetrievalEvents,
    EventsWidgetNotification, IRetrievalEventDto
} from '../../../../models/events-widget';
import { EventsWorkspaceService } from '../../../../services/widgets/events-workspace.service';

@Component({
    selector: 'evj-events-correct-card',
    templateUrl: './events-correct-card.component.html',
    styleUrls: ['./events-correct-card.component.scss'],
})
export class EventsCorrectCardComponent implements OnInit {
    @Input() public event: IRetrievalEventDto = null;
    @Input() public isClickable: boolean = true;

    public readonly statusesColors: { [id in EventsWidgetNotificationStatus]: string } = {
        new: 'standart',
        inWork: 'warning',
        closed: 'danger',
    };

    constructor(public ewService: EventsWorkspaceService) { }

    ngOnInit(): void { }

    public onClickDelete(): void {
        if (!this.isClickable) {
            return;
        }
        this.ewService.deleteRetrievalEvent(this.event);
    }

    public onClickUnlink(): void {
        if (!this.isClickable) {
            return;
        }
        this.ewService.deleteRetrievalLink(this.event.innerNotificationId);
    }

    public onClickEdit(): void {
        if (!this.isClickable) {
            return;
        }
        this.ewService.editEvent(this.event.innerNotificationId);
    }

    public onClickCard(): void {
        if (!this.isClickable) {
            return;
        }
        this.ewService.editEvent(this.event.innerNotificationId);
    }

    // private async setEventByInfo(value: EventsWidgetNotification | number): Promise<void> {
    //     this.ewService.isLoading = true;
    //
    //     this.ewService.editEvent(value);
    //
    //     setTimeout(() => (this.ewService.isLoading = false), 500);
    //
    //     // this.progressLine();
    // }
}
