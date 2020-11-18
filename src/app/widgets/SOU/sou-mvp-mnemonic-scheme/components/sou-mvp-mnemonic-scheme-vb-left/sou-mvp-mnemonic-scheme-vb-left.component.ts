import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-vb-left',
  templateUrl: './sou-mvp-mnemonic-scheme-vb-left.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-vb-left.component.scss']
})
export class SouMvpMnemonicSchemeVbLeftComponent implements OnInit {
  @Input() choosenSetting: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
