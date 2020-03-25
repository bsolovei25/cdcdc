import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../../services/new-widget.service';
import { ITime } from '../../../models/time-data-picker';
import { IReportTemplate } from '../reports.component';
import { ReportsService } from 'src/app/dashboard/services/reports.service';

export interface IReport extends IReportTemplate {
    options: IReportOption[]
}
export interface IReportOption {
    id: number;
    name: string;
    description: string;
    type: "textBox" | "comboBox | dateTime | checkBox",
    validationRule: string;
    isRequired: boolean;
    source: string;
    sortOrder: number;
}

@Component({
    selector: 'evj-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

    private subscription: Subscription;

    public active: boolean = false;

    public datePicker: boolean = false;
    public datePickerOpen: number;

    @Input() data: IReportTemplate;

    template: IReport;

    constructor(
        public widgetService: NewWidgetService,
        private reportsService: ReportsService,
        private detectCh: ChangeDetectorRef
    ) {
        this.subscription = this.widgetService.widgets$.subscribe((dataW) => {
        });
    }
    ngOnInit() {
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    toggle(id) {
        this.active = !this.active;
        if (this.active) {
            this.loadItem(id);
        }
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

    async loadItem(id: number): Promise<void> {
        this.template = await this.reportsService.getTemplate(id);
        this.detectCh.detectChanges();
        console.log(this.template);
    }

    async postItem(id: number, option) {
        console.log(id, option);

        const b = { value: 'mmm', baseOptionId: option.id }
        const a = await this.reportsService.postTemplate(id, b);
        console.log(a);

    }

}
