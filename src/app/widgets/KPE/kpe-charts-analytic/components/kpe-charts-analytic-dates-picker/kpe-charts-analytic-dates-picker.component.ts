import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'evj-kpe-charts-analytic-dates-picker',
    templateUrl: './kpe-charts-analytic-dates-picker.component.html',
    styleUrls: ['./kpe-charts-analytic-dates-picker.component.scss'],
})
export class KpeChartsAnalyticDatesPickerComponent implements OnInit {
    @Input() public formGroup: FormGroup;

    constructor() {}

    ngOnInit(): void {}
}
