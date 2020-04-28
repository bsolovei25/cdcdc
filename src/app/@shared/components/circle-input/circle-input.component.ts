import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-circle-input',
  templateUrl: './circle-input.component.html',
  styleUrls: ['./circle-input.component.scss']
})
export class CircleInputComponent implements OnInit {

  @Output() public search: EventEmitter<any> = new EventEmitter<any>();
  public isInput: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  searchRecord(event): void {
    this.search.emit(event);
  }

}
