import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {
    EventsWidgetNotificationPreview,
    EventsWidgetNotificationStatus, ISubcategory
} from '../../../../../dashboard/models/events-widget';
import { EventService } from '../../../../../dashboard/services/widgets/event.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';

export const fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [style({ opacity: 0 }), animate('150ms', style({ opacity: 1 }))])
]);

@Component({
    selector: 'evj-evj-event-card',
    templateUrl: './evj-event-card.component.html',
    styleUrls: ['./evj-event-card.component.scss'],
    animations: [fadeAnimation]
})
export class EvjEventCardComponent implements OnInit {

    public statuses: { [id in EventsWidgetNotificationStatus]: string } = {
        new: 'Новое',
        inWork: 'В работе',
        closed: 'Завершено'
    };

    @Input() expandedElement: SelectionModel<number> = new SelectionModel<number>(true);
    @Input() public cardDataArr: EventsWidgetNotificationPreview[];
    @Input() public viewType: 'block' | 'list';
    @Input() public cardActiveId: number = 0;

    @Output()
    public cardClick: EventEmitter<number> = new EventEmitter<number>();
    @Output()
    public cardDeleteClick: EventEmitter<number> = new EventEmitter<number>();
    @Output()
    public selectionExpandedElement: EventEmitter<number> = new EventEmitter<number>();

    constructor(private eventService: EventService) {
    }

    ngOnInit(): void {
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

    public toggle(id: number): void {
        this.expandedElement.toggle(id);
    }

}
