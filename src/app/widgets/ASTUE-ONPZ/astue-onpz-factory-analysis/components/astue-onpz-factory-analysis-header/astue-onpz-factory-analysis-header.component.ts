import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AstueOnpzMnemonicFurnaceService } from '../../../astue-onpz-mnemonic-furnace/astue-onpz-mnemonic-furnace.service';

@Component({
    selector: 'evj-astue-onpz-factory-analysis-header',
    templateUrl: './astue-onpz-factory-analysis-header.component.html',
    styleUrls: ['./astue-onpz-factory-analysis-header.component.scss'],
})
export class AstueOnpzFactoryAnalysisHeaderComponent implements OnInit, OnChanges {
    @Input() page: 'bar' | 'chart' = null;
    @Input() reference: { id: string; name: string }[] = [];
    @Output() changePage: EventEmitter<'bar' | 'chart'> = new EventEmitter<'bar' | 'chart'>();

    constructor(public mnemonicFurnaceService: AstueOnpzMnemonicFurnaceService) {}

    ngOnInit(): void {}

    ngOnChanges(): void {}

    selectionChange(e: string): void {
        this.mnemonicFurnaceService.selectedItem$.next(e);
    }
}
