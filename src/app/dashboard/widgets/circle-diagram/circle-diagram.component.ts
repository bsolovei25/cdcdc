import {
    Component,
    OnDestroy,
    OnInit,
    Inject,
    ElementRef,
    ViewChild,
    Input
} from '@angular/core';

import { NewWidgetService } from '../../services/new-widget.service';

declare var d3: any;

@Component({
    selector: 'evj-circle-diagram',
    templateUrl: './circle-diagram.component.html',
    styleUrls: ['./circle-diagram.component.scss']
})
export class CircleDiagramComponent implements OnInit, OnDestroy {

    public title = "Круговая Диаграмма";

    static itemCols = 30;
    static itemRows = 12;

    @Input() public data = {
        name: 'Hello',
        critical: 213,
        nonCritical: 100,
    };

    public readonly RADIUS = 40;


    @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

    constructor(
        public widgetService: NewWidgetService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string
    ) {

    }

    ngOnInit() {
        this.d3Circle(this.data, this.myCircle.nativeElement);
    }

    ngOnDestroy() {

    }

    public d3Circle(data, el): void {
        const summ = data.critical + data.nonCritical + 50 + 70;
        const mass = [data.nonCritical, data.critical, 50, 70];
        let color: any;

        if (summ === 0) {
            color = d3.scaleOrdinal().range(["gray"]);
        } else {
            color = d3.scaleOrdinal().range(["white", "orange", "var(--color-border-active)", "var(--color-circle)"]);
        }

        const canvas = d3.select(el).append("svg")
            .attr("min-width", "200px")
            .attr("viewBox", "0 -10 200 200");

        let group = canvas.append("g")
            .attr("transform", "translate(102 ,88)");
        // .attr("viewBox", "0 20 280 200");

        const arc = d3.arc().innerRadius(43).outerRadius(this.RADIUS);

        const pie = d3.pie().value((d) => {
            return d;
        }).sort(() => null);

        const arcs = group.selectAll(".arc").data(pie(mass)).enter().append("g").attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("stroke", "black")
            .attr("fill", (d) => color(d.index));

        group = group.append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "2em")
            .attr("fill", (!data.nonCritical && !data.critical) ? 'gray' : "white")
            .attr("dominant-baseline", "middle")
            .text(summ);

        let positive = canvas.append("text")
            .attr("font-size", "8px")
            .attr("x", "100")
            .attr("y", "155")
            .attr("fill", "rgb(97,101,128)")
            .text("Не критичные", data.nonCriticall);

        let positive_num = canvas.append("text")
            .attr("font-size", "12px")
            .attr("x", "125")
            .attr("y", "172")
            .attr("fill", (!data.nonCritical && !data.critical) ? 'gray' : "white")
            .text(data.nonCritical);

        let negative = canvas.append("text")
            .attr("font-size", "8px")
            .attr("x", "50")
            .attr("y", "155")
            .attr("fill", "rgb(97,101,128)")
            .text("Критичные /", data.critical);

        let negative_num = canvas.append("text")
            .attr("font-size", "12px")
            .attr("x", "70")
            .attr("y", "172")
            .attr("fill", (!data.nonCritical && !data.critical) ? 'gray' : "orange")
            .text(data.critical);

        let pie_back = canvas.append("image")
            .attr("xlink:href", "./assets/pic/circle-diagram.svg")
            .attr("height", "189px")
            .attr("width", "110px")
            .attr("fill", "white")
            .attr("x", "47")
            .attr("y", "-7");

    }
}

