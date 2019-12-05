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

    private x: number = 175;
    private y: number = 40;

    static itemCols = 18;
    static itemRows = 14;

    @Input() public data = {
        name: 'Hello',
        nonCritical: 0,
        critical: 100,
        diagnostics: 100,
        prognosis: 0
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
        if (!this.isMock) {
            console.log(this.isMock, "----------------------------");

            this.d3Circle(this.data, this.myCircle.nativeElement);
        }

    }

    ngOnDestroy() {

    }

    public d3Circle(data, el): void {
        const summ = data.critical + data.nonCritical + data.diagnostics + data.critical;
        const mass = [data.nonCritical, data.critical, data.diagnostics, data.prognosis];
        let color: any;

        if (summ === 0) {
            color = d3.scaleOrdinal().range(["gray"]);
        } else {
            color = d3.scaleOrdinal().range(["white", "orange", "var(--color-border-active)", "var(--color-circle)"]);
        }

        const canvas = d3.select(el).append("svg")
            .attr("min-width", "200px")
            .attr("viewBox", "35 0 230 150");

        let group = canvas.append("g")
            .attr("transform", "translate(102 ,88)");

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

        let nonCriticall = canvas.append("text")
            .attr("font-size", "8px")
            .attr("x", this.x)
            .attr("y", this.y)
            .attr("fill", "orange")
            .text("Не квитировано", data.nonCriticall);

        let nonCriticall_num = canvas.append("text")
            .attr("font-size", "10px")
            .attr("x", this.x)
            .attr("y", this.y + 14)
            .attr("fill", (!data.nonCritical) ? 'gray' : "orange")
            .text(data.nonCritical);

        let сritical = canvas.append("text")
            .attr("font-size", "8px")
            .attr("x", this.x)
            .attr("y", this.y + 14 * 2)
            .attr("fill", "white")
            .text("Квитировано", data.сritical);

        let сritical_num = canvas.append("text")
            .attr("font-size", "10px")
            .attr("x", this.x)
            .attr("y", this.y + 14 * 3)
            .attr("fill", (!data.critical) ? 'gray' : "white")
            .text(data.critical);

        let diagnostic = canvas.append("text")
            .attr("font-size", "8px")
            .attr("x", this.x)
            .attr("y", this.y + 14 * 4)
            .attr("fill", "var(--color-border-active)")
            .text("Диагностика", data.сritical);

        let diagnostic_num = canvas.append("text")
            .attr("font-size", "10px")
            .attr("x", this.x)
            .attr("y", this.y + 14 * 5)
            .attr("fill", (!data.diagnostics) ? 'gray' : "var(--color-border-active)")
            .text(data.diagnostics);

        let prognosis = canvas.append("text")
            .attr("font-size", "8px")
            .attr("x", this.x)
            .attr("y", this.y + 14 * 6)
            .attr("fill", "var(--color-circle)")
            .text("Прогноз", data.prognosis);

        let prognosis_num = canvas.append("text")
            .attr("font-size", "10px")
            .attr("x", this.x)
            .attr("y", this.y + 14 * 7)
            .attr("fill", (!data.prognosis) ? 'gray' : "var(--color-circle)")
            .text(data.prognosis);

        let pie_back = canvas.append("image")
            .attr("xlink:href", !data.nonCritical ? "./assets/pic/circle-diagram-grey.svg" : "./assets/pic/circle-diagram-orange.svg")
            .attr("height", "189px")
            .attr("width", "110px")
            .attr("x", "47")
            .attr("y", "-7");

    }
}

