import { Component, OnChanges, OnInit } from '@angular/core';
import { ILoadingSpaceModel } from '../../../../dashboard/models/OZSM/loading-space/loading-space.model';
import { mockData } from './mockData';

@Component({
    selector: 'evj-ozsm-loading-space',
    templateUrl: './ozsm-loading-space.component.html',
    styleUrls: ['./ozsm-loading-space.component.scss']
})
export class OzsmLoadingSpaceComponent implements OnInit {
    public data: ILoadingSpaceModel = mockData;
    public len: number = 10;
    public arrayOfCells: number [] = new Array(this.len);

    constructor() {
    }

    ngOnInit(): void {
        const factor: number = 10;
        this.data.percentageValue = this.data.currentValue / this.data.maxValue * factor;
    }
}
