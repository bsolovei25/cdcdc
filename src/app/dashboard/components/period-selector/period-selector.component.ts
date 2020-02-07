import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';
import { NewWidgetService } from '../../services/new-widget.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'evj-period-selector',
    templateUrl: './period-selector.component.html',
    styleUrls: ['./period-selector.component.scss'],
})
export class PeriodSelectorComponent implements OnInit {
    public toDate: Date;
    public fromDate: Date;
    public isCurrent: boolean;

    // date = new FormControl();

    constructor(
        private headerData: HeaderDataService,
        private widgetService: NewWidgetService
    ) {
        this.setDefault();
    }

    ngOnInit(): void {}

    setDefault(): void {
        let defaultTime = new Date();
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
        this.headerData.catchDefaultDate(
            this.fromDate,
            this.toDate,
            this.isCurrent
        );
    }

    setDateTime(event, datetime): void {
        // this.headerData.catchDate(event, datetime);
        let defaultTime = new Date();
        defaultTime = new Date(
            defaultTime.getFullYear(),
            defaultTime.getMonth(),
            defaultTime.getDate(),
            0,
            0,
            0
        );

        if (datetime === 1) {
            if (event) {
                if (new Date(event) < defaultTime) {
                    this.toDate = event;
                    this.fromDate = event;
                } else {
                    this.toDate = event;
                }
            } else {
                this.toDate = defaultTime;
            }
        } else {
            if (event) {
                if (new Date(event) > defaultTime) {
                    this.toDate = event;
                    this.fromDate = event;
                } else {
                    this.fromDate = event;
                }
            } else {
                this.fromDate = defaultTime;
            }
        }

        this.isCurrent = false;
        this.headerData.catchDefaultDate(
            this.fromDate,
            this.toDate,
            this.isCurrent
        );

        const dates: Date[] = [];
        dates.push(this.fromDate);
        dates.push(this.toDate);
        this.widgetService.wsSetParams(dates);
    }

    isCurrentChange(value: boolean): void {
        this.isCurrent = value;
        this.headerData.catchStatusButton(this.isCurrent);

        if (this.isCurrent) {
            this.widgetService.wsSetParams();
        } else {
            const dates: Date[] = [];
            dates.push(this.fromDate);
            dates.push(this.toDate);
            this.widgetService.wsSetParams(dates);
        }
    }
}
