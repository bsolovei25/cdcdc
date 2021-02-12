import { Component, Input, OnInit } from '@angular/core';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouObjects,
} from '../../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-section-izomalk',
    templateUrl: './sou-mvp-mnemonic-scheme-section-izomalk.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-section-izomalk.component.scss'],
})
export class SouMvpMnemonicSchemeSectionIzomalkComponent implements OnInit {
    @Input() sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[];
    @Input() choosenSetting: number;

    flowOutItem: ISouFlowOut;

    constructor() {}

    ngOnInit(): void {}
}
