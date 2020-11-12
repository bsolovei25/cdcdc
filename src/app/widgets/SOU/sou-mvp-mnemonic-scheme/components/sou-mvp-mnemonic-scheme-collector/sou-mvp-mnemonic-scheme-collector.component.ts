import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-collector',
  templateUrl: './sou-mvp-mnemonic-scheme-collector.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-collector.component.scss']
})
export class SouMvpMnemonicSchemeCollectorComponent implements OnInit {
  @Input() warningStatus: boolean = false;
  @Input() inCount: number = 1;
  @Input() outCount: number = 3;

  inputArr: number[] = new Array(this.inCount);
  outputArr: number[] = new Array(this.outCount);

  constructor() { }

  ngOnInit(): void {
  }

}
