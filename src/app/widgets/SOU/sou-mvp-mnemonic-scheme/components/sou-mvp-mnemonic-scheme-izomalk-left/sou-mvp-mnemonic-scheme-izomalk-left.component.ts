import { Component, Input, OnInit } from '@angular/core';
import { ISOUFlowIn, ISOUFlowOut, ISOUObjects } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-izomalk-left',
  templateUrl: './sou-mvp-mnemonic-scheme-izomalk-left.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-izomalk-left.component.scss']
})
export class SouMvpMnemonicSchemeIzomalkLeftComponent implements OnInit {
  @Input() choosenSetting: number = 1;
  @Input() sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[] = [];
  @Input() flowIn: ISOUFlowIn[] = [];
  constructor(public mvpService: SouMvpMnemonicSchemeService) { }

  ngOnInit(): void {
  }

}
