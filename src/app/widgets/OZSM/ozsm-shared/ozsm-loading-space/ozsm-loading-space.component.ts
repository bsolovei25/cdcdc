import { Component, OnChanges, OnInit } from '@angular/core';
import { ILoadingSpaceModel } from '../../../../dashboard/models/OZSM/loading-space/loading-space.model';
import { mockData } from './mockData';
import { newArray } from '@angular/compiler/src/util';

@Component({
    selector: 'evj-ozsm-loading-space',
    templateUrl: './ozsm-loading-space.component.html',
    styleUrls: ['./ozsm-loading-space.component.scss']
})
export class OzsmLoadingSpaceComponent implements OnInit {
    public data: ILoadingSpaceModel = mockData;
    public arrayOfCell: boolean [] = [true, true, true, true, true, true, true, true, true, true];

    constructor() {
    }

    ngOnInit(): void {
        const factor: number = 10;
        this.data.percentageValue = this.data.currentValue / this.data.maxValue * factor;
    }
}
