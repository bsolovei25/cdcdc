import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'evj-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

  @Input() public data;

  @Output() onCheck = new EventEmitter<boolean>();

  public checkClick = false;

  public typeWidgetChoose;

  constructor() { }

  ngOnInit() {

  }

  public checkInput(event){
    if(event){
      this.checkClick = !this.checkClick;
    }
    this.onCheck.emit(this.checkClick);
}

}
