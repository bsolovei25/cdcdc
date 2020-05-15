import { Component, OnInit, Input } from '@angular/core';
import { IProductionDeviationsGraph } from '../../../../../models/SMP/production-deviations.model';

@Component({
    selector: 'evj-production-deviations-diagram',
    templateUrl: './production-deviations-diagram.component.html',
    styleUrls: ['./production-deviations-diagram.component.scss'],
})
export class ProductionDeviationsDiagramComponent implements OnInit {
    @Input() public data: IProductionDeviationsGraph = null;

    public limits: { up: string; down: string } = {
        up: '0%',
        down: '0%',
    };

    constructor() {}

    public ngOnInit(): void {
        this.transformData();
    }

    private transformData(): void {
        if (this.data.graphType === 'baseline') {
            this.data.columns.forEach((column) => {
                this.data.plan = column.plan;
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
            this.data.limits.upValue = this.data.limits.upValue - this.data.plan;
            this.data.limits.downValue = Math.abs(this.data.limits.downValue - this.data.plan);
            const maxValue: number = this.data.columns.reduce((acc, column) => {
                if (acc < column.fact) {
                    return column.fact;
                }
                return acc;
            }, 0);
            this.data.columns.forEach((column) => {
                column.maxValue = maxValue;
            });
            this.limits = {
                up: `${(this.data.limits.upValue / maxValue) * 100}%`,
                down: `${(this.data.limits.downValue / maxValue) * 100}%`,
            };
        } else {
            const maxValue: number = this.data.columns.reduce((acc, column) => {
                const val: number = column.fact < column.plan ? column.plan : column.fact;
                if (acc < val) {
                    return val;
                }
                return acc;
            }, 0);
            this.data.columns.forEach((column) => {
                column.limit = {
                    value: this.data.limits.upValue,
                    type: this.data.limits.upType,
                };
                column.maxValue = maxValue;
            });
            this.limits = {
                up: `${(this.data.limits.upValue / maxValue) * 100}%`,
                down: `0%`,
            };
        }
    }
}
