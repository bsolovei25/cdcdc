import { Component, OnInit, Output, EventEmitter, Input, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ReportsService } from 'src/app/dashboard/services/widgets/reports.service';

@Component({
  selector: 'evj-necessary-param',
  templateUrl: './necessary-param.component.html',
  styleUrls: ['./necessary-param.component.scss']
})
export class NecessaryParamComponent implements OnInit, OnChanges {
  @Input() public activeOptions;
  @Output() public closeN: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public options: EventEmitter<any> = new EventEmitter<any>();

  objectKeys = Object.keys;

  public isRepInput: boolean = false;

  data: any = [];
  datas: any = [];

  optionsName = {
    description: "Описание",
    type: "Тип",
    validationRule: "Правило проверки",
    isRequired: "Обязательный",
    "source": "Источник",
    sortOrder: "Сортировка",
  }

  arrayOptions = [];

  constructor(
    private cdRef: ChangeDetectorRef,
    public reportService: ReportsService,
  ) { }

  ngOnInit(): void {
  }

  onShowOptions(item): void {
    item.open = !item.open;
  }

  ngOnChanges(): void {
    this.getReference();
  }

  changeSwap(item) {
    item.isActive = !item.isActive;
    if (item.isActive) {
      this.arrayOptions.push(item);
    } else {
      let index = this.arrayOptions.findIndex(e => e.id === item.id);
      this.arrayOptions.splice(index, 1);
    }
  }

  saveOptions() {
    let obj = {
      array: this.arrayOptions,
      close: false,
    }
    this.options.emit(obj);
  }

  closeOptions() {
    let obj = {
      array: this.arrayOptions,
      close: false,
    }
    this.options.emit(obj);
  }

  getReference() {
    return this.reportService.getCustomOptions().subscribe((data) => {
      this.mapOptions(data);
    });
  }

  mapOptions(data) {
    this.arrayOptions = [];
    this.data = data;
    for (let i of this.data) {
      for (let j of this.activeOptions.customOptions) {
        if (i.id === j.id) {
          i.isActive = true;
          this.arrayOptions.push(j);
        }
      }
    }
    this.datas = this.data;
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
