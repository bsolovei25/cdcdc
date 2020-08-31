import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IPerfProgPark } from '../../models/SMP/performance-progress-indicators.model';

@Component({
    selector: 'evj-performance-bar',
    templateUrl: './performance-bar.component.html',
    styleUrls: ['./performance-bar.component.scss'],
})
export class PerformanceBarComponent implements OnInit, OnChanges {
    @Input() public data: IPerfProgPark = {
        planLevel: 50,
        factLevel: 40,
    };

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.data) {
            this.mapLevel();
        }
    }

    mapLevel(): void {
        if (this.data?.planLevel > 100) {
            this.data.planLevel = 100;
        } else if (this.data?.planLevel < 0) {
            this.data.planLevel = 0;
        }

        if (this.data?.factLevel > 100) {
            this.data.factLevel = 100;
        } else if (this.data?.factLevel < 0) {
            this.data.factLevel = 0;
        }

        this.data.factLevel = this.percent(this.data?.factLevel);
        this.data.planLevel = this.percent(this.data?.planLevel);
    }

    percent(value: number): number {
        const levelBakPercent = 85;
        return value === 0 ? 0 : (levelBakPercent * value) / 100;
    }
}
