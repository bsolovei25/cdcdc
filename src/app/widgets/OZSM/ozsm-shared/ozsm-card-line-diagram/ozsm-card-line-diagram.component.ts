import { Component, OnInit } from '@angular/core';
import { ICardLineDiagramModel } from '../../../../dashboard/models/card-line-diagram.model';
import { mockData } from './ozsm-card-line-mock';

@Component({
    selector: 'evj-ozsm-card-line-diagram',
    templateUrl: './ozsm-card-line-diagram.component.html',
    styleUrls: ['./ozsm-card-line-diagram.component.scss']
})
export class OzsmCardLineDiagramComponent implements OnInit {
    public data: ICardLineDiagramModel = mockData;
    public percentValue: number = 0;
    public iconStyleTitle: object = {'line-height': '14px', 'font-size': '12px'};
    public iconStyleValue: object = {'line-height': '16px', 'font-size': '16px'};

    constructor() {
    }

    ngOnInit(): void {
        this.percentValue = this.data.currentValue / this.data.maxValue * 100;
    }

}
