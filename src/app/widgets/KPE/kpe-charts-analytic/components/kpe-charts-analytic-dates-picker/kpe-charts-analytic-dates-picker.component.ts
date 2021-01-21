import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'evj-kpe-charts-analytic-dates-picker',
    templateUrl: './kpe-charts-analytic-dates-picker.component.html',
    styleUrls: ['./kpe-charts-analytic-dates-picker.component.scss'],
})
export class KpeChartsAnalyticDatesPickerComponent implements OnInit {
    public range: FormGroup = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
    });

    constructor() {}

    ngOnInit(): void {}
}
