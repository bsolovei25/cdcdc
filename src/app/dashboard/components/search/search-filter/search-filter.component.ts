import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Widgets } from 'src/app/dashboard/models/widget.model';


@Component({
  selector: 'evj-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {

  @Input() public data;

  @Output() onSearch = new EventEmitter<boolean>();

  public typeWidgetChoose;

  constructor() {
  }

  ngOnInit() {

  }

  public choosenType(type){
      this.typeWidgetChoose = type
      this.onSearch.emit(type);
  }
}
