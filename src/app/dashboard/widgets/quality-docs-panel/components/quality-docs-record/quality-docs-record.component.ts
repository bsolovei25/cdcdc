import { Component, OnInit, Input } from '@angular/core';
import { IQualityDocsRecord } from '../../quality-docs-panel.component';
import { ItemSizeAverager } from '@angular/cdk-experimental/scrolling';

@Component({
  selector: 'evj-quality-docs-record',
  templateUrl: './quality-docs-record.component.html',
  styleUrls: ['./quality-docs-record.component.scss']
})
export class QualityDocsRecordComponent implements OnInit {
  @Input() public data: IQualityDocsRecord;

  constructor() { }

  ngOnInit(): void {
  }

  blocked(): void {
    this.data.blocked = !this.data.blocked;
  }

}
