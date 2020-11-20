import { Component, Input, OnInit } from '@angular/core';
import { ISOUFlowIn } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-ab-left',
  templateUrl: './sou-mvp-mnemonic-scheme-ab-left.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-ab-left.component.scss']
})
export class SouMvpMnemonicSchemeAbLeftComponent implements OnInit {
  @Input() choosenSetting: number = 1;
  @Input() sections: any[] = [];
  @Input() flowIn: ISOUFlowIn[] = [];
  constructor(public mvpService: SouMvpMnemonicSchemeService) { }

  ngOnInit(): void {
  }

}
