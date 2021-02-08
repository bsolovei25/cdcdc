import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { PieWidget } from 'src/app/dashboard/models/widget.model';

declare var d3: any;

@Component({
    selector: 'evj-truncated-diagram-percentage-item',
    templateUrl: './truncated-diagram-percentage-item.component.html',
    styleUrls: ['./truncated-diagram-percentage-item.component.scss'],
})
export class TruncatedDiagramPercentageItemComponent implements OnInit {
    public RADIUS: number;

    public arrayWord: any = [];
    public text1: string;
    public text2: string;
    public text3: string;
    public space: string = ' ';

    @Input() public data: PieWidget;

    @ViewChild('myCircle', { static: true }) myCircle: ElementRef;

    constructor() {}

    ngOnInit(): void {
        this.d3Circle(this.data, this.myCircle.nativeElement);
    }

    private d3Circle(data, el): void {
        this.splitWord(data.name, this.space);

        const summ = data.planValue - data.value;
        const mass = [data.value + 35, data.planValue - data.value];
        let color: any;

        const canvas = d3
            .select(el)
            .append('svg')
            .attr('min-width', '200px')
            .attr('max-width', '500px')
            .attr('viewBox', '32 20 160 170');

        let group = canvas.append('g').attr('transform', 'translate(100 ,100)');

        if (summ === 0) {
            color = d3.scaleOrdinal().range(['rgb(162, 226, 255)', 'rgb(162, 226, 255)']);
            this.RADIUS = 47;
        } else {
            color = d3.scaleOrdinal().range(['white', 'orange']);
            this.RADIUS = 50;
        }

        const arc = d3
            .arc()
            .innerRadius(41)
            .outerRadius(this.RADIUS);

        const pie = d3
            .pie()
            .value((d) => {
                return d;
            })
            .sort(() => null);

        const arcs = group
            .selectAll('.arc')
            .data(pie(mass))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)

            .attr('fill', (d) => color(d.index));

        group = group
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '22px')
            .attr('fill', data.planValue === 100 ? 'white' : 'orange')
            .attr('dominant-baseline', 'middle')
            .text(data.value);

        let pie_back = canvas
            .append('image')
            .attr('xlink:href', 'assets/pic/test2.svg')
            .attr('height', '185px')
            .attr('width', '200px')
            .attr('x', '0')
            .attr('fill', 'rgb(27, 30, 39)')
            .attr('y', '5');

        let positive = canvas
            .append('text')
            .attr('font-size', '8px')
            .attr('x', '90')
            .attr('y', '134')
            .attr('z-index', '100')
            .attr('fill', 'rgb(162, 226, 255)')
            .text('100%');

        if (this.text3) {
            canvas
                .append('text')
                .attr('fill', data.value === 100 ? 'rgb(140,153,178)' : 'orange')
                .attr('font-size', '12px')
                .attr('x', '45')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('y', '160')
                .text(this.text1);

            canvas
                .append('text')
                .attr('fill', data.value === 100 ? 'rgb(140,153,178)' : 'orange')
                .attr('font-size', '12px')
                .attr('x', '115')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('y', '160')
                .text(this.text2);

            canvas
                .append('text')
                .attr('fill', data.value === 100 ? 'rgb(140,153,178)' : 'orange')
                .attr('font-size', '12px')
                .attr('x', '75')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('y', '175')
                .text(this.text3);
        } else if (data.name.length < 15) {
            canvas
                .append('text')
                .attr('fill', data.value === 100 ? 'rgb(140,153,178)' : 'orange')
                .attr('font-size', '12px')
                .attr('x', '60')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('y', '160')
                .text(data.name);
        } else {
            canvas
                .append('text')
                .attr('fill', data.value === 100 ? 'rgb(140,153,178)' : 'orange')
                .attr('font-size', '12px')
                .attr('x', '47')
                .attr('font-family', "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;")
                .attr('y', '160')
                .text(data.name);
        }
    }

    public splitWord(word, space): void {
        this.arrayWord = word.split(space);
        this.text1 = this.arrayWord[0];
        this.text2 = this.arrayWord[1];
        this.text3 = this.arrayWord[2];
    }
}
