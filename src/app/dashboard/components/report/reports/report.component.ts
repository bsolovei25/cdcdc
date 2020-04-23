import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SnackBarService } from '../../../services/snack-bar.service';
import { IReportTemplate } from 'src/app/dashboard/models/report-server';
import { AppConfigService } from '../../../../services/appConfigService';
import { ReportsService } from '../../../services/widgets/reports.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { Moment } from 'moment';
import * as _moment from 'moment';
import { trigger, transition, style, animate } from '@angular/animations';
const moment = _moment;

export interface IReport extends IReportTemplate {
    customOptions: IReportOption[];
    reports: [];
    systemOptions: [];
    fileTemplate: {
        id: number;
        fileId: string;
        name: string;
        description: string;
        createdAt: Date;
        createdBy: number;
        isDeleted: boolean;
    };
    periodType: 'year' | 'month'
    | 'day' | 'timePeriod' |
    'datePeriod' | 'exactTime' | 'none';
}
export interface IReportOption {
    id: number;
    name: string;
    description: string;
    type: 'textBox' | 'comboBox' | 'dateTime' | 'checkBox';
    validationRule: string;
    isRequired: boolean;
    source: string[];
    sortOrder: number;
}
interface IReportFormGroup {
    id: number;
    name: string;
    value: string | Date;
    type: 'textBox' | 'comboBox' | 'dateTime' | 'checkBox';
    source: string[];
}

interface IResponse {
    type: 'xlsx' | 'pdf' | 'html';
    reportOptions: { value: string | Date, baseOptionId: number }[];
    period: {
        periodType: 'year' | 'month'
        | 'day' | 'timePeriod' |
        'datePeriod' | 'exactTime' | 'none';
        startDateTime: Date;
        endDateTime?: Date;
    };
}

interface IReportPeriodType {
    periodType: 'year' | 'month'
    | 'day' | 'timePeriod' |
    'datePeriod' | 'exactTime' | 'none';
    startDateTime?: Date;
    endDateTime?: Date;
}

export const fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('100ms', style({ opacity: 1, height: 145 }))
    ]),
    transition(':leave', [
        style({ opacity: 1, height: 145 }),
        animate('100ms', style({ opacity: 0, height: 0 }))
    ])
]);

@Component({
    selector: 'evj-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
    animations: [fadeAnimation],
})
export class ReportComponent implements OnInit {

    isLoading: boolean = false;

    private readonly restUrl: string;

    public active: boolean = false;

    public datePicker: boolean = false;
    public datePickerOpen: number;

    public timeCheck: string = 'Годичный';

    formGroup: IReportFormGroup[] = [];

    @Input() data: IReportTemplate;

    @ViewChild('picker') public picker: any;

    template: IReport;

    periodTime: IReportPeriodType;

    public dateNow: Date = new Date();

    public date = new FormControl(moment());

    constructor(
        private reportsService: ReportsService,
        private snackBar: SnackBarService,
        configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }
    ngOnInit(): void {
    }

    toggle(id: number): void {
        this.active = !this.active;
        if (this.active) {
            this.formGroup = [];
            this.loadItem(id);
        }
    }

    openDatePicker(selectBlock: number): void {
        this.datePickerOpen = selectBlock;
        this.datePicker = true;
    }

    dateTimePickerNew(date: Date, id: number): void {
        this.formGroup.map((val) => {
            if (val.id === id) {
                val.value = date;
            }
        });
    }

    async loadItem(id: number): Promise<void> {
        this.isLoading = true;
        try {
            this.template = await this.reportsService.getTemplate(id);
            this.periodTime = {
                periodType: 'timePeriod',
                startDateTime: new Date()
            };
            this.template.customOptions.forEach(option => {
                this.formGroup.push({
                    id: option.id,
                    name: option.name,
                    value: '',
                    type: option.type,
                    source: option.source,
                });
            });
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }

    async postItem(template: IReport, fileName: 'xlsx' | 'pdf' | 'html'): Promise<void> {
        this.isLoading = true;
        let body: IResponse;
        let reportOptions = [];
        this.formGroup.forEach((val) => {
            reportOptions.push({ value: val?.value, baseOptionId: val?.id });
        });
        body = {
            type: fileName,
            reportOptions,
            period: {
                periodType: this.periodTime.periodType,
                startDateTime: this.periodTime.startDateTime ? this.periodTime.startDateTime : null,
                endDateTime: this.periodTime.endDateTime ? this.periodTime.endDateTime : null
            }
        };
        try {
            const a = await this.reportsService.postTemplate(template.id, body);
            window.open(`${this.restUrl}/api/file-storage/${a.data.fileId}`);
            this.isLoading = false;
        } catch (error) {
            this.snackBar.openSnackBar('Файл не сформирован', 'snackbar-red');
            this.isLoading = false;
        }
    }


    chosenDayHandler(normalizedDay: Moment, datepicker: MatDatepicker<Moment>) {
        const ctrlValue = this.date.value;
        ctrlValue.day(normalizedDay.day());
        this.date.setValue(ctrlValue);
        datepicker.close();
    }


    dateTimePicker(event: Moment, value: 'day' | 'month' | 'year') {
        this.periodTime.startDateTime = event.toDate();
    }

}
