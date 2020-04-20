import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetService } from '../../services/widget.service';
import { IReportTemplate } from '../../models/report-server';
import { ReportsService } from '../../services/widgets/reports.service';

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
    filterData: IReportTemplate[] = [];

    isReport: boolean = true;

    constructor(
        public widgetService: WidgetService,
        private reportsService: ReportsService,
    ) {
        this.subscription = this.widgetService.widgets$.subscribe((dataW) => {
        });
    }

    ngOnInit(): void {
        this.loadItem();
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    toggle(): void {
        this.active = !this.active;
    }

    async loadItem(): Promise<void> {
        this.data = await this.reportsService.getReportsTemplate();
        this.filterData = this.data;
    }

    searchReports(event: KeyboardEvent): void {
        this.filterData = event ? this.data
            .filter(value => value.name.toLowerCase()
                .includes((event?.target as HTMLInputElement)?.value.toLowerCase())) : this.data;
    }

}
