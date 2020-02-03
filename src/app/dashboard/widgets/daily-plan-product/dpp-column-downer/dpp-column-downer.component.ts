import { Component, OnInit, ViewChild, ElementRef, Input, HostListener } from '@angular/core';
import { IDPPDownerCol, IDailyPlanProduct } from '../../../models/daily-plan-product';

@Component({
    selector: 'evj-dpp-column-downer',
    templateUrl: './dpp-column-downer.component.html',
    styleUrls: ['./dpp-column-downer.component.scss'],
})
export class DppColumnDownerComponent implements OnInit {
    @Input() data: IDPPDownerCol = null;
    @Input() MAXIMUM_COEF: number;
    @Input() nextLimit: IDailyPlanProduct = null;
    @Input() isActive: boolean = false;

    @ViewChild('container', { static: false }) container: ElementRef;

    public array: boolean[] = [];

    constructor() {}

    public ngOnInit(): void {
        this.insertTemplates();
    }

    @HostListener('document:resize')
    public onResize(): void {
        this.insertTemplates();
    }

    public getLimitHeight(planValue: number): number {
        const heightLimitPercent: number =
            (planValue / (this.data.maxValue * this.MAXIMUM_COEF)) * 100;
        return heightLimitPercent;
    }

    public getLimitHeightString(planValue: number): string {
        return this.getLimitHeight(planValue) + '%';
    }

    public getBorderBlockHeight(): string {
        const nextLimit: number = this.nextLimit ? this.nextLimit.downerGraph.plan : 0;
        const currentLimit: number = this.data.plan;
        const absDifference: number = Math.abs(currentLimit - nextLimit);
        return this.getLimitHeightString(absDifference);
    }

    public getBorderBlockBottom(): string {
        const nextLimit: number = this.nextLimit ? this.nextLimit.downerGraph.plan : 0;
        const currentLimit: number = this.data.plan;
        const difference: number = currentLimit - nextLimit;
        if (difference > 0) {
            return 100 - this.getLimitHeight(currentLimit) + '%';
        } else {
            return 100 - this.getLimitHeight(nextLimit) + '%';
        }
    }

    public getMaxCountOfLines(): number {
        if (this.container) {
            const heightLimitPercent: number = this.getLimitHeight(this.data.plan);
            const height: string = this.container.nativeElement.clientHeight;
            const line = 5; // высота маленькой линии
            const maxCountOfLines: number = Math.round(
                (+height * heightLimitPercent) / (100 * line)
            );
            return maxCountOfLines;
        }
        return null;
    }

    public getCountOfLines(): number {
        const maxCountOfLines: number = this.getMaxCountOfLines();
        if (maxCountOfLines) {
            const countOfLines: number = Math.round(
                (this.data.currentValue / this.data.plan) * maxCountOfLines
            );
            return countOfLines;
        }
        return 0;
    }

    public insertTemplates(): void {
        const countOfLines: number = this.getCountOfLines();
        let isWarningColor: boolean = false;
        if (this.data.plan > this.data.currentValue) {
            isWarningColor = true;
        }
        this.array = [];
        for (let i = 0; i < countOfLines; i++) {
            this.array.push(isWarningColor);
        }
    }

    public getDifference(): number {
        return this.data.currentValue - this.data.plan;
    }

    public chooseColorClass(item: boolean): string {
        if (item && this.isActive) {
            return 'line-warning';
        } else if (this.isActive) {
            return '';
        } else {
            return 'line-disable';
        }
    }
}
