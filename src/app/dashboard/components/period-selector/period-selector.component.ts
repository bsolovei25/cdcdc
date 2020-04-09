import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';
import { WidgetService } from '../../services/widget.service';

@Component({
    selector: 'evj-period-selector',
    templateUrl: './period-selector.component.html',
    styleUrls: ['./period-selector.component.scss'],
})
export class PeriodSelectorComponent implements OnInit {
    public toDate: Date;
    public fromDate: Date;
    public isCurrent: boolean;
    public dateNow: Date;

    constructor(private headerData: HeaderDataService,
                private widgetService: WidgetService
    ) { }

    public ngOnInit(): void {
        this.setDefault();
        this.fromDate = new Date();
        this.toDate = new Date();
        this.dateNow = new Date();
    }

    private setDefault(): void {
        let defaultTime: Date = new Date(Date.now());
        defaultTime = new Date(
            defaultTime.getFullYear(),
            defaultTime.getMonth(),
            defaultTime.getDate(),
            0,
            0,
            0
        );
        this.toDate = defaultTime;
        this.fromDate = defaultTime;
        this.isCurrent = true;
        this.headerData.catchDefaultDate(this.fromDate, this.toDate, this.isCurrent);
    }

    public isCurrentChange(value: boolean): void {
        this.isCurrent = value;
        this.headerData.catchStatusButton(this.isCurrent);

        if (this.isCurrent) {
            this.widgetService.currentDates$.next(null);
        } else {
            this.setDates();
        }
    }

    public dateTimePickerInput(date: Date, isStart: boolean): void {
        if (this.isCurrent) {
            return;
        }
        if (isStart) {
            this.fromDate = new Date(date);
        } else {
            this.toDate = new Date(date);
        }
        this.headerData.catchDefaultDate(this.fromDate, this.toDate, this.isCurrent);
        this.setDates();
    }

    private setDates(): void {
        const dates = {
            fromDateTime: this.fromDate,
            toDateTime: this.toDate,
        };
        this.widgetService.currentDates$.next(dates);
    }
}
