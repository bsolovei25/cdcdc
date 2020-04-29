import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-report-file-select-box',
  templateUrl: './report-file-select-box.component.html',
  styleUrls: ['./report-file-select-box.component.scss']
})
export class ReportFileSelectBoxComponent implements OnInit {
  @Output() selectFile: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any;

  public saveData: any;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.saveData = this.data;
  }

  choose(item): void {
    this.selectFile.emit(item);
  }

  search(event): void {
    const record = event.currentTarget.value.toLowerCase();
    if (event.key === "Backspace") {
      this.data = this.saveData;
    }
    const filterData = this.data.filter(
      (e) => e.name.toLowerCase().indexOf(record.toLowerCase()) > -1
    );

    this.data = filterData;
    if (!event.currentTarget.value) {
      this.data = this.saveData;
    }
  }

}
