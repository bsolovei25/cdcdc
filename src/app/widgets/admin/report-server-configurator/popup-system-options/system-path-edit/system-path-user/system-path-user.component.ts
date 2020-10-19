import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'evj-system-path-user',
  templateUrl: './system-path-user.component.html',
  styleUrls: ['./system-path-user.component.scss']
})
export class SystemPathUserComponent implements OnInit, OnChanges {
  @Output() public close: EventEmitter<any> = new EventEmitter<any>();

  @Input() public data: any;

  public isRepInput: boolean = false;

  dataMail: any = [
    {
      id: 1,
      mail: "test1@test.ru",
      isActive: false,
    },
    {
      id: 2,
      mail: "test2@test.ru",
      isActive: false,
    },
    {
      id: 3,
      mail: "test3@test.ru",
      isActive: false,
    },
    {
      id: 4,
      mail: "test4@test.ru",
      isActive: false,
    },
  ];

  datas: any = [];

  public saveData: any = [];

  constructor() { }

  ngOnInit(): void {
    this.datas = this.dataMail;
  }

  ngOnChanges(): void {
    if (this.data.length > 0) {
      this.saveData = this.data;
      for (let i of this.dataMail) {
        for (let j of this.data) {
          if (i.id === j.id) {
            i.isActive = true;
          }
        }
      }
    }
  }

  changeSwap(item) {
    item.isActive = !item.isActive;
  }

  exit(): void {
    const obj = {
      data: this.saveData,
      close: false,
    }
    this.close.emit(obj);
  }

  save(): void {
    const newMailUser = [];
    for (let item of this.dataMail) {
      if (item.isActive) {
        const obj = {
          id: item.id,
          mail: item.mail,
        };
        newMailUser.push(obj);
      }
    }
    const objSend = {
      data: newMailUser,
      close: false,
    }
    this.close.emit(objSend);
  }

  search(event): void {
    if (event.key === "Backspace") {
      this.dataMail = this.datas;
    }
    const record = event.currentTarget.value.toLowerCase();
    const filterData = this.dataMail.filter(
      (e) =>
        e.mail.toLowerCase().indexOf(record.toLowerCase()) > -1

    );
    this.dataMail = filterData;
    if (!event.currentTarget.value) {
      this.dataMail = this.datas;
    }
  }
}

