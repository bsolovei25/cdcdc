import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    IEventsWidgetNotificationPreview,
    EventsWidgetNotificationStatus,
} from '../../../../../dashboard/models/EVJ/events-widget';
import { EventService } from '../../../../../dashboard/services/widgets/EVJ/event.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';

export const fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [style({ opacity: 0 }), animate('150ms', style({ opacity: 1 }))]),
]);

@Component({
    selector: 'evj-evj-event-card',
    templateUrl: './evj-event-card.component.html',
    styleUrls: ['./evj-event-card.component.scss'],
    animations: [fadeAnimation],
})
export class EvjEventCardComponent implements OnInit {
    public statuses: { [id in EventsWidgetNotificationStatus]: string } = {
        new: 'Новое',
        inWork: 'В работе',
        closed: 'Завершено',
        wasted: 'Отработано'
    };

    @Input() expandedElement: SelectionModel<number> = new SelectionModel<number>(true);
    @Input() public cardDataArr: IEventsWidgetNotificationPreview[];
    @Input() public viewType: 'block' | 'list';
    @Input() public cardActiveId: number = 0;
    @Input() public isVideoWall: boolean = false;

    @Output()
    public cardClick: EventEmitter<number> = new EventEmitter<number>();
    @Output()
    public cardDeleteClick: EventEmitter<number> = new EventEmitter<number>();
    @Output()
    public selectionExpandedElement: EventEmitter<void> = new EventEmitter<void>();

    constructor(private eventService: EventService) {}

    ngOnInit(): void {}

    public eventClick(id: number): void {
        this.cardClick.emit(id);
    }

    public deleteClick(event: MouseEvent, id: number): void {
        event?.stopPropagation();
        this.cardDeleteClick.emit(id);
    }

    public async changeIsAcknowledged(eventCard: IEventsWidgetNotificationPreview): Promise<void> {
        eventCard.isAcknowledged = !eventCard.isAcknowledged;
        try {
            const a = await this.eventService.changeEventIsAcknowledged(eventCard.id, eventCard.isAcknowledged);
        } catch (error) {
            console.error('EVENT CARD ERROR -> IsAcknowledged', error);
        }
    }

    public toggle(event: MouseEvent, id: number): void {
        event.stopPropagation();
        this.expandedElement.toggle(id);
        this.selectionExpandedElement.emit();
    }
}
