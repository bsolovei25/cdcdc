import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {IKpeGaugeChartPage} from "@widgets/KPE/key-performance-indicators/components/gauge-diagram/gauge-diagram.component";

interface IKpeUniversalCardConfig {
    gaugeWidth: number;
    haveLineChart: boolean;
}

export interface IKpeUniversalCardMonthData {
    day: number;
    status: 'default' | 'bad' | 'good' | 'great';
}

export interface IKpeUniversalCardLineChart{
    name?: string;
    title?: string;
    percent?: number;
    percentStatus?: 'default' | 'warning';
    deviationPlanPredict: number;
    deviationPlanPredictFact: number;
    fact: number;
    percentageInfluence: number;
    plan: number;
    planPredict: number;
    predict: number;
}

@Component({
    selector: 'evj-kpe-universal-card',
    templateUrl: './kpe-universal-card.component.html',
    styleUrls: ['./kpe-universal-card.component.scss'],
})
export class KpeUniversalCardComponent implements OnInit, OnChanges {
    @Input() set type(currentType: number) {
        this.currentType = currentType;
    }
    @Input()
    public contentData: IKpeUniversalCardLineChart = {
        percentStatus: 'default',
        deviationPlanPredict: 0,
        deviationPlanPredictFact: 0,
        fact: 0,
        percentageInfluence: 0,
        plan: 0,
        planPredict: 0,
        predict: 0,
    };

    @Input()
    public gaugeChart: IKpeGaugeChartPage;

    readonly cardConfig: IKpeUniversalCardConfig[] = [
        {
            gaugeWidth: 40,
            haveLineChart: true,
        },
        {
            gaugeWidth: 30,
            haveLineChart: false,
        },
        {
            gaugeWidth: 40,
            haveLineChart: true,
        },
    ];
    public currentMonth: IKpeUniversalCardMonthData[] = [];

    public currentType: number = 0;

    constructor() {}

    ngOnInit(): void {
        // Массив размер которого равен количеству дней в месяце
        this.daysInMonth();

        // Проставляем дефолтные значения для каждого дня
        for (let i = 0; i < this.currentMonth.length; i++){
            this.currentMonth[i] = {
                day: i + 1,
                status: 'default'
            }
        }

        // Меняем значение для дня, для которого есть инфа в данных
        this.currentMonth.forEach((item, i) => {
            const newItem = this.gaugeChart?.dailyStatus?.find(date => date.day === item.day)
            if (newItem) {
                this.currentMonth[i] = newItem;
            }
        })
    }

    ngOnChanges(): void {
        if (this.contentData) {
            if (this.contentData.fact - this.contentData.planPredict < 0) {
                this.contentData.percentStatus = 'warning';
            } else {
                this.contentData.percentStatus = 'default';
            }
        }
    }

    private daysInMonth(): void {
        const currentDate: Date = new Date();
        const daysCount = 32 - new Date(currentDate.getFullYear(), currentDate.getMonth(), 32).getDate();
        this.currentMonth = new Array(daysCount);
    }
}
