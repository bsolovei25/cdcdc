import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'evj-petroleum-reference-right',
    templateUrl: './petroleum-reference-right.component.html',
    styleUrls: ['./petroleum-reference-right.component.scss'],
})
export class PetroleumReferenceRightComponent implements OnInit {
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
