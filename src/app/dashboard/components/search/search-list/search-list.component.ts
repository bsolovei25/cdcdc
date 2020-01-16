import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'evj-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() public data;

  @Output() onSearch = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public choosenType(type){   
    this.onSearch.emit(type);
  }

}
