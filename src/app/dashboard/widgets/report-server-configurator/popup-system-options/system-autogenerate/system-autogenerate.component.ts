import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-system-autogenerate',
  templateUrl: './system-autogenerate.component.html',
  styleUrls: ['./system-autogenerate.component.scss']
})
export class SystemAutogenerateComponent implements OnInit {

  @Output() public result: EventEmitter<any> = new EventEmitter<any>();

  dateNow: Date = new Date();

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    const obj = {
      close: false,
      type: 'autogenerate',
    }
    this.result.emit(obj);
  }

  save() {
    const obj = {
      close: true,
      type: 'autogenerate',
    }
    this.result.emit(obj);
  }

  changeSwap(item) {

  }

  dateTimePickerInput(event) {

  }

}
