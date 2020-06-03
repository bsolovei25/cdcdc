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
    public isVisibleFilter: boolean = false;

    private subscriptions: Subscription[] = [];

    public arrayType: string[] = [];

    @Input()
    public panelActive: boolean = false;

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

    public onVisibleFilter(data: boolean): void {
        this.isVisibleFilter = data;
    }

    public filterData(data: IWidgets[]): string[] {
        let newCategoryArray = [];
        data.forEach((value) => {
            if (value?.categories?.length > 0) {
                newCategoryArray = [...newCategoryArray, ...value?.categories];
            }
        });
        return [...new Set(newCategoryArray)];
    }

    searchInput(event: KeyboardEvent): void {
        this.search.emit(event);
    }
}
