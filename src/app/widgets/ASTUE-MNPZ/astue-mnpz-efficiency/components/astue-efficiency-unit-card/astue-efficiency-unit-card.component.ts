import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
    IAsEfUnitNew,
    IAsEfFlow
} from '../../../../../dashboard/models/ASTUE/astue-efficiency.model';
import { AstueEfficiencyService } from '../../../../../dashboard/services/ASTUE/astue-efficiency.service';
import { log } from 'util';

@Component({
    selector: 'evj-astue-efficiency-unit-card',
    templateUrl: './astue-efficiency-unit-card.component.html',
    styleUrls: ['./astue-efficiency-unit-card.component.scss']
})
export class AstueEfficiencyUnitCardComponent implements OnChanges {
    @Input() public unit: IAsEfUnitNew;
    @Input() public isSelected: boolean = false;
    @Output() private selectUnit: EventEmitter<void> = new EventEmitter<void>();

    public isClicked: boolean = false;
    public isOpen: boolean = false;

    public cardSelection: SelectionModel<IAsEfFlow> = new SelectionModel<IAsEfFlow>(true);

    constructor(private AsEfService: AstueEfficiencyService) {
    }

    public ngOnChanges(): void {
        this.cardSelection.clear();
        const unit = this.AsEfService.isUnitSelected(this.unit);
        if (unit) {
            this.isClicked = true;
            this.unit.flows.forEach((flow) => {
                if (unit.includes(flow.name)) {
                    this.cardSelection.select(flow);
                }
            });
        }
        this.isOpen = this.AsEfService.isCardOpen(this.unit.name);
    }

    public onToggleCard(): void {
        this.isOpen = !this.isOpen;
        this.AsEfService.toggleUnitCard(this.unit.name);
    }

    public onSelectUnit(): void {
        this.selectUnit.emit();
        this.unit.flows.forEach(flow => {
            this.AsEfService.cardSelection.deselect(flow);
        });
        this.AsEfService.selectionFlow$.next(this.AsEfService.cardSelection.selected);
    }

    public onSelectFlow(flow: IAsEfFlow): void {
        const isAddFlow = this.AsEfService.toggleFlow(this.unit.name, flow.name);
        if (isAddFlow) {
            this.AsEfService.cardSelection.select(flow);
            this.cardSelection.select(flow);
            this.AsEfService.currentFlow = flow;
        } else {
            this.AsEfService.cardSelection.deselect(flow);
            this.cardSelection.deselect(flow);
            const len = this.AsEfService.isUnitSelected(this.unit)?.length;
            if (len) {
                const lastFlow = this.AsEfService.isUnitSelected(this.unit)[length - 1];
                this.AsEfService.currentFlow = this.unit.flows.find(
                    (item) => item.name === lastFlow
                );
            } else {
                this.AsEfService.currentFlow = null;
            }
        }
        this.AsEfService.selectionFlow$.next(this.AsEfService.cardSelection.selected);
        this.AsEfService.selection$.next();
    }
}
