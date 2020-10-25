import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsWidgetCategory, ICategory } from '../../../../../dashboard/models/EVJ/events-widget';

@Component({
    selector: 'evj-cd-event-categories',
    templateUrl: './cd-event-categories.component.html',
    styleUrls: ['./cd-event-categories.component.scss']
})
export class CdEventCategoriesComponent implements OnInit {

    public categoryActive: boolean = false;

    @Input() data: EventsWidgetCategory;

    @Output()
    public categoryClick: EventEmitter<EventsWidgetCategory> =
        new EventEmitter<EventsWidgetCategory>();

    @Output()
    public categoryDeleteClick: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    onCLickItem(data: EventsWidgetCategory): void {
        this.categoryActive = true;
        this.categoryClick.emit(data);
    }

    // Переход в систему источник
    public onClickUrl(e: Event, url: string): void {
        e.stopPropagation();
        window.open(url);
    }

}
