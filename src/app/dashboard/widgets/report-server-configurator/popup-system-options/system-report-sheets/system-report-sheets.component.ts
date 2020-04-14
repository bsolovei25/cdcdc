import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-system-report-sheets',
  templateUrl: './system-report-sheets.component.html',
  styleUrls: ['./system-report-sheets.component.scss']
})
export class SystemReportSheetsComponent implements OnInit {
  @Output() public result: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.result.emit(true);
  }

  save(){
    
  }

}
