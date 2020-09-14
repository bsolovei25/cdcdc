import { Component, Input, OnInit } from '@angular/core';
import { ILoadingSpaceModel } from '../../../../dashboard/models/loading-space.model';
import { mockData } from './mockData';

@Component({
    selector: 'evj-ozsm-warehouse-loading',
    templateUrl: './ozsm-loading-space.component.html',
    styleUrls: ['./ozsm-loading-space.component.scss']
})
export class OzsmLoadingSpaceComponent implements OnInit {
    public data: ILoadingSpaceModel[] = mockData;

    constructor() {
    }

    ngOnInit(): void {
    }

}
