import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'evj-astue-efficiency-calculation',
    templateUrl: './astue-efficiency-calculation.component.html',
    styleUrls: ['./astue-efficiency-calculation.component.scss'],
})
export class AstueEfficiencyCalculationComponent implements OnInit {
    public fromDate: Date = new Date(2020, 5, 1);
    public toDate: Date = new Date(2020, 5, 10);

    constructor() {}

    ngOnInit(): void {}

    dateTimePickerInput(event) {
        console.log(event);
    }
}
