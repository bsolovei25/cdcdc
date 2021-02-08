import { Component, OnInit, Input } from '@angular/core';
import {
    ISOUFlowIn,
    ISOUFlowOut,
    ISOUObjects,
} from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-info',
    templateUrl: './sou-mvp-mnemonic-scheme-info.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-info.component.scss'],
})
export class SouMvpMnemonicSchemeInfoComponent implements OnInit {
    @Input() set data(data: { sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[]; code: number }) {
        if (data.sections) {
            this.flowData = this.mvpService.getElementByCode(data.sections, data.code) as ISOUFlowOut;
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

    flowData: ISOUFlowOut;
    sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[];
    outputEnable: boolean = true;
    inputArr: number[] = new Array(1);
    outputArr: number[] = new Array(1);

    constructor(public mvpService: SouMvpMnemonicSchemeService) {}

    ngOnInit(): void {}
}
