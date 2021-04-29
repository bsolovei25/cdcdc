import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';

import * as d3Selection from 'd3-selection';
import * as d3 from 'd3';

import { IFillArcData } from './cmid-close-reason-operational-chart.interface';

@Component({
    selector: 'cmid-close-reason-operational-chart',
    templateUrl: './cmid-close-reason-operational-chart.component.html',
    styleUrls: ['./cmid-close-reason-operational-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmidCloseReasonOperationalChartComponent {
    @ViewChild('chart', { static: true }) private chart: ElementRef;

    @Input() public operativeValue: number;

    private svgBody;

    public ngAfterViewInit(): void {
        this.drawChart();
    }

    private drawChart(): void {
        this.svgBody = d3Selection.select(this.chart.nativeElement).append('svg');
        this.svgBody.attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', '0 0 400 200');

        this.appendBackgroundArc();
        this.appendFillArc();
        this.appendPerformanceArc();
        this.appendDeviationArc();
        this.appendText();
    }

    private appendBackgroundArc(): void {
        const arcGenerator = d3.arc();
        const pathData = arcGenerator({
            startAngle: 2 * Math.PI + Math.PI / 2,
            endAngle: 3 * Math.PI / 2,
            innerRadius: 85,
            outerRadius: 100
        });

        this.svgBody.append('g').attr('class', 'background-arc');

        this.svgBody
            .select('.background-arc')
            .append('path')
            .attr('d', pathData);
    }

    private appendFillArc(): void {
        const arcGenerator = d3.arc()
            .innerRadius(85.5)
            .outerRadius(99)
            .padAngle(0.02);
        
        const amountToFillArc = 63;
        const arcData = this.fillArc(amountToFillArc);

        this.svgBody.append('g').attr('class', 'fill-arc');

        this.svgBody
            .select('.fill-arc')
            .selectAll('path')
            .data(arcData)
            .enter()
            .append('path')
            .attr('d', arcGenerator);
    }

    private fillArc(fillQuantity: number): IFillArcData[] {
        const fillArcData = [];
        let separateAngle = 0;

        for (let i = 0; i < fillQuantity; i++) {
            fillArcData.push({
                startAngle: (-Math.PI) / 2 + separateAngle,
                endAngle: (-Math.PI) / 2 + separateAngle + 0.05
            });

            separateAngle += 0.05;
        }
        return fillArcData;
    }

    private appendDeviationArc(): void {
        const arcGenerator = d3.arc();

        const pathData = arcGenerator({
            startAngle: 2 * Math.PI + Math.PI / 2,
            endAngle: (3 * Math.PI / 2) + (this.operativeValue * Math.PI / 100),
            innerRadius: 85,
            outerRadius: 100
        });

        this.svgBody.append('g').attr('class', 'deviation-arc');

        this.svgBody
            .select('.deviation-arc')
            .append('path')
            .attr('d', pathData);
    }

    private appendPerformanceArc(): void {
        const arcGenerator = d3.arc();

        const criticalPathData = arcGenerator({
            startAngle: 3 * Math.PI / 2,
            endAngle: 7.2,
            innerRadius: 78,
            outerRadius: 80
        });
        const warningPathData = arcGenerator({
            startAngle: 7.2,
            endAngle: 7.65,
            innerRadius: 78,
            outerRadius: 80
        });
        const finePathData = arcGenerator({
            startAngle: 7.65,
            endAngle: 2 * Math.PI + Math.PI / 2,
            innerRadius: 78,
            outerRadius: 80
        });

        this.svgBody.append('g').attr('class', 'performance-arc');

        this.svgBody
            .select('.performance-arc')
            .append('path')
            .attr('d', criticalPathData)
            .attr('class', 'performance-arc_critical');

        this.svgBody
            .select('.performance-arc')
            .append('path')
            .attr('d', warningPathData)
            .attr('class', 'performance-arc_warning');

        this.svgBody
            .select('.performance-arc')
            .append('path')
            .attr('d', finePathData)
            .attr('class', 'performance-arc_fine');
    }

    private appendText(): void {
        this.svgBody.append('text')
            .attr('class', 'vpr-label')
            .attr('text-anchor', 'middle')
            .text('%');

        this.svgBody.append('text')
            .attr('class', 'vpr-value')
            .attr('text-anchor', 'middle')
            .text(this.operativeValue);

        this.svgBody.append('text')
            .attr('class', 'percent-value percent-value_min')
            .attr('text-anchor', 'start')
            .text('0');

        this.svgBody.append('text')
            .attr('class', 'percent-value percent-value_max')
            .attr('text-anchor', 'end')
            .text('100');
    }
}
