import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IAsEfTableBlock, IAsEfTableRow } from '../../../../../models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-astue-efficiency-table-display',
    templateUrl: './astue-efficiency-table-display.component.html',
    styleUrls: ['./astue-efficiency-table-display.component.scss'],
})
export class AstueEfficiencyTableDisplayComponent implements OnInit {
    @Input() public isInitialDataShow: boolean = true;
    @Output() private toggleDisplay: EventEmitter<true> = new EventEmitter<true>();

    public data: IAsEfTableBlock[] = [
        {
            name: 'План/факт',
            dataSummary: '11.123',
            data: [
                {
                    date: new Date(2020, 5, 1),
                    value: '1.1123',
                    isEditable: false,
                },
                {
                    date: new Date(2020, 5, 2),
                    value: '1.1123',
                    isEditable: false,
                },
                {
                    date: new Date(2020, 5, 3),
                    value: '1.1123',
                    isEditable: false,
                },
                {
                    date: new Date(2020, 5, 4),
                    value: '1.1123',
                    isEditable: false,
                },
                {
                    date: new Date(2020, 5, 5),
                    value: '1.1123',
                    isEditable: false,
                },
                {
                    date: new Date(2020, 5, 6),
                    value: '1.1123',
                    isEditable: false,
                },
                {
                    date: new Date(2020, 5, 7),
                    value: '1.1123',
                    isEditable: false,
                },
                {
                    date: new Date(2020, 5, 8),
                    value: '1.1123',
                    isEditable: false,
                },
                {
                    date: new Date(2020, 5, 9),
                    value: '1.1123',
                    isEditable: false,
                },
                {
                    date: new Date(2020, 5, 10),
                    value: '1.1123',
                    isEditable: false,
                },
            ],
            children: [
                {
                    name: 'Ед. изм./т.',
                    dataSummary: '11.123',
                    data: [
                        {
                            date: new Date(2020, 5, 1),
                            value: '8.888',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 2),
                            value: '8.888',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 3),
                            value: '8.888',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 4),
                            value: '8.888',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 5),
                            value: '8.888',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 6),
                            value: '8.888',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 7),
                            value: '8.888',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 8),
                            value: '8.888',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 9),
                            value: '8.888',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 10),
                            value: '8.888',
                            isEditable: false,
                        },
                    ],
                },
                {
                    name: 'Фактическая переработка',
                    dataSummary: '11.123',
                    data: [
                        {
                            date: new Date(2020, 5, 1),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 2),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 3),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 4),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 5),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 6),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 7),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 8),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 9),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 10),
                            value: '4.1',
                            isEditable: false,
                        },
                    ],
                },
            ],
        },
        {
            name: 'ЭЛОУ-АВТ-6 Поток №1',
            status: 'FQIR 0051',
            children: [
                {
                    name: 'Расход',
                    dataSummary: '11.123',
                    data: [
                        {
                            date: new Date(2020, 5, 1),
                            value: '8.888',
                            isEditable: true,
                        },
                        {
                            date: new Date(2020, 5, 2),
                            value: '8.888',
                            isEditable: true,
                        },
                        {
                            date: new Date(2020, 5, 3),
                            value: '8.888',
                            isEditable: true,
                        },
                        {
                            date: new Date(2020, 5, 4),
                            value: '8.888',
                            isEditable: true,
                        },
                        {
                            date: new Date(2020, 5, 5),
                            value: '8.888',
                            isEditable: true,
                        },
                        {
                            date: new Date(2020, 5, 6),
                            value: '8.888',
                            isEditable: true,
                        },
                        {
                            date: new Date(2020, 5, 7),
                            value: '8.888',
                            isEditable: true,
                        },
                        {
                            date: new Date(2020, 5, 8),
                            value: '8.888',
                            isEditable: true,
                        },
                        {
                            date: new Date(2020, 5, 9),
                            value: '8.888',
                            isEditable: true,
                        },
                        {
                            date: new Date(2020, 5, 10),
                            value: '8.888',
                            isEditable: true,
                        },
                    ],
                },
                {
                    name: 'Плотность',
                    dataSummary: '11.123',
                    data: [
                        {
                            date: new Date(2020, 5, 1),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 2),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 3),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 4),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 5),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 6),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 7),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 8),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 9),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 10),
                            value: '4.1',
                            isEditable: false,
                        },
                    ],
                },
                {
                    name: 'Теплотворная способность',
                    dataSummary: '11.123',
                    data: [
                        {
                            date: new Date(2020, 5, 1),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 2),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 3),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 4),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 5),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 6),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 7),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 8),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 9),
                            value: '4.1',
                            isEditable: false,
                        },
                        {
                            date: new Date(2020, 5, 10),
                            value: '4.1',
                            isEditable: false,
                        },
                    ],
                },
            ],
        },
    ];

    public blockSelection: SelectionModel<IAsEfTableBlock> = new SelectionModel<IAsEfTableBlock>(
        true
    );

    constructor() {}

    public ngOnInit(): void {}

    public clickDisplayButton(): void {
        this.toggleDisplay.emit(true);
    }

    public defineDataSummary(row: IAsEfTableRow): void {
        const value: number = +(
            row.data.reduce((acc, item) => (acc += +item.value), 0) / row.data.length
        ).toFixed(5);
        row.dataSummary = value.toString();
    }
}
