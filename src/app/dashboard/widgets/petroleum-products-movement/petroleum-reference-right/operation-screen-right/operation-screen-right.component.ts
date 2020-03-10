import { Component, OnInit, Input } from '@angular/core';
import { ITankInfo, IFacilityInfo } from 'src/app/dashboard/models/petroleum-products-movement.model';

@Component({
    selector: 'evj-operation-screen-right',
    templateUrl: './operation-screen-right.component.html',
    styleUrls: ['./operation-screen-right.component.scss'],
})
export class OperationScreenRightComponent implements OnInit {
    
    dataTank: ITankInfo[] = [
        {
            title: 'Резервуар 201',
            state: 'vverh-arrow',
        },
        {
            title: 'Резервуар 202',
            state: 'Remont',
        },
        {
            title: 'Резервуар 203',
            state: 'vniz-arrow',
        },
        {
            title: 'Резервуар 204',
            state: 'Otstoy',
        },
        {
            title: 'Резервуар 205',
            state: 'two-arrow',
        },
    ];

    dataFacil: IFacilityInfo[] = [
        {
            title: 'Резервуар 201',
            state: 'vverh-arrow',
        },
        {
            title: 'Резервуар 202',
            state: 'Remont',
        },
        {
            title: 'Резервуар 203',
            state: 'vniz-arrow',
        },
        {
            title: 'Резервуар 204',
            state: 'Otstoy',
        },
        {
            title: 'Резервуар 205',
            state: 'two-arrow',
        },
        {
            title: 'Резервуар 205',
            state: 'two-arrow',
        },
        {
            title: 'Резервуар 205',
            state: 'two-arrow',
        },
        {
            title: 'Резервуар 205',
            state: 'two-arrow',
        },
    ];
    
    isShowFacilities: boolean = true;
    isShowTank: boolean = true;

    constructor() {}

    ngOnInit(): void {}
}
