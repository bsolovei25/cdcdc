import { Component, ChangeDetectionStrategy, OnChanges, Input } from '@angular/core';
import {
    IProductionDeviationsGraph,
    IProductionDeviationsColumn,
} from '../../../../../dashboard/models/SMP/production-deviations.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-production-deviations-diagram',
    templateUrl: './production-deviations-diagram.component.html',
    styleUrls: ['./production-deviations-diagram.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductionDeviationsDiagramComponent implements OnChanges {
    @Input() public data: IProductionDeviationsGraph = null;

    public readonly iconUrl: string = 'assets/icons/widgets/SMP/production-deviations/warning-deviation.svg';

    public limits: { up: string; down: string } = {
        up: '0%',
        down: '0%',
    };

    public selection: SelectionModel<IProductionDeviationsColumn> = new SelectionModel<IProductionDeviationsColumn>();

    constructor() {}

    public ngOnChanges(): void {
        this.transformData();
        const today: Date = new Date(2020, 4, 15);
        const col = this.data.columns.find((column) => column.date.getDate() === today.getDate());
        this.selection.select(col);
    }

    private transformData(): void {
        if (this.data.graphType === 'baseline') {
            this.transformBaselineGraph();
        } else {
            this.transformNormalGraph();
        }
    }

    private transformNormalGraph(): void {
        let maxValue: number = this.data.columns.reduce((acc, column) => {
            const val: number = column.fact < column.plan ? column.plan : column.fact;
            if (acc < val) {
                return val;
            }
            return acc;
        }, 0);
        maxValue = maxValue < this.data.limits.upValue ? this.data.limits.upValue + 15 : maxValue;
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

    private transformBaselineGraph(): void {
        this.data.columns.forEach((column) => {
            this.data.plan = this.data.plan ? this.data.plan : column.plan;
            column.direction = column.fact > this.data.plan ? 'up' : 'down';
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
    }
}
