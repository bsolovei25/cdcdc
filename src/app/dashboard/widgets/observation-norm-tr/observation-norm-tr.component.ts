import {
    Component,
    Inject,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
    Renderer2,
    Input,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
interface IObservationNormTR {
    minValue: number;
    maxValue: number;
    values: number[];
}
@Component({
    selector: 'evj-observation-norm-tr',
    templateUrl: './observation-norm-tr.component.html',
    styleUrls: ['./observation-norm-tr.component.scss'],
})
export class ObservationNormTRComponent implements OnInit, OnDestroy {
    static itemCols = 15;
    static itemRows = 10;

    circleRadius: string = (35).toString();
    minRadius = 47;
    maxRadius = 75;
    radPoint = '1.69';
    centerX = '89.27';
    centerY = '92.28';
    middleCell = 3;
    scoreValues = 20;
    data: IObservationNormTR = {
        minValue: 95,
        maxValue: 100,
        values: [97, 97, 95, 96, 97, 95, 96, 98, 96, 99, 100, 97, 97, 97],
    };

    middleRadius = 60;

    public title = '';
    public previewTitle: string = 'observation-norm-tr';
    private subscription: Subscription;

    @ViewChild('svgContainerObservation', { static: false }) svgContainerObservation: ElementRef;
    @ViewChild('lastCircle', { static: false }) lastCircle: ElementRef;
    @ViewChild('lineAndCircle', { static: false }) lineAndCircle: ElementRef;
    @ViewChild('activeLine', { static: false }) activeLine: ElementRef;
    @ViewChild('activeCircle', { static: false }) activeCircle: ElementRef;
    @ViewChild('warningCircle', { static: false }) warningCircle: ElementRef;
    @ViewChild('warningPolygon', { static: false }) warningPolygon: ElementRef;

    constructor(
        public widgetService: NewWidgetService,
        private renderer: Renderer2,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {}

    ngOnInit() {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe((data) => {
            this.title = data.title;
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngAfterViewInit() {
        if (this.svgContainerObservation && this.svgContainerObservation.nativeElement) {
            this.drawMinAndMax();
            this.drawCircle();
        }
    }

    drawMinAndMax() {
        const min = document.getElementById('minValue');
        const max = document.getElementById('maxValue');
        min.textContent = this.data.minValue.toString();
        max.textContent = this.data.maxValue.toString();
    }

    drawCircle() {
        let x1,
            y1,
            x2,
            y2 = '';
        if (this.data.values[0]) {
            x1 = this.diaEndsLine(-1, this.middleRadius).xCen;
            y1 = this.diaEndsLine(-1, this.middleRadius).yCen;
            x2 = this.diaEndsLine(0, this.radiusСalculation(this.data.values[0])).xCen;
            y2 = this.diaEndsLine(0, this.radiusСalculation(this.data.values[0])).yCen;
            this.drawLine(x1, y1, x2, y2);
        }
        this.scoreValues = this.data.values.length;
        this.data.values.forEach((item, i) => {
            const circle = this.renderer.createElement('circle', 'svg');
            x1 = this.diaEndsLine(i, this.radiusСalculation(item)).xCen;
            y1 = this.diaEndsLine(i, this.radiusСalculation(item)).yCen;

            if (this.data.values[i + 1]) {
                x2 = this.diaEndsLine(i + 1, this.radiusСalculation(this.data.values[i + 1])).xCen;
                y2 = this.diaEndsLine(i + 1, this.radiusСalculation(this.data.values[i + 1])).yCen;
            }
            this.renderer.setAttribute(circle, 'cx', x1);
            this.renderer.setAttribute(circle, 'cy', y1);
            this.renderer.setAttribute(circle, 'r', this.radPoint);
            this.renderer.setStyle(circle, 'fill', '#9ed7f5');
            this.renderer.appendChild(this.lineAndCircle.nativeElement, circle);
            if (item <= this.data.minValue || this.data.maxValue <= item) {
                this.drawWarningCircle(i, item, x1, y1);
            }
            this.drawLine(x1, y1, x2, y2);
        });
        this.drawLastCircle();
        this.drawEndLine();
        this.drawActiveCircle();
    }

    radiusСalculation(value: number): number {
        if (value < this.data.minValue) {
            return this.minRadius;
        }
        if (value > this.data.maxValue) {
            return this.maxRadius;
        }
        return (
            this.minRadius +
            ((value - this.data.minValue) * (this.maxRadius - this.minRadius)) /
                (this.data.maxValue - this.data.minValue)
        );
    }

    drawEndLine() {
        if (this.activeLine && this.activeLine.nativeElement) {
            let deg = 270 + (this.scoreValues * 11.25 - 6.4);
            this.renderer.setStyle(this.activeLine.nativeElement, 'transform', `rotate(${deg}deg)`);
        }
    }

    drawActiveCircle() {
        if (this.activeCircle && this.activeCircle.nativeElement) {
            let percent = 0;
            if (this.scoreValues && this.scoreValues !== 0) {
                percent = this.scoreValues * 3.125 - 1.5625;
            }
            const circumference = this.middleRadius * 2 * Math.PI;
            this.renderer.setStyle(
                this.activeCircle.nativeElement,
                'strokeDasharray',
                `${circumference} ${circumference}`
            );
            this.renderer.setStyle(
                this.activeCircle.nativeElement,
                'strokeDashoffset',
                `${circumference}`
            );
            const offset = circumference - (percent / 100) * circumference;
            this.renderer.setStyle(
                this.activeCircle.nativeElement,
                'strokeDashoffset',
                `${offset.toString()}`
            );
        }
    }

    drawWarningCircle(i, item, x1, y1) {
        if (this.warningCircle && this.warningCircle.nativeElement) {
            this.drawWarningPolygon(i);
            const x = x1 - 4.26;
            const y = y1 - 4.92;

            const gEl = this.renderer.createElement('g', 'svg');
            this.renderer.setStyle(gEl, 'display', 'block');
            this.renderer.setAttribute(gEl, 'transform', `translate(${x}, ${y})`);
            this.renderer.appendChild(this.warningCircle.nativeElement, gEl);

            const circle = this.renderer.createElement('circle', 'svg');
            this.renderer.setAttribute(circle, 'cx', '4.28');
            this.renderer.setAttribute(circle, 'cy', '4.94');
            this.renderer.setAttribute(circle, 'r', '1.69');
            this.renderer.setStyle(circle, 'fill', '#f4a321');
            this.renderer.appendChild(gEl, circle);

            const polygon = this.renderer.createElement('polygon', 'svg');
            this.renderer.setAttribute(
                polygon,
                'points',
                '4.28 0.41 6.24 3.81 8.21 7.21 4.28 7.21 0.35 7.21 2.31 3.81 4.28 0.41'
            );
            this.renderer.addClass(polygon, 'circle-warning');
            this.renderer.appendChild(gEl, polygon);
        }
    }

    drawWarningPolygon(i: number) {
        if (this.warningPolygon && this.warningPolygon.nativeElement) {
            let deg = (i + 1) * 11.242 + 315;
            const gEl = this.renderer.createElement('g', 'svg');
            this.renderer.setStyle(gEl, 'transform', `translate(0px, 0px) rotate(${deg}deg)`);
            this.renderer.setStyle(gEl, 'transform-origin', '89px 92.2px 0');
            this.renderer.appendChild(this.warningPolygon.nativeElement, gEl);

            // const circle = this.renderer.createElement('circle', 'svg');
            // this.renderer.setAttribute(circle, 'cx', '89.27');
            // this.renderer.setAttribute(circle, 'cy', '4.94');
            // this.renderer.setAttribute(circle, 'r', '1.69');
            // this.renderer.setStyle(circle, 'fill', '#f4a321');
            // this.renderer.appendChild(gEl, circle);

            const path = this.renderer.createElement('path', 'svg');
            this.renderer.setAttribute(
                path,
                'd',
                'M89.27,92.28l39.06-58.53a69.27,69.27,0,0,1,5.6,4.15q2.7,2.22,5.17,4.69Z'
            );
            this.renderer.setStyle(path, 'fill', '#f4a321');
            this.renderer.setStyle(path, 'opacity', '0.9');
            this.renderer.appendChild(gEl, path);
        }
        //     line.setAttribute('style', `transform: translate(834.21px, 486.66px) rotate(${data}deg);transform-origin: 84px 84px 0`);
        //     transform-origin: 89px 92.2px 0;
        // transform: translate(0px, 0px) rotate(157deg);
    }

    drawLine(x1, y1, x2, y2) {
        const line = this.renderer.createElement('line', 'svg');
        this.renderer.setAttribute(line, 'x1', x1);
        this.renderer.setAttribute(line, 'y1', y1);
        this.renderer.setAttribute(line, 'x2', x2);
        this.renderer.setAttribute(line, 'y2', y2);
        this.renderer.setAttribute(line, 'stroke', '#9ed7f5');
        this.renderer.setAttribute(line, 'stroke-width', '1.3');
        this.renderer.appendChild(this.lineAndCircle.nativeElement, line);
    }

    drawLastCircle() {
        if (this.lastCircle && this.lastCircle.nativeElement) {
            if (
                this.data.values.length &&
                this.data.values[this.data.values.length - 1] < this.data.maxValue &&
                this.data.values[this.data.values.length - 1] > this.data.minValue
            ) {
                const x = (
                    Number(
                        this.diaEndsLine(
                            this.data.values.length - 1,
                            this.radiusСalculation(this.data.values[this.data.values.length - 1])
                        ).xCen
                    ) - 10
                ).toString();
                const y = (
                    Number(
                        this.diaEndsLine(
                            this.data.values.length - 1,
                            this.radiusСalculation(this.data.values[this.data.values.length - 1])
                        ).yCen
                    ) - 10
                ).toString();
                this.renderer.setStyle(this.lastCircle.nativeElement, 'display', 'block');
                this.renderer.setAttribute(
                    this.lastCircle.nativeElement,
                    'transform',
                    `translate(${x}, ${y})`
                );
            }
        }
    }

    diaCounter(r: string): string {
        const c: number = 2 * Math.PI * +r;
        return 0.75 * c + ' ' + 0.25 * c;
    }

    diaEndsLine(el: number, rad: number) {
        let newPoint = 0;
        if (el === -1) {
            newPoint = 100;
        } else {
            newPoint = 100 + el * 6.25 + this.middleCell; // отсчет угла от 100%
        }
        const t = (Math.PI * newPoint) / 100 + Math.PI / 2;
        const r = +rad;
        const limitLine = {
            xCen: (r * Math.cos(t) + +this.centerX).toString(),
            yCen: (r * Math.sin(t) + +this.centerY).toString(),
        };
        return limitLine;
    }
}
