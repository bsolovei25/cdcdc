import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-petroleum-reference-left',
    templateUrl: './petroleum-reference-left.component.html',
    styleUrls: ['./petroleum-reference-left.component.scss'],
})
export class PetroleumReferenceLeftComponent implements OnInit {
    @Input() shortHeight: boolean;

    public data = {
        nameReference1: 'Парк сырой нефти',
        nameReference2: 'Источник',
        reference1: [
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

    ngOnInit() {}
}
