import { Component, Input, OnInit } from '@angular/core';
import {
    ISOUFlowIn,
    ISOUFlowOut,
    ISOUObjects,
} from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-simple-output',
    templateUrl: './sou-mvp-mnemonic-scheme-simple-output.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-simple-output.component.scss'],
})
export class SouMvpMnemonicSchemeSimpleOutputComponent implements OnInit {
    @Input() set data(data: {
        sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[];
        code: number;
    }) {
        if (data.sections) {
            this.flowData = this.mvpService.getElementByCode(
                data.sections,
                data.code
            ) as ISOUObjects;
        }
    }

    flowData: ISOUObjects;

    constructor(public mvpService: SouMvpMnemonicSchemeService) {}

    ngOnInit(): void {}
}
