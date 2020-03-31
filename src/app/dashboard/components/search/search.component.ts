import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IWidgets } from '../../models/widget.model';
import { Subscription } from 'rxjs';
import { WidgetService } from '../../services/widget.service';

@Component({
    selector: 'evj-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    public checkClick = true;

    public typeWidgetChoose = [];

    private subscription: Subscription;

    widgets: IWidgets[];

    public newArrayType = [];
    public newArrayClick = [];

    @Output() searchReport = new EventEmitter<KeyboardEvent>();

    @Input() isReport: boolean = false;

    constructor(public widgetService: WidgetService) {
        this.subscription = this.widgetService.widgets$.subscribe((dataW) => {
            this.widgets = dataW;
            this.newArrayType = this.filterData(this.widgets);
        });
    }

    ngOnInit() { }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    public onCheck(data: any) {
        if (data === true) {
            this.checkClick = false;
        } else {
            this.checkClick = true;
        }
    }

    public onFilterMass(data: any) {
        this.newArrayClick = data;
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

    searchReports(event: KeyboardEvent) {
        this.searchReport.emit(event);
    }
}
