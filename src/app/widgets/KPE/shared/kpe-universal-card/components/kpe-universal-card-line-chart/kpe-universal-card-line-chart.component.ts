import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { IKpeUniversalCardLineChart } from '../../kpe-universal-card.component';

@Component({
    selector: 'evj-kpe-universal-card-line-chart',
    templateUrl: './kpe-universal-card-line-chart.component.html',
    styleUrls: ['./kpe-universal-card-line-chart.component.scss'],
})
export class KpeUniversalCardLineChartComponent implements OnInit, OnChanges {
    @Input() set data(item: IKpeUniversalCardLineChart) {
        this.chartValues = item;
    }
    public chartData: {
        [key: string] : {
            percent: number;
            left: number;
        }
    } = {
        blueBold: {
            percent: 0,
            left: 0,
        },
        blueLightBold: {
            percent: 0,
            left: 0,
        },
        greenBold: {
            percent: 0,
            left: 0,
        },
        orangeBold: {
            percent: 0,
            left: 0,
        },
        orangeThin: {
            percent: 0,
            left: 0,
        },
        greenThin: {
            percent: 0,
            left: 0,
        },
        lightThin: {
            percent: 0,
            left: 0,
        }
    };

    public chartValues: IKpeUniversalCardLineChart;

    constructor() {}

    ngOnInit(): void {}

    ngOnChanges(): void {
        this.dataMapper();
    }

    private dataMapper(): void {
        const factPercentage = this.chartValues.fact * 100 / this.chartValues.plan;
        const planPredictPercentage = this.chartValues.planPredict * 100 / this.chartValues.plan;
        const predictPercentage = this.chartValues.predict * 100 / this.chartValues.plan;
        const predictionDeltaValue = factPercentage - planPredictPercentage;

        // Fact - PlanPredict = зеленым если положительная, оранжевым если отрицательная
        // Весь диапазон - Plan
        if (predictionDeltaValue >= 0) {
            if (Math.abs(predictionDeltaValue) + planPredictPercentage > 100) {
                this.chartData.greenBold.percent = 100 - planPredictPercentage;
            } else {
                this.chartData.greenBold.percent = Math.abs(predictionDeltaValue);
            }
            this.chartData.greenBold.left = planPredictPercentage;
        } else {
            if (Math.abs(predictionDeltaValue) + planPredictPercentage > 100) {
                this.chartData.orangeBold.percent = 100 - planPredictPercentage;
            } else {
                this.chartData.orangeBold.percent = Math.abs(predictionDeltaValue);
            }
            this.chartData.orangeBold.left = planPredictPercentage;
        }
        this.chartData.blueBold.percent = planPredictPercentage >= 100 ? 100 : planPredictPercentage;

        // если Predict > Plan Predict идет инвертированно назад
        if (predictPercentage > 100) {
            this.chartData.greenThin.percent = predictPercentage - 100;
            this.chartData.greenThin.left = 100 - (predictPercentage - 100);
            this.chartData.blueLightBold.percent = 100 - (predictPercentage - 100);
            this.chartData.lightThin.percent = 100 - (predictPercentage - 100);
        } else {
            this.chartData.blueLightBold.percent = 100;
            this.chartData.lightThin.percent = predictPercentage >= 100 ? 100 : predictPercentage;
            this.chartData.orangeThin.percent = 100 - (predictPercentage >= 100 ? 100 : predictPercentage);
            this.chartData.orangeThin.left = predictPercentage >= 100 ? 100 : predictPercentage;
        }
    }
}
