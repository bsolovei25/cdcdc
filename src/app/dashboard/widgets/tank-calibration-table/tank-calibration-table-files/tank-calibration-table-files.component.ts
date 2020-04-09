import { Component, OnInit, Inject, OnDestroy, HostListener, ViewChild, ElementRef, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { IUser } from '../../../models/events-widget';

interface ICalibrationTable {
    name: string;
    values: {
        name: string;
        startDate: Date;
        endDate: Date;
        action: any;
    }[];
}

export interface ITankCalibrationTableFiles {
    name: string;
    data: ITanksHistory[];
}

interface ITanksHistory {
    name: string;
    data: {
        editDate: Date;
        user: IUser;
        empty: any;
        updateDate: Date;
        comment: string;
    }[];
}

@Component({
    selector: 'evj-tank-calibration-table-files',
    templateUrl: './tank-calibration-table-files.component.html',
    styleUrls: ['./tank-calibration-table-files.component.scss'],
})
export class TankCalibrationTableFilesComponent implements OnInit, OnDestroy {

    static itemCols: number = 18;
    static itemRows: number = 14;

    expandedElement: SelectionModel<any> = new SelectionModel(true);

    data;
    dataSource: ITankCalibrationTableFiles[] = [
        {
            name: 'Цех-2',
            data: [
                {
                    name: 'Резевруар 1',
                    data: [
                        {
                            editDate: new Date(),
                            user: { firstName: 'Иван', lastName: 'Иванов', id: 1, login: 'fdsf' },
                            empty: 'Дата начала колибровки',
                            updateDate: new Date(),
                            comment: 'так нужно'
                        },
                        {
                            editDate: new Date(),
                            user: { firstName: 'Иван', lastName: 'Иванов', id: 1, login: 'fdsf' },
                            empty: 'Дата начала колибровки',
                            updateDate: new Date(),
                            comment: 'так нужно'
                        }
                    ]

                },
                {
                    name: 'Резевруар 2',
                    data: [
                        {
                            editDate: new Date(),
                            user: { firstName: 'Иван', lastName: 'Иванов', id: 1, login: 'fdsf' },
                            empty: 'Дата начала колибровки',
                            updateDate: new Date(),
                            comment: 'так нужно'
                        }
                    ]
                },
            ]
        },
        {
            name: 'Цех-3',
            data: [
                {
                    name: 'Резевруар 3',
                    data: [
                        {
                            editDate: new Date(),
                            user: { firstName: 'Иван', lastName: 'Иванов', id: 1, login: 'fdsf' },
                            empty: 'Дата начала колибровки',
                            updateDate: new Date(),
                            comment: 'так нужно'
                        },
                        {
                            editDate: new Date(),
                            user: { firstName: 'Иван', lastName: 'Иванов', id: 1, login: 'fdsf' },
                            empty: 'Дата начала колибровки',
                            updateDate: new Date(),
                            comment: 'так нужно'
                        }
                    ]

                },
                {
                    name: 'Резевруар 4',
                    data: [
                        {
                            editDate: new Date(),
                            user: { firstName: 'Иван', lastName: 'Иванов', id: 1, login: 'fdsf' },
                            empty: 'Дата начала колибровки',
                            updateDate: new Date(),
                            comment: 'так нужно'
                        },
                    ]
                },
            ]
        }
    ];

    chooseTanks: ITanksHistory;
    endTr = [];
    endTr2 = [];

    @Input() set isReport($event) {
        setTimeout(() => {
            this.blockNeed();
            this.blockNee2d();
        }, 100);
    }

    @HostListener('document:resize', ['$event'])
    OnResize(event) {
        this.blockNeed();
        this.blockNee2d();
    }

    @ViewChild('tableBody3') table3: ElementRef;
    @ViewChild('tableRight4') tableRight4: ElementRef;

    constructor(
    ) { }
    ngOnInit(): void { }

    ngOnDestroy(): void {
    }

    protected dataHandler(ref: any): void {
        if (ref) {
            this.data = ref;
        }
    }

    getChildrenRows(element: ITankCalibrationTableFiles): any {
        return [...element.data];
    }

    chooseTank(element: ITanksHistory): void {
        this.chooseTanks = element;
    }

    blockNeed(): void {
        this.endTr = [];
        const heightTemplate = this.dataSource.length * 28;
        const heihtOut = (this.table3.nativeElement.clientHeight - heightTemplate) / 26;
        for (let i = 0; i < heihtOut - 1; i++) {
            this.endTr.push(i);
        }
    }
    blockNee2d(): void {
        this.endTr2 = [];
        const heightTemplate = this.dataSource.length * 28;
        const heihtOut = (this.tableRight4.nativeElement.clientHeight - heightTemplate) / 25;
        for (let i = 0; i < heihtOut - 1; i++) {
            this.endTr2.push(i);
        }
    }


}
