import { Component, OnInit, Input } from '@angular/core';
import { ISOUFlowIn, ISOUFlowOut } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-info',
  templateUrl: './sou-mvp-mnemonic-scheme-info.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-info.component.scss']
})
export class SouMvpMnemonicSchemeInfoComponent implements OnInit {
  @Input() set data(data: ISOUFlowOut) {
    this.flowData = data;
    this.outputEnable = data.dscFlow.length !== 1 ? true : data.dscFlow[0].isEnable;
  }
  @Input() choosenSetting: number;

  @Input() inCount: number = 1;
  @Input() outCount: number = 1;

  flowData: ISOUFlowOut;
  outputEnable: boolean = true;
  inputArr: number[] = new Array(this.inCount);
  outputArr: number[] = new Array(this.outCount);

  constructor() { }

  ngOnInit(): void {
  }

}
