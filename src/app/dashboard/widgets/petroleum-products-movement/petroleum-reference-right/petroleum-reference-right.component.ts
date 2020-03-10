import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'evj-petroleum-reference-right',
    templateUrl: './petroleum-reference-right.component.html',
    styleUrls: ['./petroleum-reference-right.component.scss'],
})
export class PetroleumReferenceRightComponent implements OnInit {
    isShowFacilities: boolean = true;
    isShowTank: boolean = true;

    public data = [
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
    ];

    constructor() {}

    ngOnInit(): void {}
}
