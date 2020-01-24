import { Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { NewWidgetService } from '../../services/new-widget.service';
import { Subscription } from 'rxjs';
import { MatCalendar } from '@angular/material/datepicker';
import { Moment } from 'moment';

@Component({
    selector: 'evj-admin-shift-schedule',
    templateUrl: './admin-shift-schedule.component.html',
    styleUrls: ['./admin-shift-schedule.component.scss'],
})
export class AdminShiftScheduleComponent implements OnDestroy {
    aboutWidget: string;
    public previewTitle: string = 'calendar-plan';
    public title: string = '';

    public subscription: Subscription;

    @ViewChild('calendar', { static: true }) calendar: MatCalendar<Moment>;
    selectedDate: Moment;

    constructor(
        private widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        this.subscription = this.widgetService
            .getWidgetChannel(this.id)
            .subscribe((data) => {
                this.title = data.title;
                this.previewTitle = data.widgetType;
            });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
