import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ISouDetailTable {
    rows: {
        title: string;
        value: number;
    } [];
}

@Component({
    selector: 'evj-sou-detail-table',
    templateUrl: './sou-detail-table.component.html',
    styleUrls: ['./sou-detail-table.component.scss']
})
export class SouDetailTableComponent implements OnInit {

    @Input() data: ISouDetailTable = {
        rows: [
            {
                title: 'Потери при сбросе газа установок на факел',
                value: 2.5,
            },
            {
                title: 'Потери при сбросах газов разложения в печь',
                value: 2.5,
            },
            {
                title: 'Потери при сбросах углеводородов со сточными водами',
                value: 2.5,
            },
            {
                title: 'Потери от неплотностей технологического оборудования',
                value: 2.5,
            },
            {
                title: 'Потери при сбросах на свечи рассеивания',
                value: 2.5,
            },
            {
                title: 'Потери нефти и нефтепродуктов при отборе проб',
                value: 2.5,
            },
            {
                title: 'Потери у/в при подготовке к ремонту',
                value: 2.5,
            },
            {
                title: 'Потери в виде твёрдых отложений у/в при ремонте',
                value: 2.5,
            },
            {
                title: 'Потери при пуске объектов и оборудования',
                value: 2.5,
            },
            {
                title: 'Аварийные потери',
                value: 2.5,
            },
        ],
    };

    @Output() closeTable: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public buttonClick(): void {
        this.closeTable.emit();
    }
}
