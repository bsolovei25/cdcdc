import { Component, OnInit, Input } from '@angular/core';
import { ISOUFlowIn, ISOUFlowOut } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';
import { SouPopupService } from '../../../../../dashboard/services/widgets/SOU/sou-popup.service';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-info',
  templateUrl: './sou-mvp-mnemonic-scheme-info.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-info.component.scss']
})
export class SouMvpMnemonicSchemeInfoComponent implements OnInit {
  @Input() set data(data: ISOUFlowOut) {
    this.flowData = data;
    this.outputEnable = true;
  }
  @Input() choosenSetting: number;

  @Input() set inCount(data: number) {
    this.inputArr = new Array(data)
  }
  @Input() set outCount(data: number) {
    this.outputArr = new Array(data)
  }

  flowData: ISOUFlowOut;
  outputEnable: boolean = true;
  inputArr: number[] = new Array(1);
  outputArr: number[] = new Array(1);

  constructor(public popupService: SouPopupService) {}

  ngOnInit(): void {
  }

}
