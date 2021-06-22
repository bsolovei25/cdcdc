import { Component, OnInit, Input } from '@angular/core';
import { IAsEfCard } from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';

@Component({
    selector: 'evj-astue-efficiency-item-card',
    templateUrl: './astue-efficiency-item-card.component.html',
    styleUrls: ['./astue-efficiency-item-card.component.scss'],
})
export class AstueEfficiencyItemCardComponent implements OnInit {
    @Input() public card: IAsEfCard = {
        name: 'Поток №1',
        icon: 'steam',
    };
    @Input() public isListItem: boolean = false;
    @Input() public isActive: boolean = false;
    @Input() public background: boolean = false;

    constructor() {}

    public ngOnInit(): void {}
}
