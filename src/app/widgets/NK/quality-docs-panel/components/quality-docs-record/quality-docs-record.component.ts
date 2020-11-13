import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import { IQualityDocsRecord } from '../../quality-docs-panel.component';

@Component({
  selector: 'evj-quality-docs-record',
  templateUrl: './quality-docs-record.component.html',
  styleUrls: ['./quality-docs-record.component.scss']
})
export class QualityDocsRecordComponent implements OnInit, AfterViewInit {
  @Input() public data: IQualityDocsRecord;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.changeTooltip();
  }

  blocked(): void {
    this.data.isBlocked = !this.data.isBlocked;
    this.changeTooltip();
  }

  changeTooltip(): void {
    const tlink = document.getElementById('tooltipDocsRecord' + this.data.id);
    if (this.data.isBlocked) {
      tlink.dataset.tooltip = 'Разблокировать';
    } else {
      tlink.dataset.tooltip = 'Заблокировать';
    }
  }

}
