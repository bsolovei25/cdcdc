import { Component, OnInit, Input } from '@angular/core';
import {
    ITankInfo,
    IFacilityInfo,
} from 'src/app/dashboard/models/petroleum-products-movement.model';

@Component({
    selector: 'evj-operation-park-screen-left',
    templateUrl: './operation-park-screen-left.component.html',
    styleUrls: ['./operation-park-screen-left.component.scss'],
})
export class OperationParkScreenLeftComponent implements OnInit {
    @Input() titlePark: string = 'Парк';

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
    ];
    constructor() {}

    ngOnInit(): void {}
}
