import { Component, OnInit, Input } from '@angular/core';
import { IDatesInterval } from '../../../../../dashboard/services/widget.service';

@Component({
    selector: 'evj-astue-efficiency-calculation',
    templateUrl: './astue-efficiency-calculation.component.html',
    styleUrls: ['./astue-efficiency-calculation.component.scss'],
})
export class AstueEfficiencyCalculationComponent implements OnInit {
    @Input() public limits: IDatesInterval = {
        fromDateTime: new Date(2020, 5, 1),
        toDateTime: new Date(2020, 5, 10),
    };

    constructor() {}

    ngOnInit(): void {}

    public dateTimePickerInput(date: Date, dateType: 'fromDateTime' | 'toDateTime'): void {
        this.limits[dateType] = date;
    }
}
