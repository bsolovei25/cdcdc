import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'evj-kpe-charts-analytic-header-select',
    templateUrl: './kpe-charts-analytic-header-select.component.html',
    styleUrls: ['./kpe-charts-analytic-header-select.component.scss'],
})
export class KpeChartsAnalyticHeaderSelectComponent implements OnInit {
    @Input() formGroup: FormGroup;

    constructor() {}

    ngOnInit(): void {}
}
