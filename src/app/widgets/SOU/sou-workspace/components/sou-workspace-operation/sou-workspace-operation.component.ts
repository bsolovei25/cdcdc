import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'evj-sou-workspace-operation',
    templateUrl: './sou-workspace-operation.component.html',
    styleUrls: ['./sou-workspace-operation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SouWorkspaceOperationComponent implements OnInit {

    @Output() clickSmartTrend: EventEmitter<boolean> = new EventEmitter;

    constructor() {
    }

    ngOnInit(): void {
    }

    clickBtn(): void {
        this.clickSmartTrend.emit();
    }

}
