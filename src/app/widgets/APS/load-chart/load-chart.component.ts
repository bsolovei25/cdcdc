import {
    Component,
    OnInit,
    Inject,
    ViewChild,
    ElementRef,
    Renderer2,
    AfterViewInit,
    HostListener,
    OnDestroy,
} from '@angular/core';
import { WidgetPlatform } from '../../../dashboard/models/widget-platform';
import { WidgetService } from '../../../dashboard/services/widget.service';
import { IApsLoadChart, IApsLoad } from '../../../dashboard/models/APS/load-chart.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'evj-load-chart',
    templateUrl: './load-chart.component.html',
    styleUrls: ['./load-chart.component.scss'],
})
export class LoadChartComponent extends WidgetPlatform implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('grid_hor', { static: true }) private gridHor: ElementRef;
    @ViewChild('grid_ver', { static: true }) private gridVer: ElementRef;
    @ViewChild('canvas', { static: true }) private canvas: ElementRef;

    private data: IApsLoad = {
        units: 'тыс.т.',
        period: {
            fromDateTime: new Date(2020, 1, 1),
            toDateTime: new Date(2020, 1, 37),
        },
        chart: [
            {
                value: 130,
                date: new Date(2020, 1, 1, 4),
            },
            {
                value: 10,
                date: new Date(2020, 1, 1, 12),
            },
            {
                value: 210,
                date: new Date(2020, 1, 1, 21),
            },
            {
                value: 130,
                date: new Date(2020, 1, 2, 4),
            },
            {
                value: 130,
                date: new Date(2020, 1, 2, 12),
            },
            {
                value: 210,
                date: new Date(2020, 1, 2, 21),
            },
            {
                value: 210,
                date: new Date(2020, 1, 2, 22),
            },
            {
                value: 210,
                date: new Date(2020, 1, 2, 23),
            },
            {
                value: 30,
                date: new Date(2020, 1, 3, 4),
            },
            {
                value: 10,
                date: new Date(2020, 1, 3, 12),
            },
            {
                value: 210,
                date: new Date(2020, 1, 3, 21),
            },
            {
                value: 130,
                date: new Date(2020, 1, 4, 4),
            },
            {
                value: 10,
                date: new Date(2020, 1, 4, 12),
            },
            {
                value: 10,
                date: new Date(2020, 1, 4, 21),
            },
            {
                value: 130,
                date: new Date(2020, 1, 5, 4),
            },
            {
                value: 190,
                date: new Date(2020, 1, 5, 12),
            },
            {
                value: 210,
                date: new Date(2020, 1, 5, 21),
            },
            {
                value: 160,
                date: new Date(2020, 1, 6, 4),
            },
            {
                value: 120,
                date: new Date(2020, 1, 7, 12),
            },
            {
                value: 0,
                date: new Date(2020, 1, 8, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 9, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 10, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 11, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 12, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 13, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 14, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 15, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 16, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 17, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 18, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 19, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 20, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 21, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 22, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 23, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 24, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 25, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 26, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 27, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 28, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 29, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 30, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 31, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 32, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 33, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 34, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 35, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 36, 21),
            },
            {
                value: 0,
                date: new Date(2020, 1, 37, 21),
            },
        ],
    };

    public transformedData: IApsLoadChart[] = [];
    public units: string = '';

    private valueLabels: number[] = [];

    private readonly colWidth: number = 37;
    private minValue: number = 0;
    private maxValue: number = 0;

    constructor(
        protected widgetService: WidgetService,
        private renderer: Renderer2,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
    }

    public ngOnInit(): void {
        this.subscriptions.push(
            this.widgetService.currentDates$.subscribe((date) => {
                if (date) {
                    console.log(date);
                }
            })
        );

        super.widgetInit();
        this.getData();
        this.findMinMax();
    }

    public ngAfterViewInit(): void {
        this.createGrid();
        this.drawCanvas();
    }

    public ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {}

    @HostListener('document:resize')
    onResize(): void {
        this.drawCanvas();
    }

    @HostListener('document:resizeGrid')
    onResizeGrid(): void {
        setTimeout(() => this.drawCanvas(), 1100);
    }

    private getData(): void {
        const arr = [];
        let date = null;
        let dateArr = null;
        this.data.chart.forEach((item) => {
            if (
                date &&
                item.date.getDate() === date.getDate() &&
                item.date.getMonth() === date.getMonth()
            ) {
                dateArr.push(item);
            } else if (date && dateArr) {
                arr.push(dateArr);
                dateArr = [];
                dateArr.push(item);
                date = new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate());
            } else {
                dateArr = [];
                dateArr.push(item);
                date = new Date(item.date.getFullYear(), item.date.getMonth(), item.date.getDate());
            }
        });

        this.transformedData = arr.map((item) => {
            const average = item.reduce((acc, point, index, array) => {
                if (array.length - 1 === index) {
                    return (acc + point.value) / array.length;
                }
                return acc + point.value;
            }, 0);
            const newDate = item[0].date;
            return {
                value: average,
                date: new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()),
            };
        });

        this.units = this.data.units;
    }

    private findMinMax(): void {
        const sorted = this.transformedData.slice().sort((a, b) => a.value - b.value);
        [this.minValue, this.maxValue] = [sorted[0].value, sorted.slice(-1)[0].value];

        const step = (this.maxValue - this.minValue) / 7;
        for (let i = 0, counter = this.minValue; i < 7; i++) {
            this.valueLabels.unshift(Math.round(counter));
            counter += step;
        }
    }

    private createGrid(): void {
        const horLines = 6;

        const appendLine = (elemRef: ElementRef, type: 'hor' | 'ver') => {
            const line = this.renderer.createElement('div');
            this.renderer.addClass(line, `line-${type}`);
            this.renderer.appendChild(elemRef.nativeElement, line);
        };

        for (let i = 0; i < horLines; i++) {
            appendLine(this.gridHor, 'hor');
        }

        const appendLabel = (elemRef: HTMLElement, value: number) => {
            const label = this.renderer.createElement('div');
            this.renderer.addClass(label, `label`);
            const text = this.renderer.createText(`${value}`);
            this.renderer.appendChild(label, text);
            this.renderer.appendChild(elemRef, label);
        };

        const labelsBlock: HTMLElement = this.renderer.createElement('div');
        this.renderer.addClass(labelsBlock, 'labels');

        this.valueLabels.forEach((value) => {
            appendLabel(labelsBlock, value);
        });

        this.renderer.appendChild(this.gridHor.nativeElement, labelsBlock);
    }

    private drawCanvas(): void {
        const canv = this.canvas.nativeElement as HTMLCanvasElement;
        const ctx = canv.getContext('2d') as CanvasRenderingContext2D;

        const width = this.transformedData.length * this.colWidth;
        const height = this.gridHor.nativeElement.offsetHeight - 1;

        ctx.clearRect(0, 0, width, height);

        canv.setAttribute('height', `${height}`);
        canv.setAttribute('width', `${width}`);

        this.drawVerticalGrid(ctx, height);
        this.drawChart(ctx, height);
    }

    private drawChart(ctx: CanvasRenderingContext2D, height: number): void {
        const step = this.colWidth / 2;

        const scaleValueY = (value: number) => {
            return (height * (value - this.minValue)) / (this.maxValue - this.minValue);
        };

        ctx.beginPath();

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#2378d9';
        ctx.moveTo(0, scaleValueY(this.transformedData[0].value));
        this.transformedData.forEach((point, index) => {
            ctx.lineTo(index * this.colWidth + step, scaleValueY(point.value));
        });
        ctx.stroke();

        ctx.closePath();
    }

    private drawVerticalGrid(ctx: CanvasRenderingContext2D, height: number): void {
        ctx.beginPath();

        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(94, 101, 130, 0.1)';

        let xCoord: number = 0;
        const yCoordMin: number = 0;
        const yCoordMax: number = height;

        ctx.moveTo(xCoord, yCoordMin);
        ctx.lineTo(xCoord, yCoordMax);
        this.transformedData.forEach(() => {
            xCoord += this.colWidth;
            ctx.moveTo(xCoord, yCoordMin);
            ctx.lineTo(xCoord, yCoordMax);
        });
        ctx.stroke();

        ctx.closePath();
    }
}
