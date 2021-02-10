import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { IQualityDocsRecord } from '../../quality-docs-panel.component';
import { IOilControlManualAdjEmitResponse } from '../../../oil-operations/components/oil-operations-adjustment/oil-operations-adjustment.component';

@Component({
    selector: 'evj-quality-docs-record',
    templateUrl: './quality-docs-record.component.html',
    styleUrls: ['./quality-docs-record.component.scss'],
})
export class QualityDocsRecordComponent implements OnInit, AfterViewInit {
    @Input() public data: IQualityDocsRecord;

    @Output() public emitBlockUnblock: EventEmitter<{ id: number; action: 'block' | 'unblock' }> = new EventEmitter<{
        id: number;
        action: 'block' | 'unblock';
    }>();

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.changeTooltip();
    }

    public blocked(idParam: number): void {
        this.data.isBlocked = !this.data.isBlocked;
        this.emitBlockUnblock.emit({
            id: idParam,
            action: this.data.isBlocked ? 'block' : 'unblock',
        });
        this.changeTooltip();
    }

    changeTooltip(): void {
        const tlink = document.getElementById('tooltipDocsRecord' + this.data.id);
        if (this.data.isBlocked) {
            tlink.dataset.tooltip = 'Разблокировать';
        } else {
            tlink.dataset.tooltip = 'Заблокировать';
        }
    }
}
