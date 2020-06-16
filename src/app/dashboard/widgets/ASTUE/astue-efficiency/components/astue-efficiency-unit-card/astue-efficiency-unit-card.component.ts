import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAsEfCard, IAsEfUnit } from '../../../../../models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-astue-efficiency-unit-card',
    templateUrl: './astue-efficiency-unit-card.component.html',
    styleUrls: ['./astue-efficiency-unit-card.component.scss'],
})
export class AstueEfficiencyUnitCardComponent implements OnInit {
    @Input() public unit: IAsEfUnit;
    @Input() public isSelected: boolean = false;
    @Output() private selectUnit: EventEmitter<void> = new EventEmitter<void>();

    public isClicked: boolean = false;
    public isOpen: boolean = false;

    public cardSelection: SelectionModel<IAsEfCard> = new SelectionModel<IAsEfCard>(true);

    constructor() {}

    public ngOnInit(): void {}

    public onSelectUnit(): void {
        this.selectUnit.emit();
    }
}
