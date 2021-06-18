import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    IManufacture,
    IManufactureUnit,
    IManufactureUnitGroup,
    IManufactureUnitGroupIndicator
} from '@widgets/KPE/kpe-charts-analytic/models/chart-analytic';

@Component({
    selector: 'evj-kpe-charts-analytic-header-select',
    templateUrl: './kpe-charts-analytic-header-select.component.html',
    styleUrls: ['./kpe-charts-analytic-header-select.component.scss'],
})
export class KpeChartsAnalyticHeaderSelectComponent implements OnInit  {
    @Input() formGroup: FormGroup;
    @Input() manufactures: IManufacture[];
    @Output() setActiveIndicator: EventEmitter<string> = new EventEmitter();
    public activeManufacture: IManufacture;
    public activeUnit: IManufactureUnit;
    public activeGroup: IManufactureUnitGroup;
    public activeIndicator: IManufactureUnitGroupIndicator;

    ngOnInit(): void {
    }

    changeManufacture(): void {
        this.activeUnit = null;
        this.activeGroup = null;
        this.unsubscribeIndicator();
    }

    changeUnit(): void {
        this.activeGroup = null;
        this.unsubscribeIndicator();
    }

    changeGroup(): void {
        this.unsubscribeIndicator();
    }

    changeIndicator(indicator: IManufactureUnitGroupIndicator): void {
        this.unsubscribeIndicator(indicator);
        this.subscribeIndicator(indicator)
    }

    private unsubscribeIndicator(indicator?: IManufactureUnitGroupIndicator): void {
        if (this.activeIndicator?.id !== indicator?.id) {
            this.activeIndicator = null;
        }
    }

    private subscribeIndicator(indicator: IManufactureUnitGroupIndicator): void {
        if (!indicator) return;
        this.setActiveIndicator.emit(indicator.id)
    }

    public compareFn(manufacture1: IManufacture, manufacture2: IManufacture): boolean {
        return manufacture1 && manufacture2 ? manufacture1.id === manufacture2.id : manufacture1 === manufacture2;
    }
}

