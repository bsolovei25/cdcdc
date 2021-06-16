import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { AsyncRender } from '@shared/functions/async-render.function';
import * as d3 from 'd3';
import { FileAttachMenuService } from '@dashboard/services/file-attach-menu.service';

@Component({
  selector: 'evj-kpe-accuracy-timelines-data-loading-file',
  templateUrl: './kpe-accuracy-timelines-data-loading-file.component.html',
  styleUrls: ['./kpe-accuracy-timelines-data-loading-file.component.scss'],
})
export class KpeAccuracyTimelinesDataLoadingFileComponent implements OnInit, OnChanges {
    @Input() file: any;
    @Input() uploadingPercent: number;
    @Input() fileIndex: number;

    @Output() fileIndexToDelete: EventEmitter<number> = new EventEmitter();
    @Output() isFullyUploaded: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('chart') chart: ElementRef;

    public svg: any;

    @AsyncRender
    drawSvg(): void {
        const innerR = 7;
        const outerR = 8;

        if (this.svg) {
            this.svg.remove();
        }

        this.svg = d3.select(this.chart.nativeElement).append('svg').attr('width', '16px').attr('height', '16px');

        const arc = d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(0)
            .endAngle((2 * Math.PI * this.uploadingPercent) / 100);

        const arcBg = d3
            .arc()
            .innerRadius(innerR)
            .outerRadius(outerR)
            .startAngle(0)
            .endAngle(2 * Math.PI);

        const g: any = this.svg
            .append('g')
            .attr('width', '16px')
            .attr('height', '16px')
            .style('transform', 'translate(8px, 8px)');

        g.append('path').attr('d', arc).style('fill', 'var(--color-kpe-gaude-active');
    }
    constructor(
        private fileAttachService: FileAttachMenuService,
    ) {}

    get fileType(): string {
        return this.file?.name?.split('.').pop();
    }

    get fileSize(): string {
        return this.fileAttachService.convertBytes(this.file?.size);
    }

    ngOnInit(): void {}

    ngOnChanges(): void {
        if (this.uploadingPercent === 100) {
            this.isFullyUploaded.emit(true);
        }
        this.drawSvg();
    }

    public deleteFile(): void {
        this.fileIndexToDelete.emit(this.fileIndex);
    }
}
