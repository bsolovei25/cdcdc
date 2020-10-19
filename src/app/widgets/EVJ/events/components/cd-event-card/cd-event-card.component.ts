import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEventsWidgetNotificationPreview } from '../../../../../dashboard/models/events-widget';
import { EventService } from '../../../../../dashboard/services/widgets/event.service';

@Component({
    selector: 'evj-cd-event-card',
    templateUrl: './cd-event-card.component.html',
    styleUrls: ['./cd-event-card.component.scss']
})
export class CdEventCardComponent implements OnInit {

    @Input()
    public cardDataArr: IEventsWidgetNotificationPreview[];

    @Input()
    public cardActiveId: number = 0;

    @Input()
    public isCdEvents: boolean = false;

    @Output()
    public cardClick: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public cardDeleteClick: EventEmitter<number> = new EventEmitter<number>();

    constructor(private eventService: EventService) {
    }

    ngOnInit(): void {
    }

    public eventClick(id: number): void {
        this.cardClick.emit(id);
    }

    public deleteClick(event: MouseEvent, id: number): void {
        this.cardDeleteClick.emit(id);
    }

    public async changeIsAcknowledged(eventCard: IEventsWidgetNotificationPreview): Promise<void> {
        eventCard.isAcknowledged = !eventCard.isAcknowledged;
        try {
            const a = await this.eventService.changeEventIsAcknowledged(
                eventCard.id,
                eventCard.isAcknowledged
            );
        } catch (error) {
            console.error('EVENT CARD ERROR -> IsAcknowledged', error);
        }
    }

}
