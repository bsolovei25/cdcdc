import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEventsWidgetNotificationPreview } from '../../../../../dashboard/models/events-widget';

@Component({
    selector: 'evj-evj-event-card-block',
    templateUrl: './evj-event-card-block.component.html',
    styleUrls: ['./evj-event-card-block.component.scss']
})
export class EvjEventCardBlockComponent implements OnInit {

    @Input() data: IEventsWidgetNotificationPreview;
    @Input() public cardActiveId: number = 0;
    @Output()
    public cardDeleteClick: EventEmitter<number> = new EventEmitter<number>();
    @Output()
    public cardClick: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public eventClick(id: number): void {
        this.cardClick.emit(id);
    }

    public deleteClick(id: number): void {
        this.cardDeleteClick.emit(id);
    }

}
