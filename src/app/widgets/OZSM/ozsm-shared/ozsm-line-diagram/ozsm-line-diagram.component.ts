import { Component, Input, OnInit } from '@angular/core';
import { IOZSMLineDiagram } from '../../../../dashboard/models/OZSM/ozsm-line-diagram.model';

@Component({
    selector: 'evj-ozsm-line-diagram',
    templateUrl: './ozsm-line-diagram.component.html',
    styleUrls: ['./ozsm-line-diagram.component.scss'],
})
export class OzsmLineDiagramComponent implements OnInit {
    item: IOZSMLineDiagram;
    public yellow: number = 0;
    @Input() set data(value: IOZSMLineDiagram) {
        if (value) {
            if (value.fact < 0) {
                value.percent = 0;
            } else {
                value.percent = value.fact > value.plan ? 100 : (value.fact / value.plan) * 100;
            }
            this.item = value;
        }
    }

    constructor() {}

    ngOnInit(): void {}
}
