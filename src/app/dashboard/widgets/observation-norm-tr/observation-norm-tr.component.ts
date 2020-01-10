import { Component, Inject, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, Input } from "@angular/core";
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';
interface IObservationNormTR {
    minValue: number,
    maxValue: number,
    values: number[]
}
@Component({
    selector: 'evj-observation-norm-tr',
    templateUrl: './observation-norm-tr.component.html',
    styleUrls: ['./observation-norm-tr.component.scss']
})
export class ObservationNormTRComponent implements OnInit, OnDestroy {

    static itemCols = 15;
    static itemRows = 10;

    circleRadius: string = (35).toString();
    minRadius: string = (47).toString();
    maxRadius: string = (75).toString();
    radPoint = "1.69";
    centerX = "89.27";
    centerY = "92.28";
    middleCell = 3;
    scoreValues = 20;
    data: IObservationNormTR = {
        minValue: 95,
        maxValue: 100,
        values: [94, 93, 95, 96, 97, 95, 96, 94, 93, 95, 96, 97, 95, 96]
        // values: [94, 93, 95,]
    }

    radius = 60;

    public title = '';
    private subscription: Subscription;

    @ViewChild('svgContainerObservation', { static: false }) svgContainerObservation: ElementRef;
    @ViewChild('lastCircle', { static: false }) lastCircle: ElementRef;
    @ViewChild('lineAndCircle', { static: false }) lineAndCircle: ElementRef;

    constructor(
        public widgetService: NewWidgetService,
        private renderer: Renderer2,
        @Inject("isMock") public isMock: boolean,
        @Inject("widgetId") public id: string,
        @Inject("uniqId") public uniqId: string
    ) {
    }

    ngOnInit() {
        this.subscription = this.widgetService.getWidgetChannel(this.id).subscribe(data => {
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
        let x1, y1, x2, y2 = '';
        this.data.values.forEach((item, i) => {
            const circle = this.renderer.createElement('circle', 'svg');
            x1 = this.diaEndsLine(i, this.radius).xCen;
            y1 = this.diaEndsLine(i, this.radius).yCen;
            x2 = this.diaEndsLine(i + 1, this.radius).xCen;
            y2 = this.diaEndsLine(i + 1, this.radius).yCen;

            this.renderer.setAttribute(circle, 'cx', x1);
            this.renderer.setAttribute(circle, 'cy', y1);
            this.renderer.setAttribute(circle, 'r', this.radPoint);
            this.renderer.setStyle(circle, 'fill', '#9ed7f5');
            this.renderer.appendChild(this.lineAndCircle.nativeElement, circle);
            this.drawLine(x1, y1, x2, y2);
            this.drawLastCircle();
        })
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

        var circle2 = document.getElementById('loadCircle');
        var radius = 60;
        var circumference = radius * 2 * Math.PI;

        circle2.style.strokeDasharray = `${circumference} ${circumference}`;
        circle2.style.strokeDashoffset = `${circumference}`;

        function setProgress(percent) {
            const offset = circumference - percent / 100 * circumference;
            circle2.style.strokeDashoffset = offset.toString();
        }
        setProgress(42);
    }

    drawLastCircle() {
        if (this.lastCircle && this.lastCircle.nativeElement) {
            const x = (Number(this.diaEndsLine(this.data.values.length, this.radius).xCen) - 10).toString();
            const y = (Number(this.diaEndsLine(this.data.values.length, this.radius).yCen) - 10).toString();
            this.renderer.setStyle(this.lastCircle.nativeElement, 'display', 'block');
            this.renderer.setAttribute(this.lastCircle.nativeElement, 'transform', `translate(${x}, ${y})`);

        }
    }



    diaCounter(r: string): string {
        const c: number = 2 * Math.PI * +r;
        return 0.75 * c + " " + 0.25 * c;
    }

    diaEndsLine(el: number, rad: number) {
        let newPoint = 0;
        if (el === 0) {
            newPoint = 100;
        } else {
            newPoint = 100 + (el * 6.25) - this.middleCell; // отсчет угла от 100%
        }
        const t = (Math.PI * newPoint) / 100 + Math.PI / 2;
        const r = +rad;
        const limitLine = {
            xCen: (r * Math.cos(t) + +this.centerX).toString(),
            yCen: (r * Math.sin(t) + +this.centerY).toString()
        };
        return limitLine;
    }




}