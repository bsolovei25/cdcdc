import { Component, Input, OnInit } from '@angular/core';
import { ISOUFlowIn, ISOUFlowOut, ISOUObjects } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-output',
  templateUrl: './sou-mvp-mnemonic-scheme-output.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-output.component.scss']
})
export class SouMvpMnemonicSchemeOutputComponent implements OnInit {
  @Input() set data(data: {
    sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[],
    code: number
  }) {
    if (data.sections) {
      this.flowData = this.mvpService.getElementByCode(data.sections, data.code) as ISOUObjects;
    }
  }

  flowData: ISOUObjects;
  status: boolean = true;

  constructor(public mvpService: SouMvpMnemonicSchemeService) { }

  ngOnInit(): void {
  }

}
