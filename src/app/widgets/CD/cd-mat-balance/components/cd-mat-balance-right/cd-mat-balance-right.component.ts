import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IModalDeviation, IStreams } from '../../cd-mat-balance.component';
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
        value?.forEach((el) => (this.percentLoad += +el.percentLoad?.toFixed()));
        value?.sort((a, b) => a.id - b.id);
    }

    @Input() set modalDev(value: IModalDeviation) {
        this.modal = value;
    }

    @Output() modalDeviation: EventEmitter<IModalDeviation> = new EventEmitter<IModalDeviation>(
        null
    );

    modal: IModalDeviation;
    percentLoad: number = 0;
    iconArrow: boolean;

    constructor(private cdMatBalanceService: CdMatBalanceService) {
    }

    ngOnInit(): void {
    }

    clickItemDeviation(event: MouseEvent, item: IStreams, idx: number): void {
        const parentPos = document.getElementById('parentPos')?.getBoundingClientRect();
        const childPos = document.getElementById(`el-${idx}`)?.getBoundingClientRect();
        const selectChart: string[] = [
            ...this.cdMatBalanceService.charts$?.getValue(),
            item?.widgetId
        ];
        const setCharts = new Set(selectChart);
        this.cdMatBalanceService.charts$.next([...setCharts]);
        if (item.deviation !== 0) {
            this.openChart(item.id);
        }
        this.modal = {
            id: item.id,
            top: childPos?.top - parentPos?.top - 93,
            name: item.name,
            engUnits: item.engUnits,
            valueDeviation: (item.deviation < 1 && item.deviation > -1) ?
                +item.deviation.toFixed(2) : +item.deviation.toFixed(),
            valueModel: item.modelValue,
            valueFact: item.value
        };
        this.modalDeviation.emit(this.modal);
    }

    clickItem(item: IStreams): void {
        const selectChart: string[] = [
            ...this.cdMatBalanceService.charts$?.getValue(),
            item?.widgetId
        ];
        const setCharts = new Set(selectChart);
        this.cdMatBalanceService.charts$.next([...setCharts]);
    }

    openChart(id: number): void {
        this.cdMatBalanceService.showDeviation.next(id);
    }
}
