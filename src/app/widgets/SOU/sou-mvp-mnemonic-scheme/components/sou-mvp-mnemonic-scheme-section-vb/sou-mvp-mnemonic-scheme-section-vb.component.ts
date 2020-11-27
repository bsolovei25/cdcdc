import { Component, Input, OnInit } from '@angular/core';
import { ISOUFlowIn, ISOUFlowOut, ISOUObjects } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-section-vb',
  templateUrl: './sou-mvp-mnemonic-scheme-section-vb.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-section-vb.component.scss']
})
export class SouMvpMnemonicSchemeSectionVbComponent implements OnInit {
  @Input() set data(data: ISOUFlowOut) {
    this.flowOutItem = data;
  }
  @Input() sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[][];
  @Input() choosenSetting: number;

  flowOutItem: ISOUFlowOut;
  constructor() { }

  ngOnInit(): void {
  }

}
