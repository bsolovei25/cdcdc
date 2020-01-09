import { Component, Inject, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, Input } from "@angular/core";
import { Subscription } from 'rxjs';
import { NewWidgetService } from '../../services/new-widget.service';


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
    scoreValues = 33;
    value: number = 1;
    radius = 60;

    public title = '';
    private subscription: Subscription;

    @ViewChild('svgContainerObservation', { static: false }) svgContainerObservation: ElementRef;

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
        this.drawCircle();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngAfterViewInit() {
        if (this.svgContainerObservation && this.svgContainerObservation.nativeElement) {
            for (let i = 1; i < this.scoreValues; i++) {
                const circle = this.renderer.createElement('circle', 'svg');
                this.renderer.setAttribute(circle, 'cx', this.diaEndsLine(i, this.radius).xCen);
                this.renderer.setAttribute(circle, 'cy', this.diaEndsLine(i, this.radius).yCen);
                this.renderer.setAttribute(circle, 'r', this.radPoint);
                this.renderer.setStyle(circle, 'fill', '#9ed7f5');
                this.renderer.appendChild(this.svgContainerObservation.nativeElement, circle);
            }
        }
    }

    drawCircle() {

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
            newPoint = 100 + (el * 6.2) - this.middleCell; // отсчет угла от 100%
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