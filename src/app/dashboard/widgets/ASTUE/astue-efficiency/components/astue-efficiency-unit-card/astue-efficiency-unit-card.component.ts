import { Component, OnInit } from '@angular/core';
import { IAsEfCard } from '../../../../../models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-astue-efficiency-unit-card',
    templateUrl: './astue-efficiency-unit-card.component.html',
    styleUrls: ['./astue-efficiency-unit-card.component.scss'],
})
export class AstueEfficiencyUnitCardComponent implements OnInit {
    public data: IAsEfCard[] = [
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
    ];

    public isClicked: boolean = false;
    public isOpen: boolean = false;

    public cardSelection: SelectionModel<IAsEfCard> = new SelectionModel<IAsEfCard>(true);

    constructor() {}

    public ngOnInit(): void {}
}
