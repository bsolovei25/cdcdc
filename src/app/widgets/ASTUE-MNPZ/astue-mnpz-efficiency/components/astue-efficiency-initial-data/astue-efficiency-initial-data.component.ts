import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IAsEfInitialDataBlock } from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';

@Component({
    selector: 'evj-astue-efficiency-initial-data',
    templateUrl: './astue-efficiency-initial-data.component.html',
    styleUrls: ['./astue-efficiency-initial-data.component.scss'],
})
export class AstueEfficiencyInitialDataComponent implements OnInit {
    public data: IAsEfInitialDataBlock[] = [
        {
            name: 'План/Факт',
            value: 33.33,
            data: [
                {
                    name: 'Ед. изм./т.',
                    value: 74.543,
                },
                {
                    name: 'Фактическая переработка',
                    value: 4.543,
                },
            ],
        },
        {
            name: 'План/Факт',
            value: 33.33,
            data: [
                {
                    name: 'Ед. изм./т.',
                    value: 74.543,
                },
                {
                    name: 'Фактическая переработка',
                    value: 4.543,
                },
            ],
        },
        {
            name: 'План/Факт',
            status: 'FQIR 0051',
            data: [
                {
                    name: 'Ед. изм./т.',
                    value: 74.543,
                },
                {
                    name: 'Фактическая переработка',
                    value: 4.543,
                },
            ],
        },
    ];

    public isOpen: boolean = false;

    public blockSelection: SelectionModel<IAsEfInitialDataBlock> = new SelectionModel<
        IAsEfInitialDataBlock
    >(true);

    constructor() {}

    public ngOnInit(): void {}
}
