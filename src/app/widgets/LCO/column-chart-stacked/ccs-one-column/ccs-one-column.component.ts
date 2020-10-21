import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { IColumnChartStacked } from '../../../../dashboard/models/LCO/column-chart-stacked';
import { IBlockDiagramColumn } from '../../../../dashboard/models/LCO/circle-block-diagram';

@Component({
    selector: 'evj-ccs-one-column',
    templateUrl: './ccs-one-column.component.html',
    styleUrls: ['./ccs-one-column.component.scss'],
})
export class CcsOneColumnComponent implements OnInit, AfterViewInit {
    @Input() data: IColumnChartStacked;

    public colorActive: string = '#8c99b2';
    public colorDisable: string = '#606580';
    public colorPlan: string = '#f4a321';
    public colorFact: string = '#ffffff';
    public colorNormal: string = '#A2E2FF';

    public defaultIconPath: string = 'assets/icons/widgets/column-chart-stacked/';

    constructor() {}

    public ngOnInit(): void {}

    public ngAfterViewInit(): void {
        this.graphIcon();
    }

    public graphIcon(): string {
        if (this.data.iconId) {
            return this.defaultIconPath + this.data.iconId + '.svg';
        }
        return '';
    }

    public graphValues(): IBlockDiagramColumn {
        const maxValue: number = this.data.max + 7;
        const plan: number = Math.round((this.data.plan / maxValue) * 100);
        let fact: number = this.data.plan ? Math.round((this.data.fact / this.data.plan) * 100) : 0;
        if (this.data.fact > this.data.plan) {
            fact = plan;
        }
        const values: IBlockDiagramColumn = {
            plan: plan + '%',
            fact: fact + '%',
            pusher: 100 - plan + '%',
        };

        return values;
    }

    public graphColor(): string {
        if (this.data.plan === this.data.fact) {
            return this.colorNormal;
        }
        return this.colorFact;
    }

    public fontColor(isOnGraph: boolean = false): string {
        if (this.data.plan === 0) {
            return this.colorDisable;
        }
        if (isOnGraph && this.data.plan === this.data.fact) {
            return this.colorNormal;
        }
        if (isOnGraph) {
            return this.colorFact;
        }
        return this.colorActive;
    }

    public iconColor(): string {
        if (this.data.plan === 0) {
            return this.colorDisable;
        }
        if (this.data.plan === this.data.fact) {
            return this.colorNormal;
        }
        return this.colorActive;
    }
}
