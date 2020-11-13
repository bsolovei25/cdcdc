import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-output',
  templateUrl: './sou-mvp-mnemonic-scheme-output.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-output.component.scss']
})
export class SouMvpMnemonicSchemeOutputComponent implements OnInit {
  @Input() title: string = '';
  @Input() status: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
