import { Component, OnInit, Input } from '@angular/core';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouObjects,
} from '../../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';
import { SouMvpMnemonicSchemeService } from '../../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-info',
    templateUrl: './sou-mvp-mnemonic-scheme-info.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-info.component.scss'],
})
export class SouMvpMnemonicSchemeInfoComponent implements OnInit {
    @Input() set data(data: { sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[]; code: number }) {
        if (data.sections) {
            this.flowData = this.mvpService.getElementByCode(data.sections, data.code) as ISouFlowOut;
            this.sections = data.sections;
        }
    }
    @Input() choosenSetting: number;
    @Input() noLine: boolean = false;

    @Input() set inCount(data: number) {
        this.inputArr = new Array(data);
    }
    @Input() set outCount(data: number) {
        this.outputArr = new Array(data);
    }

    flowData: ISouFlowOut;
    sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[];
    outputEnable: boolean = true;
    inputArr: number[] = new Array(1);
    outputArr: number[] = new Array(1);

    constructor(public mvpService: SouMvpMnemonicSchemeService) {}

    ngOnInit(): void {}

    elementClick(sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[], code: number): void {
        this.mvpService.openPopup(sections, code);
        const link = this.mvpService.getElementByCode(sections, code)?.linkId;
        this.mvpService.redirectMnemonic(link);
    }
}
