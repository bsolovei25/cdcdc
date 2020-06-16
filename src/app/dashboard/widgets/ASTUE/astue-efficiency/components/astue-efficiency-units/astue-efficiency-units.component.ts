import { Component, OnInit } from '@angular/core';
import { IAsEfUnit } from '../../../../../models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-astue-efficiency-units',
    templateUrl: './astue-efficiency-units.component.html',
    styleUrls: ['./astue-efficiency-units.component.scss'],
})
export class AstueEfficiencyUnitsComponent implements OnInit {
    public units: IAsEfUnit[] = [
        {
            name: 'ЭЛОУ-АВТ-6',
            streams: [
                {
                    name: 'Поток №1',
                    status: 'FQIR 0051',
                },
                {
                    name: 'Поток №2',
                    status: 'FQIR 0051',
                },
                {
                    name: 'Поток №3',
                    status: 'FQIR 0051',
                },
            ],
        },
        {
            name: 'АВТ-6',
            streams: [
                {
                    name: 'Поток №1',
                    status: 'FQIR 0051',
                },
                {
                    name: 'Поток №2',
                    status: 'FQIR 0051',
                },
            ],
        },
        {
            name: 'ЭЛОУ - 2',
            streams: [
                {
                    name: 'Поток №1',
                    status: 'FQIR 0051',
                },
                {
                    name: 'Поток №2',
                    status: 'FQIR 0051',
                },
                {
                    name: 'Поток №3',
                    status: 'FQIR 0051',
                },
                {
                    name: 'Поток №4',
                    status: 'FQIR 0051',
                },
                {
                    name: 'Поток №5',
                    status: 'FQIR 0051',
                },
                {
                    name: 'Поток №6',
                    status: 'FQIR 0051',
                },
            ],
        },
        {
            name: 'АТ-ВБ',
            streams: [
                {
                    name: 'Поток №1',
                    status: 'FQIR 0051',
                },
            ],
        },
    ];

    public isClicked: boolean = false;

    public unitSelection: SelectionModel<IAsEfUnit> = new SelectionModel<IAsEfUnit>(true);

    constructor() {}

    public ngOnInit(): void {}

    public onSelectUnit(unit: IAsEfUnit): void {
        this.unitSelection.toggle(unit);
    }

    public onClickSelectAll(): void {
        if (this.unitSelection.selected.length === this.units.length) {
            this.unitSelection.clear();
        } else {
            this.unitSelection.select(...this.units);
        }
    }
}
