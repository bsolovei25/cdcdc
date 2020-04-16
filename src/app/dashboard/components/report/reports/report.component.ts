import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITime } from '../../../models/time-data-picker';
import { ReportsService } from 'src/app/dashboard/services/reports.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { IReportTemplate } from 'src/app/dashboard/models/report-server';

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

@Component({
    selector: 'evj-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

    isLoading: boolean = false;

    public active: boolean = false;

    public datePicker: boolean = false;
    public datePickerOpen: number;

    formGroup: {
        id: number,
        name: string,
        value: string | Date,
        type: 'textBox' | 'comboBox' | 'dateTime' | 'checkBox',
        source: string[];
    }[] = [];

    @Input() data: IReportTemplate;

    template: IReport;

    constructor(
        private reportsService: ReportsService,
        private snackBar: SnackBarService
    ) {

    }
    ngOnInit(): void {
        console.log(this.data);
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
            this.template.customOptions.forEach(option => {
                this.formGroup.push({
                    id: option.id,
                    name: option.name,
                    value: '',
                    type: option.type,
                    source: option.source
                });
            });
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }

    async postItem(template: IReport): Promise<void> {
        this.isLoading = true;
        const body: { value: string | Date, baseOptionId: number }[] = [];
        this.formGroup.forEach((val) => {
            body.push({ value: val?.value, baseOptionId: val?.id });
        });
        try {
            if (template?.fileTemplate?.fileId) {
                window.open(`http://deploy.funcoff.club:6877/api/file/${template?.fileTemplate?.fileId}`);
            } else {
                const a: IReportTemplate = await this.reportsService.postTemplate(template.id, body);
                window.open(`http://deploy.funcoff.club:6877/api/file/${a.fileId}`);

            }
            this.isLoading = false;
        } catch (error) {
            this.snackBar.openSnackBar('Файл не сформирован', 'snackbar-red');
            this.isLoading = false;
        }

    }

}
