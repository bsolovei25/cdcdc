import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ICardLineDiagramModel } from '../../../../dashboard/models/card-line-diagram.model';
import { mockData } from './ozsm-card-line-mock';

@Component({
    selector: 'evj-ozsm-card-line-diagram',
    templateUrl: './ozsm-card-line-diagram.component.html',
    styleUrls: ['./ozsm-card-line-diagram.component.scss'],
})
export class OzsmCardLineDiagramComponent implements OnInit, OnChanges {
    @Input() data: ICardLineDiagramModel = mockData;
    public percentValue: number = 0;

    public get bgLineClass(): 'active' | 'deviation' | 'deviation-opacity' {
        if (this.data.type !== 'deviation-icon') {
            return 'active';
        } else {
            return this.data.currentValue > this.data.maxValue ? 'deviation' : 'deviation-opacity';
        }
    }

    constructor() {}

    // TODO: delete after mock
    ngOnInit(): void {
        this.percentValue = (this.data?.currentValue / this.data?.maxValue) * 100;
    }

    ngOnChanges(): void {
        this.percentValue = (this.data?.currentValue / this.data?.maxValue) * 100;
    }
}
