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
      isAstive: false,
    },
    {
      id: 2,
      mail: "test2@test.ru",
      isAstive: false,
    },
    {
      id: 3,
      mail: "test3@test.ru",
      isAstive: false,
    },
    {
      id: 4,
      mail: "test4@test.ru",
      isAstive: false,
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {

  }

  exit(): void {
    this.close.emit(false);
  }

  save(): void {

  }

  search(event): void {

  }

}
