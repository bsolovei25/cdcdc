import { Component, OnInit, Input } from '@angular/core';
import { IStreams } from '../../cd-mat-balance.component';
import { CdMatBalanceService } from '../../../../../dashboard/services/widgets/CD/cd-mat-balance.service';

@Component({
    selector: 'evj-cd-mat-balance-right',
    templateUrl: './cd-mat-balance-right.component.html',
    styleUrls: ['./cd-mat-balance-right.component.scss']
})
export class CdMatBalanceRightComponent implements OnInit {
    @Input() dataLocal: IStreams[] = [];

    @Input() set data(value: IStreams[]) {
        this.dataLocal = value;
        this.percentLoad = 0;
        value?.forEach(el => this.percentLoad += +el.percentLoad?.toFixed());
    }

    percentLoad: number = 0;

    constructor(private cdMatBalanceService: CdMatBalanceService) {
    }

    ngOnInit(): void {
    }

    clickItem(id: number, deviation: number): void {
        const selectChart: string[] =
            [...this.cdMatBalanceService.charts$?.getValue(), id?.toString()];
        const setCharts = new Set(selectChart);
        this.cdMatBalanceService.charts$.next([...setCharts]);
        if (deviation !== 0) {
            this.openChart(id);
        }
    }

    openChart(id: number): void {
        this.cdMatBalanceService.showDeviation.next(id);
    }
}
