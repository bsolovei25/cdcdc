import { Component, Input, OnInit } from '@angular/core';
import { CONTENT_DATA } from './mock';

interface IKpeUniversalCardConfig {
    gaugeWidth: number;
    haveLineChart: boolean;
}

interface IKpeUniversalCardMonthData {
    day: number;
    status: 'default' | 'bad' | 'good' | 'great';
}

export interface IKpeUniversalCardLineChart{
    planValue: number;
    predictValue: number;
    currentValue: number;
    devPC: number;
    devPP: number;
}

export interface IKpeUniversalCardContentData {
    title: string;
    subtitle?: string;
    percent: number;
    percentStatus: 'default' | 'warning';
    lineChart: IKpeUniversalCardLineChart;
    monthData: IKpeUniversalCardMonthData[];
}

@Component({
    selector: 'evj-kpe-universal-card',
    templateUrl: './kpe-universal-card.component.html',
    styleUrls: ['./kpe-universal-card.component.scss'],
})
export class KpeUniversalCardComponent implements OnInit {
    @Input() set type(currentType: number) {
        this.currentType = currentType;
    }
    @Input() contentData: IKpeUniversalCardContentData = CONTENT_DATA;

    readonly cardConfig: IKpeUniversalCardConfig[] = [
        {
            gaugeWidth: 30,
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

    public currentType: number = 2;

    constructor() {}

    ngOnInit(): void {
        // Массив размер которого равен колличесвту дней в месяце
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
            const newItem = this.contentData.monthData.find(date => date.day === item.day)
            if (newItem) {
                this.currentMonth[i] = newItem;
            }
        })
    }

    private daysInMonth(): void {
        const currentDate: Date = new Date();
        const daysCount = 32 - new Date(currentDate.getFullYear(), currentDate.getMonth(), 32).getDate();
        this.currentMonth = new Array(daysCount);
    }
}
