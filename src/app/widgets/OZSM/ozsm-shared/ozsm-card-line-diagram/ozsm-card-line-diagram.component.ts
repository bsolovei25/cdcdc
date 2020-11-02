import { Component, OnInit, Input } from '@angular/core';
import { ICardLineDiagramModel } from '../../../../dashboard/models/card-line-diagram.model';
import { mockData } from './ozsm-card-line-mock';

@Component({
    selector: 'evj-ozsm-card-line-diagram',
    templateUrl: './ozsm-card-line-diagram.component.html',
    styleUrls: ['./ozsm-card-line-diagram.component.scss'],
})
export class OzsmCardLineDiagramComponent implements OnInit {
    @Input() data: ICardLineDiagramModel = mockData;
    public percentValue: number = 0;
    public iconStyleTitle: { [key: string]: string } = {
        'line-height': '14px',
        'font-size': '12px',
    };
    public iconStyleValue: { [key: string]: string } = {
        'line-height': '16px',
        'font-size': '16px',
    };

    public get bgLineClass(): 'active' | 'deviation' | 'deviation-opacity' {
        if (this.data.type !== 'deviation-icon') {
            return 'active';
        } else {
            return this.data.currentValue > this.data.maxValue ? 'deviation' : 'deviation-opacity';
        }
    }

    constructor() {}

    ngOnInit(): void {
        this.percentValue = (this.data.currentValue / this.data.maxValue) * 100;
        console.log(this.data.type);
    }
}
