import { Component, Input, OnInit } from '@angular/core';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouObjects,
} from '../../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-section',
    templateUrl: './sou-mvp-mnemonic-scheme-section.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-section.component.scss'],
})
export class SouMvpMnemonicSchemeSectionComponent implements OnInit {
    @Input() sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[];
    @Input() choosenSetting: number;

    flowOutItem: ISouFlowOut;
    constructor() {}

    ngOnInit(): void {}
}
