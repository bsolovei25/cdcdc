import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ISOUFlowIn, ISOUFlowOut, ISOUObjects } from '../../../../../dashboard/models/SOU/sou-operational-accounting-system';
import { SouMvpMnemonicSchemeService } from '../../../../../dashboard/services/widgets/SOU/sou-mvp-mnemonic-scheme.service';

@Component({
  selector: 'evj-sou-mvp-mnemonic-scheme-collector',
  templateUrl: './sou-mvp-mnemonic-scheme-collector.component.html',
  styleUrls: ['./sou-mvp-mnemonic-scheme-collector.component.scss']
})
export class SouMvpMnemonicSchemeCollectorComponent implements OnInit, OnChanges {
  @Input() set data(data: {
    sections: (ISOUFlowOut | ISOUFlowIn | ISOUObjects)[],
    code: number
  }) {
    if (data.sections) {
      this.flowData = this.mvpService.getElementByCode(data.sections, data.code) as ISOUObjects;
    }
  }
  @Input() inCount: number = 1;
  @Input() outCount: number = 3;

  inputArr: number[];
  outputArr: number[];

  flowData: ISOUObjects;

  constructor(public mvpService: SouMvpMnemonicSchemeService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.inputArr = new Array(this.inCount);
    this.outputArr = new Array(this.outCount);
  }

}
