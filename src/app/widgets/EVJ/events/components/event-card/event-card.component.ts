import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IEventsWidgetNotificationPreview } from '../../../../../dashboard/models/events-widget';
import { EventService } from '../../../../../dashboard/services/widgets/event.service';

@Component({
    selector: 'evj-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit, OnDestroy {
    @Input()
    public cardDataArr: IEventsWidgetNotificationPreview[];

    @Input()
    public viewType: 'block' | 'list';

    @Input()
    public cardActiveId: number = 0;

    @Input()
    public isCardActive: boolean = false;

    @Input()
    public isCdEvents: boolean = false;

    @Output()
    public cardClick: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public cardDeleteClick: EventEmitter<number> = new EventEmitter<number>();

    constructor(private eventService: EventService) {
    }

    public ngOnInit(): void {
        console.log(this.isCdEvents);
    }

    public ngOnDestroy(): void {
    }

    public eventClick(id: number): void {
        this.cardClick.emit(id);
    }

    public deleteClick(id: number): void {
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
