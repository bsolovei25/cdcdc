import { Component, Input, OnInit } from '@angular/core';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouObjects,
} from '../../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';
import { SouMvpMnemonicSchemeService } from '../../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-output',
    templateUrl: './sou-mvp-mnemonic-scheme-output.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-output.component.scss'],
})
export class SouMvpMnemonicSchemeOutputComponent implements OnInit {
    @Input() set data(data: { sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[]; code: number }) {
        if (data.sections) {
            this.flowData = this.mvpService.getElementByCode(data.sections, data.code) as ISouObjects;
        }
    }

    flowData: ISouObjects;
    status: boolean = true;

    constructor(public mvpService: SouMvpMnemonicSchemeService) {}

    ngOnInit(): void {}
}
