import { Component, Input, OnInit } from '@angular/core';
import { ISOUFlowIn, ISOUFlowOut, ISOUObjects } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-vb-left',
  templateUrl: './sou-mvp-mnemonic-scheme-vb-left.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-vb-left.component.scss']
})
export class SouMvpMnemonicSchemeVbLeftComponent implements OnInit {
  @Input() choosenSetting: number = 1;
  @Input() sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[] = [];
  @Input() flowIn: ISOUFlowIn[] = [];

  constructor(public mvpService: SouMvpMnemonicSchemeService) { }

  ngOnInit(): void {
  }

}
