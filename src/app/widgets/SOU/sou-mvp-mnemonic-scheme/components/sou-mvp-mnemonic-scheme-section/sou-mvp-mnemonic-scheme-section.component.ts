import { Component, Input, OnInit } from '@angular/core';
import { ISOUFlowIn, ISOUFlowOut, ISOUObjects } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-section',
  templateUrl: './sou-mvp-mnemonic-scheme-section.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-section.component.scss']
})
export class SouMvpMnemonicSchemeSectionComponent implements OnInit {
  @Input() sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[];
  @Input() choosenSetting: number;

  flowOutItem: ISOUFlowOut;
  constructor() { }

  ngOnInit(): void {
  }

}
