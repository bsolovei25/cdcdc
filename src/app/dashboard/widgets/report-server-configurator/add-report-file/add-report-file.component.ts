import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'evj-add-report-file',
  templateUrl: './add-report-file.component.html',
  styleUrls: ['./add-report-file.component.scss']
})
export class AddReportFileComponent implements OnInit {

  constructor() { }

  public data;

  public clickPushRec: boolean = false;
  public clickPushRef: boolean = false;

  public isOpenCheckBlock:boolean = false;

  ngOnInit(): void {
  }

}
