import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { IWidgets } from '../../models/widget.model';
import { Subscription } from 'rxjs';
import { WidgetService } from '../../services/widget.service';

@Component({
    selector: 'evj-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
    public checkClick: boolean = false;

    private subscriptions: Subscription[] = [];

    public arrayType: string[] = [];

    @Output() search: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();
    @Input() isReport: boolean = false;
    @Input() isWidgets: boolean = false;

    constructor(public widgetService: WidgetService) {}

    ngOnInit(): void {
        this.subscriptions.push(
            this.widgetService.widgets$.subscribe((dataW) => {
                this.arrayType = this.filterData(dataW);
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subs: Subscription) => subs.unsubscribe());
    }

    public onCheck(data: boolean): void {
        if (data) {
            this.checkClick = true;
        } else {
            this.checkClick = false;
        }
    }

    public filterData(data) {
        try {
            let newArray = [];
            let newCategoryArray = [];
            for (let i of data) {
                if (i.categories || i.categories.length !== 0) {
                    newArray.push(i.categories);
                }
            }
            let newWidgetCategory = [...new Set(newArray)];
            for (let i of newWidgetCategory) {
                for (let j of i) {
                    newCategoryArray.push(j);
                }
            }
            let newFilterArray = [...new Set(newCategoryArray)];

            return newFilterArray;
        } catch (error) {
            console.log('Ошибка:', error);
        }
    }

    searchInput(event: KeyboardEvent): void {
        this.search.emit(event);
    }
}
