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
                name: 'Резервуар 503',
                status: 'Otstoy',
            },
            {
                name: 'Резервуар 503',
                status: 'Otstoy',
            },
            {
                name: 'Резервуар 503',
                status: 'Otstoy',
            },
        ],
        reference2: [
            {
                name: 'Резервуар 501',
                status: 'Otstoy',
            },
            {
                name: 'Резервуар 502',
                status: 'Otstoy',
            },
            {
                name: 'Резервуар 503',
                status: 'Otstoy',
            },
            {
                name: 'Резервуар 504',
                status: 'Otstoy',
            },
            {
                name: 'Резервуар 505',
                status: 'Otstoy',
            },
            {
                name: 'Резервуар 506',
                status: 'Otstoy',
            },
            {
                name: 'Резервуар 507',
                status: 'Otstoy',
            },
        ],
        
    };

    constructor() {}

    ngOnInit() {}
}
