import { Component, Input, OnInit } from '@angular/core';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouObjects,
} from '../../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-section-vb',
    templateUrl: './sou-mvp-mnemonic-scheme-section-vb.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-section-vb.component.scss'],
})
export class SouMvpMnemonicSchemeSectionVbComponent implements OnInit {
    @Input() set data(data: ISouFlowOut) {
        this.flowOutItem = data;
    }
    @Input() sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[];
    @Input() chosenSetting: number;

    flowOutItem: ISouFlowOut;
    constructor() {}

    ngOnInit(): void {}
}
