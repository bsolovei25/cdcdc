import { Component, OnInit, Input } from '@angular/core';
import { IProductionDeviationsGraph } from '../../../../../models/SMP/production-deviations.model';

@Component({
    selector: 'evj-production-deviations-diagram',
    templateUrl: './production-deviations-diagram.component.html',
    styleUrls: ['./production-deviations-diagram.component.scss'],
})
export class ProductionDeviationsDiagramComponent implements OnInit {
    @Input() public data: IProductionDeviationsGraph = null;

    constructor() {}

    public ngOnInit(): void {
        this.transformData();
    }

    private transformData(): void {
        if (this.data.graphType === 'baseline') {
            this.data.columns.forEach((column) => {
                column.direction = column.fact > column.plan ? 'up' : 'down';
                column.fact = Math.abs(column.fact - column.plan);
                if (column.direction === 'up') {
                    column.limit = {
                        value: Math.abs(this.data.limits.upValue - column.plan),
                        type: this.data.limits.upType,
                    };
                } else {
                    column.limit = {
                        value: Math.abs(this.data.limits.downValue - column.plan),
                        type: this.data.limits.downType,
                    };
                }
                column.plan = 0;
                column.maxValue = 0;
            });
            const maxValue: number = this.data.columns.reduce((acc, column) => {
                if (acc < column.fact) {
                    return column.fact;
                }
                return acc;
            }, 0);
            this.data.columns.forEach((column) => {
                column.maxValue = maxValue;
            });
        } else {
            this.data.columns.forEach((column) => {
                column.limit = {
                    value: this.data.limits.upValue,
                    type: this.data.limits.upType,
                };
            });
        }
    }
}
