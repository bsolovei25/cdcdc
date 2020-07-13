import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IAsEfUnitNew, IAsEfFlow } from '../../../../../models/ASTUE/astue-efficiency.model';
import { SelectionModel } from '@angular/cdk/collections';
import { AstueEfficiencyService } from '../../../../../services/ASTUE/astue-efficiency.service';

@Component({
    selector: 'evj-astue-efficiency-unit-card',
    templateUrl: './astue-efficiency-unit-card.component.html',
    styleUrls: ['./astue-efficiency-unit-card.component.scss'],
})
export class AstueEfficiencyUnitCardComponent implements OnChanges {
    @Input() public unit: IAsEfUnitNew;
    @Input() public isSelected: boolean = false;
    @Output() private selectUnit: EventEmitter<void> = new EventEmitter<void>();

    public isClicked: boolean = false;
    public isOpen: boolean = false;

    public cardSelection: SelectionModel<IAsEfFlow> = new SelectionModel<IAsEfFlow>(true);

    constructor(private AsEfService: AstueEfficiencyService) {}

    public ngOnChanges(): void {
        this.cardSelection.clear();
        const unit = this.AsEfService.active[this.unit.name];
        if (unit?.length) {
            this.unit.flows.forEach((flow) => {
                if (unit.includes(flow.name)) {
                    this.cardSelection.select(flow);
                }
            });
        }
    }

    public onSelectUnit(): void {
        this.selectUnit.emit();
    }

    public onSelectFlow(flow: IAsEfFlow): void {
        this.cardSelection.toggle(flow);
        this.AsEfService.toggleActiveFlow(this.unit.name, flow.name);
    }
}
