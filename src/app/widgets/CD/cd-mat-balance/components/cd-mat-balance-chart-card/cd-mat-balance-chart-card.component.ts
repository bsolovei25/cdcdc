import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ISplineDiagramData } from '../../../../LCO/spline-trends-chart/components/spline-diagram/spline-diagram.component';
import { ISplineDiagramSize } from '../../../cd-shared/cd-line-chart/cd-line-chart.component';

@Component({
    selector: 'evj-cd-mat-balance-chart-card',
    templateUrl: './cd-mat-balance-chart-card.component.html',
    styleUrls: ['./cd-mat-balance-chart-card.component.scss'],
})
export class CdMatBalanceChartCardComponent implements OnInit, AfterViewInit {
    @ViewChild('chart')
    public chartElement: ElementRef;

    public data: ISplineDiagramData;
    public size: ISplineDiagramSize;

    constructor() {}

    ngOnInit(): void {}

    public ngAfterViewInit(): void {
        this.size = {
            width: this.chartElement.nativeElement.offsetWidth,
            height: this.chartElement.nativeElement.offsetHeight,
        };
    }
}
