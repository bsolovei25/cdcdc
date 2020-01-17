import { Component, OnInit } from '@angular/core';
import { Widgets } from '../../models/widget.model';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { IfStmt } from '@angular/compiler';

@Component({
    selector: 'evj-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    public checkClick = true;

    public typeWidgetChoose = [];

    private subscription: Subscription;

    widgets: Widgets[];

    public newArrayType = [];

    constructor(public widgetService: NewWidgetService) {
        this.subscription = this.widgetService.widgets$.subscribe((dataW) => {
            this.widgets = dataW;
            this.newArrayType = this.filterData(this.widgets);
        });
    }

    ngOnInit() {}

    public onCheck(data: any) {
        if (data === true) {
            this.checkClick = false;
        } else {
            this.checkClick = true;
        }
    }

    public filterData(data) {
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
    }
}
