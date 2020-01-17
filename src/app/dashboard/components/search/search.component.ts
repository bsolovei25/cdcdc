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
    public checkClick = false;

    public typeWidgetChoose = [];

    private subscription: Subscription;

    widgets: Widgets[];

    public newArrayType = [];

    constructor(public widgetService: NewWidgetService) {
        this.subscription = this.widgetService.getAvailableWidgets().subscribe((dataW) => {
            this.widgets = dataW;
            this.newArrayType = this.filterData(this.widgets);
        });
    }

    ngOnInit() {}

    public onCheck(data: any) {
        if(data){
            this.checkClick = data; 
        }
    }

    public filterData(data) {
        let newArray = [];
        for (let i of data) {
            newArray.push(i.widgetType);
        }
        let newFilterArray = [...new Set(newArray)];
        return newFilterArray;
    }
}
