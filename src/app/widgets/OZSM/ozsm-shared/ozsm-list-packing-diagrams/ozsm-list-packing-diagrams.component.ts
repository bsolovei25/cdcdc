import { Component, OnInit } from '@angular/core';
import { IOzsmListPacking } from '../../../../dashboard/models/OZSM/list-packing-diagram/ozsm-list-packing-diagrams.model';

@Component({
    selector: 'evj-ozsm-list-packing-diagrams',
    templateUrl: './ozsm-list-packing-diagrams.component.html',
    styleUrls: ['./ozsm-list-packing-diagrams.component.scss'],
})
export class OzsmListPackingDiagramsComponent implements OnInit {
    diagramData: IOzsmListPacking[] = [
        {
            plan: 389,
            deviation: 5.8,
            percentage: 148,
            amount: 0.74,
            title: '1',
        },
        {
            plan: 1101,
            deviation: 1.6,
            percentage: 104,
            amount: 23.3,
            title: '2',
        },
        {
            plan: 1939,
            deviation: 16.5,
            percentage: 127,
            amount: 3.16,
            title: '3',
        },
        {
            plan: 10494,
            deviation: 0,
            percentage: 100,
            amount: 14.04,
            title: '4',
        },
        {
            plan: 10000,
            deviation: -5000,
            percentage: 50,
            amount: 2.16,
            title: '5',
        },
        {
            plan: 123,
            deviation: 16,
            percentage: 104,
            amount: 32.16,
            title: '6',
        },
    ];
    constructor() {}

    ngOnInit(): void {}
}
