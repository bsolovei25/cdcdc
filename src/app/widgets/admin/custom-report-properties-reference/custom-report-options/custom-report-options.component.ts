import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ReportsService } from '../../../../dashboard/services/widgets/admin-panel/reports.service';

@Component({
    selector: 'evj-custom-report-options',
    templateUrl: './custom-report-options.component.html',
    styleUrls: ['./custom-report-options.component.scss'],
    providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
})
export class CustomReportOptionsComponent implements OnInit, OnChanges {
    @ViewChild('valueInput') valueInput: ElementRef<HTMLInputElement>;
    @Input() public data: any;

    objectKeys = Object.keys;

    valueCtrl = new FormControl();

    valuesInput: string[] = [];
    separatorKeysCodes: number[] = [ENTER, COMMA];
    visible = true;
    selectable = true;
    removable = true;

    isEdit: number;

    options = {
        description: 'Описание',
        type: 'Тип',
        validationRule: 'Правило проверки',
        isRequired: 'Обязательный',
        source: 'Источник',
        sortOrder: 'Сортировка',
    };

    systemOptionType = ['textBox', 'dateTime', 'comboBox', 'checkBox'];

    constructor(public reportService: ReportsService, private cdRef: ChangeDetectorRef) {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.cdRef.detectChanges();
        console.log(this.data);
        if (this.data?.source) {
            this.valuesInput = [];
            for (let i of this.data.source) {
                this.valuesInput.push(i.trim());
            }
        }
    }

    onBlockEditRecord(i) {
        this.isEdit = i;
        console.log(i);
    }

    changeSwap() {
        this.data.isRequired = !this.data.isRequired;
        this.editOptions();
    }

    editOptions() {
        this.reportService.putCustomOptions(this.data).subscribe((ans) => {
            this.isEdit = null;
        });
    }

    ///chip-select
    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.valuesInput.push(value.trim());
            this.data.source.push(value);
            this.editOptions();
        }

        if (input) {
            input.value = '';
        }

        this.valueCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.valuesInput.indexOf(fruit);

        if (index >= 0) {
            this.valuesInput.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.valuesInput.push(event.option.viewValue);
        this.valueInput.nativeElement.value = '';
        this.valueCtrl.setValue(null);
    }
}
