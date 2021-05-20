import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { AsyncRender } from '@shared/functions/async-render.function';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouObjects
} from '@dashboard/models/SOU/sou-operational-accounting-system.model';
import { SouMvpMnemonicSchemeService } from '@dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-circle-diagram',
    templateUrl: './sou-mvp-mnemonic-scheme-circle-diagram.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-circle-diagram.component.scss']
})
export class SouMvpMnemonicSchemeCircleDiagramComponent {
    @ViewChild('chart') chart: ElementRef;
    @Input() noConnection: false;

    @Input() set data(data: {
        sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[],
        code: number,
        disabled?: boolean,
        rightLineDashed?: boolean,
    }) {
        if (data.sections) {
            this.flowData = this.mvpService.getElementByCode(data.sections, data.code) as ISouFlowOut;
            this.code = data.code;
            this.disabled = data?.disabled;
            this.rightLineDashed = data?.rightLineDashed;
            if (!this.disabled) {
                this.drawSvg();
            }
        }
    }

    public flowData: ISouFlowOut;
    public code: number;
    public disabled: boolean = false;
    public rightLineDashed: boolean = false;

    public svg: any;

    constructor(public mvpService: SouMvpMnemonicSchemeService) {
    }

    @AsyncRender
    drawSvg(): void {
        const innerR = 16;
        const outerR = 17;

        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3.select(this.chart.nativeElement).append('svg').attr('width', '40px').attr('height', '40px');

        const arc = d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(0)
            .endAngle(
                typeof this.flowData?.tolerance === 'number' ? (2 * Math.PI * this.flowData?.tolerance) / 100 : 0
            );

        const arcBg = d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        const g: any = this.svg.append('g').style('transform', 'translate(20px, 20px)');

        g.append('path').attr('d', arcBg).attr('class', 'diagram-inner');

        g.append('path').attr('d', arc).attr('class', 'diagram-value');
    }
}
