import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
import { ReportsService } from '../../services/reports.service';

export interface IReportTemplate {
    id: number,
    createdAt: Date,
    createdBy: number,
    name: string,
    description: string,
    fileId: string,
    isDeleted: boolean,
    displayName: string
}

@Component({
    selector: 'evj-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    public active: boolean = false;

    public datePicker: boolean = false;
    public datePickerOpen: number;

    data: IReportTemplate[] = [];

    constructor(
        public widgetService: NewWidgetService,
        private reportsService: ReportsService,
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
        this.data = await this.reportsService.getReportsTemplate();
    }

}
