import { Component, Input, OnInit } from '@angular/core';
import { ILoadingSpaceModel } from '../../../../dashboard/models/loading-space.model';
import { mockData } from './mockData';

@Component({
    selector: 'evj-ozsm-loading-space',
    templateUrl: './ozsm-loading-space.component.html',
    styleUrls: ['./ozsm-loading-space.component.scss']
})
export class OzsmLoadingSpaceComponent implements OnInit {
    public data: ILoadingSpaceModel = mockData;

    constructor() {
    }

    ngOnInit(): void {
        const factor: number = 10;
        this.data.col = this.data.currentValue / this.data.maxValue * factor;
        this.data.fractional = this.data.col % 1;
    }
}
