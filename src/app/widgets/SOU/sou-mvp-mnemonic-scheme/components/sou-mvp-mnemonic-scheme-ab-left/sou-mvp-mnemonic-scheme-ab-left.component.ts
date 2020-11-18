import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-ab-left',
  templateUrl: './sou-mvp-mnemonic-scheme-ab-left.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-ab-left.component.scss']
})
export class SouMvpMnemonicSchemeAbLeftComponent implements OnInit {
  @Input() choosenSetting: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
