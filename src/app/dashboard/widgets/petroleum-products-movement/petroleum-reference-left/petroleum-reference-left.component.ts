import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'evj-petroleum-reference-left',
    templateUrl: './petroleum-reference-left.component.html',
    styleUrls: ['./petroleum-reference-left.component.scss'],
})
export class PetroleumReferenceLeftComponent implements OnInit {
    public data = {
        nameReference: 'Парк сырой нефти',
        reference: [
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
    };

    constructor() {}

    ngOnInit() {}
}
