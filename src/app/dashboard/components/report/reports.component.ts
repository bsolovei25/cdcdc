import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WidgetService } from '../../services/widget.service';
import { ReportsService } from '../../services/reports.service';

export interface IReportTemplate {
    id: number;
    createdAt: Date;
    createdBy: number;
    name: string;
    description: string;
    fileId: string;
    isDeleted: boolean;
    displayName: string;
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
    filterData: IReportTemplate[] = [];

    isReport = true;

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
        console.log(this.data);
        this.filterData = this.data;
    }

    searchReports(event: KeyboardEvent): void {
        this.filterData = event ? this.data
            .filter(value => value.name.toLowerCase()
                .includes((event?.target as HTMLInputElement)?.value.toLowerCase())) : this.data;
    }

}
