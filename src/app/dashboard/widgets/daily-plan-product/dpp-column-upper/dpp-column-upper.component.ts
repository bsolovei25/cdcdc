import { Component, OnInit, Input } from '@angular/core';
import { IDPPUpperCol } from '../../../models/daily-plan-product';

@Component({
    selector: 'evj-dpp-column-upper',
    templateUrl: './dpp-column-upper.component.html',
    styleUrls: ['./dpp-column-upper.component.scss'],
})
export class DppColumnUpperComponent implements OnInit {
    @Input() data: IDPPUpperCol = null;
    @Input() MAXIMUM_COEF: number = null;
    @Input() endOfPeriod: number | false = false;
    @Input() isActive: boolean = false;

    public deviation: number = null;

    constructor() {}

    public ngOnInit(): void {}

    public getPercent(value: number): number {
        return (value / (this.data.maxValue * this.MAXIMUM_COEF)) * 100;
    }

    public blockHeight(): string {
        return this.getPercent(this.data.currentValue) + '%';
    }

    public onLowerValue(): boolean {
        if (this.data.currentValue < this.data.lowerValue) {
            return true;
        }
        return false;
    }

    public isLowerThanLimit(): boolean {
        if (this.data.currentValue < this.data.lowerValue && !this.endOfPeriod) {
            this.deviation = this.data.currentValue - this.data.lowerValue;
            return true;
        } else if (this.endOfPeriod) {
            this.deviation = this.endOfPeriod;
            return true;
        }
        return false;
    }

    public getLimits(isHigherLimit: boolean): string {
        if (isHigherLimit) {
            return this.getPercent(this.data.higherValue) + '%';
        }
        return this.getPercent(this.data.lowerValue) + '%';
    }

    public getBlurHeight(isHigherBlur: boolean): string {
        if (isHigherBlur) {
            return 100 - this.getPercent(this.data.higherValue) + '%';
        }
        return this.getPercent(this.data.lowerValue) + '%';
    }

    public getBlurBottom(): string {
        return this.getPercent(this.data.higherValue) + '%';
    }
}
