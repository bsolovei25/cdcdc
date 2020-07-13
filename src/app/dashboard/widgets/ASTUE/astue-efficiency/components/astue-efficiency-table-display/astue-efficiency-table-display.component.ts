import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import {
    IAsEfTableBlock,
    IAsEfTableRow,
    IAsEfScript,
    IAsEfProduct,
    IAsEfCell,
    IAsEfTable,
} from '../../../../../models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { AstueEfficiencyService } from '../../../../../services/ASTUE/astue-efficiency.service';

@Component({
    selector: 'evj-astue-efficiency-table-display',
    templateUrl: './astue-efficiency-table-display.component.html',
    styleUrls: ['./astue-efficiency-table-display.component.scss'],
})
export class AstueEfficiencyTableDisplayComponent implements OnInit, OnDestroy {
    @Input() public isInitialDataShow: boolean = true;
    @Input() public allData: IAsEfProduct[] = [];
    @Output() private toggleDisplay: EventEmitter<true> = new EventEmitter<true>();

    public activeProduct: IAsEfProduct = null;
    public newdata: IAsEfTable[] = [];
    public dates: IAsEfCell[] = [];

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

    public deviationsData: IAsEfTableBlock[] = [
        {
            name: 'План/План',
            relativeName: 'План/Факт',
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
                    name: 'Ед. изм.',
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
            name: 'Бизнес-план',
            relativeName: 'Факт',
            children: [
                {
                    name: 'Ед. изм./т.',
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
                    name: 'Ед. изм.',
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

    public scripts: IAsEfScript[] = [
        {
            name: 'Иванов И.И.',
            fromDateTime: new Date(2020, 1, 3, 14, 44, 23),
            toDateTime: new Date(2020, 1, 7, 21, 23, 45),
        },
        {
            name: 'Петров П.П.',
            fromDateTime: new Date(2020, 1, 3, 14, 44, 23),
            toDateTime: new Date(2020, 1, 7, 21, 23, 45),
        },
        {
            name: 'Сидоров С.С.',
            fromDateTime: new Date(2020, 1, 3, 14, 44, 23),
            toDateTime: new Date(2020, 1, 7, 21, 23, 45),
        },
        {
            name: 'Иванов И.И.',
            fromDateTime: new Date(2020, 1, 3, 14, 44, 23),
            toDateTime: new Date(2020, 1, 7, 21, 23, 45),
        },
        {
            name: 'Петров П.П.',
            fromDateTime: new Date(2020, 1, 3, 14, 44, 23),
            toDateTime: new Date(2020, 1, 7, 21, 23, 45),
        },
        {
            name: 'Сидоров С.С.',
            fromDateTime: new Date(2020, 1, 3, 14, 44, 23),
            toDateTime: new Date(2020, 1, 7, 21, 23, 45),
        },
    ];

    public isDropdownOpen: boolean = false;

    public blockSelection: SelectionModel<IAsEfTableBlock> = new SelectionModel<IAsEfTableBlock>(
        true
    );
    public newBlockSelection: SelectionModel<IAsEfTable> = new SelectionModel<IAsEfTable>(true);

    public scriptSelection: SelectionModel<any> = new SelectionModel<any>();

    private subscriptions: Subscription[] = [];

    constructor(private AsEfService: AstueEfficiencyService) {}

    public ngOnInit(): void {
        this.subscriptions.push(
            this.AsEfService.product$.subscribe((product) => {
                this.activeProduct = this.allData.find((item) => item.name === product);
            }),
            this.AsEfService.change$.subscribe(() => {
                this.newdata = [];
                const active = this.AsEfService.active;
                for (const key in active) {
                    if (!active[key]) {
                        continue;
                    }
                    this.newdata.push(
                        this.activeProduct.units.find((unit) => unit.name === key) as IAsEfTable
                    );
                    active[key].forEach((flowName) => {
                        this.activeProduct.units
                            .find((unit) => unit.name === key)
                            ?.flows.forEach((flow) => {
                                if (flow.name === flowName) {
                                    this.newdata.push(flow);
                                }
                            });
                    });
                }
                this.newdata.forEach((data) => {
                    data.rowsArr = [];

                    for (const key in data.rows) {
                        if (!data.rows[key]) {
                            continue;
                        }
                        const sum = data.rows[key].reduce((acc, item) => acc + item.value, 0);
                        data.rowsArr.push({ name: key, data: data.rows[key], dataSummary: sum });
                    }
                });
                this.dates = this.newdata[0]?.rowsArr[0].data ?? [];
            })
        );
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }

    public clickDisplayButton(): void {
        this.toggleDisplay.emit(true);
    }

    public defineDataSummary(row: IAsEfTableRow): void {
        const value: number = +(
            row.data.reduce((acc, item) => (acc += +item.value), 0) / row.data.length
        ).toFixed(5);
        row.dataSummary = value.toString();
    }

    public toggleDropdown(): void {
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    public selectScript(script: IAsEfScript): void {
        this.scriptSelection.select(script);
        this.toggleDropdown();
    }
}
