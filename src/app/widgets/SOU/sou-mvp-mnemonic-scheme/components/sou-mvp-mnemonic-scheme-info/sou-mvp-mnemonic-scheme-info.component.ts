import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-info',
  templateUrl: './sou-mvp-mnemonic-scheme-info.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-info.component.scss']
})
export class SouMvpMnemonicSchemeInfoComponent implements OnInit {
  @Input() title: string = '';
  @Input() weight: number = 0;
  @Input() inCount: number = 1;
  @Input() outCount: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
