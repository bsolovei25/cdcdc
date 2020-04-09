import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ReportsService } from 'src/app/dashboard/services/reports.service';

@Component({
  selector: 'evj-necessary-param',
  templateUrl: './necessary-param.component.html',
  styleUrls: ['./necessary-param.component.scss']
})
export class NecessaryParamComponent implements OnInit {
  @Input() public activeOptions;
  @Output() public close: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public options: EventEmitter<any> = new EventEmitter<any>();

  objectKeys = Object.keys;

  public isRepInput: boolean = false;

  data: any = [];
  datas: any = [];

  arrayOptions = [];

  constructor(
    public reportService: ReportsService,
  ) { }

  ngOnInit(): void {
    this.getReference();
  }

  onShowOptions(item): void {
    item.open = !item.open;
  }

  changeSwap(item) {
    item.checked = !item.checked;
    if(item.checked){
      this.arrayOptions.push(item);
    } else {
      let index = this.data.findIndex(e => e.id === item.id);
      this.arrayOptions.splice(item, index);
    }
  }

  saveOptions() {
    this.options.emit(this.arrayOptions);
    this.close.emit(false);
  }

  closeOptions() {
    this.close.emit(false);
  }

  getReference() {
    return this.reportService.getCustomOptions().subscribe((data) => {
      this.datas = data;
      this.data = this.datas;
    });
  }

  search(event: any) {
    if (event.key === "Backspace") {
      this.data = this.datas;
    }
    const record = event.currentTarget.value.toLowerCase();
    const filterData = this.data.filter(
      (e) =>
        e.name.toLowerCase().indexOf(record.toLowerCase()) > -1

    );
    this.data = filterData;
    if (!event.currentTarget.value) {
      this.data = this.datas;
    }
  }

}
