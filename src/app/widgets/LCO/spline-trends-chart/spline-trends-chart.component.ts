import {
    Component,
    OnInit,
    Inject,
    OnDestroy,
    HostListener,
    ElementRef,
    ViewChild, AfterViewInit
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import {
    ISplineDiagramSize,
    ISplineDiagramData,
} from './components/spline-diagram/spline-diagram.component';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'evj-spline-trends-chart',
    templateUrl: './spline-trends-chart.component.html',
    styleUrls: ['./spline-trends-chart.component.scss'],
})
export class SplineTrendsChartComponent extends WidgetPlatform implements OnInit, OnDestroy, AfterViewInit {
    public data: ISplineDiagramData;

    @ViewChild('chart')
    public chartElement: ElementRef;

    @HostListener('document:resize', ['$event'])
    public OnResize(): void {
        this.getChartAreaSize();
    }

    public size: ISplineDiagramSize = {width: null, height: null};

    constructor(
        public widgetService: WidgetService,
        private http: HttpClient,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string,
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        super.widgetInit();
    }

    public ngAfterViewInit(): void {
        this.getChartAreaSize();

        this.http
            .get('assets/mock/LCO/spline-trends-chart.json')
            .toPromise()
            .then((data: ISplineDiagramData) => {
                this.getChartAreaSize();
                this.data = data;
            });
    }

    private getChartAreaSize(): void {
        this.size = {
            width: this.chartElement.nativeElement.clientWidth,
            height: this.chartElement.nativeElement.clientHeight,
        };
    }

    private processData(): void {
    }

    protected dataHandler(ref: any): void {
        this.data = ref.groups;
        this.processData();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
