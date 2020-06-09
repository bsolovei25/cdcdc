import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { EventsWidgetNotificationPreview } from '../../../../models/events-widget';


@Component({
    selector: 'evj-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit, OnDestroy {

    @Input()
    public cardDataArr: EventsWidgetNotificationPreview[];

    @Input()
    public viewType: 'block' | 'list';

    @Input()
    public cardActiveId: number = 0;

    @Input()
    public isCardActive: boolean = false;

    @Output()
    public cardClick: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public cardDeleteClick: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
    }

    public eventClick(id: number): void {
        this.cardClick.emit(id);
    }

    public deleteClick(id: number): void {
        this.cardDeleteClick.emit(id);
    }
}
