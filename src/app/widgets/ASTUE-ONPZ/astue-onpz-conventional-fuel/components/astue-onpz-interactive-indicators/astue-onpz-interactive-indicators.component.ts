import { Component, Input, OnInit } from '@angular/core';

interface IAstueOnpzInteractiveIndicators {
    labels: { name: string, icon: string }[];
    indicators: { name: string, value: number }[];
    allIndicators: { name: string, icon: string }[];
}

@Component({
    selector: 'evj-astue-onpz-interactive-indicators',
    templateUrl: './astue-onpz-interactive-indicators.component.html',
    styleUrls: ['./astue-onpz-interactive-indicators.component.scss']
})
export class AstueOnpzInteractiveIndicatorsComponent implements OnInit {

    @Input() data: IAstueOnpzInteractiveIndicators = {
        labels: [
            {
                name: 'Плановое значение',
                icon: 'dsad'
            },
            {
                name: 'Фактическое значение',
                icon: 'dsad'
            },
            {
                name: 'Температура',
                icon: 'dsad'
            },
            {
                name: 'Температура',
                icon: 'dsad'
            },
            {
                name: 'Температура',
                icon: 'dsad'
            }
        ],
        indicators: [
            {
                name: 'Плановое значение',
                value: 1100
            },
            {
                name: 'Текущее значение',
                value: 1500
            },
            {
                name: 'Текущее отклонение',
                value: 400
            }
        ],
        allIndicators: [
            {
                name: 'Объем',
                icon: 'dsad'
            }
        ]
    };

    constructor() {
    }

    ngOnInit(): void {
    }

}
