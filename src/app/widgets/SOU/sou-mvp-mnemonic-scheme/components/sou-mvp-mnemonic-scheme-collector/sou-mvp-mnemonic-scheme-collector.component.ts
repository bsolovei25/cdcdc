import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-collector',
  templateUrl: './sou-mvp-mnemonic-scheme-collector.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-collector.component.scss']
})
export class SouMvpMnemonicSchemeCollectorComponent implements OnInit, OnChanges {
  @Input() warningStatus: boolean = false;
  @Input() inCount: number = 1;
  @Input() outCount: number = 3;

  inputArr: number[];
  outputArr: number[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.inputArr = new Array(this.inCount);
    this.outputArr = new Array(this.outCount);
  }

}
