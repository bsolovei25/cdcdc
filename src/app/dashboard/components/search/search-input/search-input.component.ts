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

  itemChoose = false;


  constructor() { 
    if(this.data){
      this.itemChoose = true;
    }
  }

  ngOnInit() {

  }

  public checkInput(event){
    if(event){
      this.checkClick = !this.checkClick;
    }
    this.onCheck.emit(this.checkClick);
}

}
