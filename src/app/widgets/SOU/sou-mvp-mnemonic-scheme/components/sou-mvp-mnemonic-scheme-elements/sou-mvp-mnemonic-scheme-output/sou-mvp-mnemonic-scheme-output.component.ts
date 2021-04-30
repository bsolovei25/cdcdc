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
    @Input() set data(data: { sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[]; code: number, lineDashed?: boolean }) {
        if (data.sections) {
            this.flowData = this.mvpService.getElementByCode(data.sections, data.code) as ISouObjects;
            this.lineDashed = data?.lineDashed;
        }
    }

    flowData: ISouObjects;
    status: boolean = true;
    lineDashed: boolean = false;

    constructor(public mvpService: SouMvpMnemonicSchemeService) {}

    ngOnInit(): void {}
}
