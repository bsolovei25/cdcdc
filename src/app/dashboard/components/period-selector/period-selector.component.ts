import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';
import { NewWidgetService } from '../../services/new-widget.service';
import { FormControl } from '@angular/forms';
import { ITime } from '../../models/time-data-picker';

@Component({
    selector: 'evj-period-selector',
    templateUrl: './period-selector.component.html',
    styleUrls: ['./period-selector.component.scss'],
})
export class PeriodSelectorComponent implements OnInit {
    public toDate: Date;
    public fromDate: Date;
    public isCurrent: boolean;

    public datePicker: boolean = false;
    public datePickerOpen: number;

    public dateNow: Date;

    // date = new FormControl();

    constructor(private headerData: HeaderDataService, private widgetService: NewWidgetService) {
        this.setDefault();
    }

    ngOnInit(): void {
        this.dateNow = new Date();
    }

    setDefault(): void {
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
                const eventDate: Date = new Date(event);
                if (eventDate < defaultTime) {
                    this.toDate = eventDate;
                    this.fromDate = eventDate;
                } else {
                    this.toDate = eventDate;
                }
            } else {
                this.toDate = defaultTime;
            }
        } else {
            if (event) {
                const eventDate: Date = new Date(event);
                if (new Date(event) > defaultTime) {
                    this.toDate = eventDate;
                    this.fromDate = eventDate;
                } else {
                    this.fromDate = eventDate;
                }
            } else {
                this.fromDate = defaultTime;
            }
        }

        this.isCurrent = false;
        this.headerData.catchDefaultDate(this.fromDate, this.toDate, this.isCurrent);

        const dates = {
            fromDateTime: this.fromDate,
            toDateTime: this.toDate,
        };
        this.widgetService.currentDatesObservable.next(dates);
        console.log(dates);
    }

    isCurrentChange(value: boolean): void {
        this.isCurrent = value;
        this.headerData.catchStatusButton(this.isCurrent);

        if (this.isCurrent) {
            this.widgetService.wsSetParams();
        } else {
            const dates = {
                fromDateTime: this.fromDate,
                toDateTime: this.toDate,
            };
            console.log(dates);
            this.widgetService.currentDatesObservable.next(dates);
        }
    }

    

    dateTimePickerStart(data: ITime): void {
        const time = data.time.split(':');
        const date = new Date(data.date);

        this.fromDate = new Date(date.setHours(+time[0], +time[1], +time[2]));

        this.headerData.catchDefaultDate(this.fromDate, this.toDate, this.isCurrent);
    }

    dateTimePickerEnd(data: ITime): void {
        const time = data.time.split(':');
        const date = new Date(data.date);

        this.toDate = new Date(date.setHours(+time[0], +time[1], +time[2]));

        this.headerData.catchDefaultDate(this.fromDate, this.toDate, this.isCurrent);
    }
}
