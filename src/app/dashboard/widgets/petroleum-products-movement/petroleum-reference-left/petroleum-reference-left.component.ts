import { Component, OnInit, Input } from '@angular/core';
import { ITankInfo } from '../../../models/petroleum-products-movement.model';

@Component({
    selector: 'evj-petroleum-reference-left',
    templateUrl: './petroleum-reference-left.component.html',
    styleUrls: ['./petroleum-reference-left.component.scss'],
})
export class PetroleumReferenceLeftComponent implements OnInit {
    @Input() shortHeight: boolean;

    titlePark: string = 'Парк сырой нефти';
    listTankStates: ITankInfo[] = [
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

    public data = {
        nameReference1: 'Парк сырой нефти',
        nameReference2: 'Источник',
        reference1: [
            {
                name: 'Резервуар 201',
                status: 'vverh-arrow',
            },
            {
                name: 'Резервуар 202',
                status: 'Remont',
            },
            {
                name: 'Резервуар 203',
                status: 'vniz-arrow',
            },
            {
                name: 'Резервуар 204',
                status: 'Otstoy',
            },
            {
                name: 'Резервуар 205',
                status: 'two-arrow',
            },
        ],
        reference2: [
            {
                name: 'Резервуар 501',
                status: 'vverh-arrow',
            },
            {
                name: 'Резервуар 502',
                status: 'Remont',
            },
            {
                name: 'Резервуар 503',
                status: 'vniz-arrow',
            },
            {
                name: 'Резервуар 504',
                status: 'Otstoy',
            },
            {
                name: 'Резервуар 505',
                status: 'two-arrow',
            },
        ],
    };

    constructor() {}

    ngOnInit(): void {}
}
