import { Component, OnInit, Input } from '@angular/core';
import { ITankInfo } from 'src/app/dashboard/models/petroleum-products-movement.model';

@Component({
    selector: 'evj-info-screen-left',
    templateUrl: './info-screen-left.component.html',
    styleUrls: ['./info-screen-left.component.scss'],
})
export class InfoScreenLeftComponent implements OnInit {
    titlePark: string = 'Парк сырой нефти';

    data: ITankInfo[] = [
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
