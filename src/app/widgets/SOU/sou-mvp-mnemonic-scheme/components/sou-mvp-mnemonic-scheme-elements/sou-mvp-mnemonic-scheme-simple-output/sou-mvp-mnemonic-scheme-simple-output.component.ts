import { Component, Input, OnInit } from '@angular/core';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouObjects,
} from '../../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';
import { SouMvpMnemonicSchemeService } from '../../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-simple-output',
    templateUrl: './sou-mvp-mnemonic-scheme-simple-output.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-simple-output.component.scss'],
})
export class SouMvpMnemonicSchemeSimpleOutputComponent implements OnInit {
    @Input() set data(data: { sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[]; code: number }) {
        if (data.sections) {
            this.flowData = this.mvpService.getElementByCode(data.sections, data.code) as ISouObjects;
        }
    }

    flowData: ISouObjects;

    constructor(public mvpService: SouMvpMnemonicSchemeService) {}

    ngOnInit(): void {}
}
