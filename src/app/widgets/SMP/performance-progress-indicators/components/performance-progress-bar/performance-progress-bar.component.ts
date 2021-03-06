import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { IPerfProgPark } from '../../../../../dashboard/models/SMP/performance-progress-indicators.model';

@Component({
    selector: 'evj-performance-progress-bar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './performance-progress-bar.component.html',
    styleUrls: ['./performance-progress-bar.component.scss'],
})
export class PerformanceProgressBarComponent implements OnInit, OnChanges {
    @Input() public data: IPerfProgPark;

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
