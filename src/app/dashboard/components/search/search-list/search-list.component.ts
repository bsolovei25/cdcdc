import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'evj-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})
export class SearchListComponent implements OnInit {

  @Input() public data;

  constructor() { }

  ngOnInit() {
  }

}
