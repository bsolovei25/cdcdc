import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

type KpeChartsAnalyticCardType = 'fact' | 'plan' | 'deviation' | 'interval';

@Component({
    selector: 'evj-kpe-charts-analytic-card',
    templateUrl: './kpe-charts-analytic-card.component.html',
    styleUrls: ['./kpe-charts-analytic-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpeChartsAnalyticCardComponent implements OnInit {
    @Input() type: KpeChartsAnalyticCardType = 'fact';
    @Input() value: number = 0;
    get cardTitle(): string {
        switch (this.type) {
            case 'fact':
                return 'Факт';
            case 'plan':
                return 'План';
            case 'deviation':
                return 'Отклон.';
            case 'interval':
                return 'Дов. инт.';
        }
    }

    get cardAdder(): string {
        switch (this.type) {
            case 'deviation':
                return this.value > 0 ? '+' : '';
            case 'interval':
                return '±';
        }
    }

    constructor() {}

    ngOnInit(): void {}
}
