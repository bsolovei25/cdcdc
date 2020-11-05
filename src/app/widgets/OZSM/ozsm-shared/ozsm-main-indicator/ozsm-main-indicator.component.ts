import { Component, OnInit, Input } from '@angular/core';
import { IOZSMMainIndicator } from '../../../../dashboard/models/OZSM/ozsm-main-indicator.model';

@Component({
    selector: 'evj-ozsm-main-indicator',
    templateUrl: './ozsm-main-indicator.component.html',
    styleUrls: ['./ozsm-main-indicator.component.scss']
})
export class OzsmMainIndicatorComponent implements OnInit {
    item: IOZSMMainIndicator;
    deviation: number;
    @Input() set data(value: IOZSMMainIndicator) {
        if (value) {
            if (value.fact < 0)  {
                value.percent = 0;
            } else {
                value.percent = value.fact > value.plan ? 100 : value.fact / value.plan * 100;
            }
            this.item = value;
        }
        this.deviation = (Math.abs(value.plan - value.fact) / value.plan > 1) ? 100 : (value.plan - value.fact) / value.plan * 100;
    }
    constructor() {
    }

    ngOnInit(): void {
        console.log('sdf' + this.deviation);
    }

}
