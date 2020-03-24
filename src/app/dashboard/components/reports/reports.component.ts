import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { ReportsService } from '../../services/reports.service';
import { ITime } from '../../models/time-data-picker';

@Component({
    selector: 'evj-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {

    private subscription: Subscription;

    public active: boolean = false;

    public datePicker: boolean = false;
    public datePickerOpen: number;

    constructor(
        public widgetService: NewWidgetService,
        private reportsService: ReportsService
    ) {
        this.subscription = this.widgetService.widgets$.subscribe((dataW) => {
        });
    }

    ngOnInit() {
        this.loadItem();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    toggle() {
        this.active = !this.active;
    }

    async loadItem(): Promise<void> {
        await this.reportsService.getReportsTemplate();
    }

    openDatePicker(selectBlock: number): void {
        this.datePickerOpen = selectBlock;
        this.datePicker = true;
    }

    dateTimePickerNew(data: ITime): void {
        const time = data.time.split(':');
        const date = new Date(data.date);

        if (this.datePickerOpen === 0) {
            // this.fromDate = new Date(date.setHours(+time[0], +time[1], +time[2]));
        } else if (this.datePickerOpen === 1) {
            // this.toDate = new Date(date.setHours(+time[0], +time[1], +time[2]));
        }
        this.datePicker = !data.close;
    }

}
