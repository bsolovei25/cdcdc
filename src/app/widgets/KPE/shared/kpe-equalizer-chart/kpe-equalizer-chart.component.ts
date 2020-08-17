import {
    AfterViewInit,
    Component,
    ElementRef,
    HostListener, OnInit,
    ViewChild
} from '@angular/core';
import { IBarDiagramSize, IBarDiagramData } from './components/bar-diagram/bar-diagram.component';
import { HttpClient } from '@angular/common/http';

export interface IKpeEqualizerInputData {
    name: string;
    comment?: string;
    chartData: IKpeEqualizerChartData[];
}

export interface IKpeEqualizerChartData {
    barSize: number;
    valueSize?: number;
    overSize?: number;
}

@Component({
    selector: 'evj-kpe-equalizer-chart',
    templateUrl: './kpe-equalizer-chart.component.html',
    styleUrls: ['./kpe-equalizer-chart.component.scss'],
})
export class KpeEqualizerChartComponent implements AfterViewInit, OnInit {

    public size: IBarDiagramSize = { width: null, height: null };

    public data: IBarDiagramData[] = [];

    @ViewChild('chart')
    public chartElement: ElementRef;

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.getChartAreaSize();
    }

    constructor(
        private http: HttpClient,
    ) {
    }

    public ngOnInit(): void {
        this.http
            .get('assets/mock/KPE/equalizer-chart.json')
            .toPromise()
            .then((data: IBarDiagramData[]) => {
                this.data = data;
            });
    }

    public ngAfterViewInit(): void {
        this.getChartAreaSize();
    }

    private getChartAreaSize(): void {
        this.size = {
            width: this.chartElement.nativeElement.clientWidth,
            height: this.chartElement.nativeElement.clientHeight
        };
    }
}
