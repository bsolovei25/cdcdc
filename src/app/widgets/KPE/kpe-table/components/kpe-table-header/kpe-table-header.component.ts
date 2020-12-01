import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'evj-kpe-table-header',
  templateUrl: './kpe-table-header.component.html',
  styleUrls: ['./kpe-table-header.component.scss']
})
export class KpeTableHeaderComponent implements OnInit {
    @Input() page: 'development' | 'loading' = null;
    @Output() changePage: EventEmitter<'development' | 'loading'> = new EventEmitter<'development' | 'loading'>();

    constructor() {}

    ngOnInit(): void {}
}
