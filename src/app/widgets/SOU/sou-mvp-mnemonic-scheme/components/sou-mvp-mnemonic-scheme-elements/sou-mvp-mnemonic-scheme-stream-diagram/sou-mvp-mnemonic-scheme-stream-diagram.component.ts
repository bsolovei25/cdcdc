import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { AsyncRender } from '@shared/functions/async-render.function';
import { ISouFlowIn, ISouFlowOut, ISouObjects } from '@dashboard/models/SOU/sou-operational-accounting-system.model';
import { SouMvpMnemonicSchemeService } from '@dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-stream-diagram',
    templateUrl: './sou-mvp-mnemonic-scheme-stream-diagram.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-stream-diagram.component.scss'],
})
export class SouMvpMnemonicSchemeStreamDiagramComponent {
    @ViewChild('chart') chart: ElementRef;
    @Input() set data(data: { sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[]; code: number, disabledCircle?: boolean }) {
        if (data.sections) {
            this.sections = data.sections;
            this.flowData = this.mvpService.getElementByCode(data.sections, data.code) as ISouFlowOut;
            this.code = data.code
            this.disabledCircle = data.disabledCircle;
            this.drawSvg();
        }
    }
    @Input() noPoint: boolean = false;
    @Input() choosenSetting: number;

    flowData: ISouFlowOut;
    sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[];
    disabledCircle: boolean = false;

    public svg: any;
    public code: number;

    constructor(public mvpService: SouMvpMnemonicSchemeService) {}

    @AsyncRender
    drawSvg(): void {
        const innerR = 7;
        const outerR = 8;

        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3
            .select(this.chart?.nativeElement)
            .append('svg')
            .attr('width', '22px')
            .attr('height', '22px');

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

        const g: any = this.svg.append('g').style('transform', 'translate(11px, 11px)');

        g.append('path').attr('d', arcBg).attr('class', 'diagram-inner');

        g.append('path').attr('d', arc).attr('class', 'diagram-value');
    }

    elementClick(sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[], code: number): void {
        this.mvpService.openPopup(sections, code);
        const link = this.mvpService.getElementByCode(sections, code)?.linkId;
        this.mvpService.redirectMnemonic(link);
    }
}
