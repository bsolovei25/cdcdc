import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { EventsWidgetNotificationPreview } from '../../../../../dashboard/models/events-widget';
import { EventService } from '../../../../../dashboard/services/widgets/event.service';

@Component({
    selector: 'evj-evj-event-card',
    templateUrl: './evj-event-card.component.html',
    styleUrls: ['./evj-event-card.component.scss']
})
export class EvjEventCardComponent implements OnInit {

    @Input()
    public cardDataArr: EventsWidgetNotificationPreview[];

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

    close(): void {
    }

    public eventClick(id: number): void {
        this.cardClick.emit(id);
    }

    public deleteClick(id: number): void {
        this.cardDeleteClick.emit(id);
    }

    public async changeIsAcknowledged(eventCard: EventsWidgetNotificationPreview): Promise<void> {
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
