import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {
    ISouFlowIn,
    ISouFlowOut,
    ISouObjects,
} from '../../../../../../dashboard/models/SOU/sou-operational-accounting-system.model';
import { SouMvpMnemonicSchemeService } from '../../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

@Component({
    selector: 'evj-sou-mvp-mnemonic-scheme-vb-left',
    templateUrl: './sou-mvp-mnemonic-scheme-vb-left.component.html',
    styleUrls: ['./sou-mvp-mnemonic-scheme-vb-left.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SouMvpMnemonicSchemeVbLeftComponent implements OnInit {
    @Input() choosenSetting: number = 1;
    @Input() sections: (ISouFlowOut | ISouFlowIn | ISouObjects)[] = [];
    @Input() flowIn: ISouFlowIn[] = [];

    constructor(private mvpService: SouMvpMnemonicSchemeService) {}

    ngOnInit(): void {}

    public redirectMnemonic(metaFile: ISouFlowOut | ISouFlowIn | ISouObjects): void {
        const linkId = metaFile.linkId;
        this.mvpService.redirectMnemonic(linkId);
    }

    public get inputOne(): ISouObjects {
        return this.mvpService.getElementByCode(this.sections, 152) as ISouObjects;
    }

    public get inputTwo(): ISouObjects {
        return this.mvpService.getElementByCode(this.sections, 158) as ISouObjects;
    }
}
