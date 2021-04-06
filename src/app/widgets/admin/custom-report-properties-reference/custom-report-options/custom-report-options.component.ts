import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ReportsService } from '../../../../dashboard/services/widgets/admin-panel/reports.service';
import { ICustomReportProperties } from "@widgets/admin/custom-report-properties-reference/custom-report-properties-reference.component";

interface IOptions {
    description: string,
    type: string,
    validationRule: string,
    isRequired: string,
    source: string,
    sortOrder: string,
}

@Component({
    selector: 'evj-custom-report-options',
    templateUrl: './custom-report-options.component.html',
    styleUrls: ['./custom-report-options.component.scss'],
    providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
})

export class CustomReportOptionsComponent implements OnInit {
    @ViewChild('valueInput') valueInput: ElementRef<HTMLInputElement>;
    @Input() set data(item: ICustomReportProperties) {
        this.cdRef.detectChanges();
        this.mainData = item;
        if (this.mainData?.source) {
            this.mainData.source.map(x => x.trim());
        }
    };

    objectKeys: any = Object.keys;
    public mainData: ICustomReportProperties;

    valueCtrl: FormControl = new FormControl();

    separatorKeysCodes: number[] = [ENTER, COMMA];
    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;

    isEdit: number;

    options: IOptions = {
        description: 'Описание',
        type: 'Тип',
        validationRule: 'Правило проверки',
        isRequired: 'Обязательный',
        source: 'Источник',
        sortOrder: 'Сортировка',
    };

    systemOptionType: string[] = ['textBox', 'dateTime', 'comboBox', 'checkBox'];

    constructor(public reportService: ReportsService, private cdRef: ChangeDetectorRef) {}

    ngOnInit(): void {}

    public onBlockEditRecord(i: number): void {
        this.isEdit = i;
        console.log(i);
    }

    public changeSwap(): void {
        this.mainData.isRequired = !this.mainData.isRequired;
        this.editOptions();
    }

    public editOptions(): void {
        this.reportService.putCustomOptions(this.mainData).subscribe((ans) => {
            this.isEdit = null;
        });
    }

    // chip-select
    public add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
        if ((value || '').trim()) {
            this.mainData.source.push(value.trim());
            this.editOptions();
        }

        if (input) {
            input.value = '';
        }

        this.valueCtrl.setValue(null);
    }

    public remove(fruit: string): void {
        const index = this.mainData.source.indexOf(fruit);
        if (index >= 0) {
            this.mainData.source.splice(index, 1);
        }
        this.editOptions();
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.mainData.source.push(event.option.viewValue);
        this.valueInput.nativeElement.value = '';
        this.valueCtrl.setValue(null);
    }
}
