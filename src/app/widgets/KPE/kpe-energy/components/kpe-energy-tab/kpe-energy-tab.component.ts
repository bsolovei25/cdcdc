import { Component, Input, OnInit } from '@angular/core';
import { KpeEngUnitsComparator } from '../../../shared/kpe-eng-units-comparator';

export interface IKpeEnergyTab {
    title: string;
    unit: string;
    type: 'electricity' | 'fuel' | 'steam' | 'warm' | 'water';
    fact: number;
    plan: number;
    deviation?: number;
    percentage?: number;
    percentageInfluence?: number;
    deviationPercentage?: number;
    deviationPlanPredict?: number;
    deviationPlanPredictFact?: number;
    predict?: number;
}

@Component({
    selector: 'evj-kpe-energy-tab',
    templateUrl: './kpe-energy-tab.component.html',
    styleUrls: ['./kpe-energy-tab.component.scss'],
})
export class KpeEnergyTabComponent implements OnInit {
    @Input() data: IKpeEnergyTab = null;
    @Input() comparator: KpeEngUnitsComparator;

    constructor() {}

    ngOnInit(): void {
    }

    get deviationValue(): number {
        return this.data.deviation;
    }

    get iconPath(): string {
        this.data.type = this.data.type ? this.data.type : 'electricity';
        return `assets/icons/widgets/KPE/kpe-energetic/types/${this.data.type}.svg`;
    }
}
