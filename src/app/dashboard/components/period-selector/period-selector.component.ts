import { Component, OnInit } from '@angular/core';
import { HeaderDataService } from '../../services/header-data.service';
import { WidgetService } from '../../services/widget.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
    selector: 'evj-period-selector',
    templateUrl: './period-selector.component.html',
    styleUrls: ['./period-selector.component.scss'],
})
export class PeriodSelectorComponent implements OnInit {
    public toDate: Date;
    public fromDate: Date;
    public isCurrent: boolean;

    constructor(
        private headerData: HeaderDataService,
        private widgetService: WidgetService,
        private snackBar: SnackBarService,
    ) { }

    public ngOnInit(): void {
        this.fromDate = new Date();
        this.toDate = new Date();
        this.setDefault();
    }

    private setDefault(): void {
        const currentDatetime: Date = new Date(Date.now());
        this.fromDate = new Date(
            currentDatetime.getFullYear(),
            currentDatetime.getMonth(),
            currentDatetime.getDate(),
            0,
            0,
            0
        );
        this.toDate = new Date(
            currentDatetime.getFullYear(),
            currentDatetime.getMonth(),
            currentDatetime.getDate(),
            23,
            59,
            59
        );
        this.isCurrent = true;
        this.headerData.catchDefaultDate(this.fromDate, this.toDate, this.isCurrent);
    }

    public isCurrentChange(value: boolean): void {
        this.isCurrent = value;
        this.headerData.catchStatusButton(this.isCurrent);

        if (this.isCurrent) {
            this.widgetService.currentDates$.next(null);
            this.headerData.catchDefaultDate(this.fromDate, this.toDate, this.isCurrent);
        } else {
            this.setDates();
        }
    }

    public dateTimePickerInput(date: Date, isStart: boolean): void {
        if (this.isCurrent) {
            return;
        }
        if (isStart && new Date(date).getTime() > this.toDate.getTime()) {
            this.fromDate = new Date(this.fromDate);
            this.snackBar.openSnackBar(
                'Установлено неверное время! Время начала периода должно быть меньше времени конца периода',
                'snackbar-red'
            );
            console.error('wrong time!');
            return;
        } else if (!isStart && new Date(date).getTime() < this.fromDate.getTime()) {
            this.toDate = new Date(this.toDate);
            this.snackBar.openSnackBar(
                'Установлено неверное время! Время конца периода должно быть больше времени начала периода',
                'snackbar-red'
            );
            console.error('wrong time!');
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
