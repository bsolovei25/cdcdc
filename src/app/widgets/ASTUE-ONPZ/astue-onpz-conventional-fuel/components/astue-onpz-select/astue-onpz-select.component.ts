import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'evj-astue-onpz-select',
  templateUrl: './astue-onpz-select.component.html',
  styleUrls: ['./astue-onpz-select.component.scss']
})
export class AstueOnpzSelectComponent implements OnInit {

    @Input()
    public label: string = '';

    public selected: string = 'option1';

    constructor() {
    }

    public ngOnInit(): void {
    }

    public onClick(): void {
    }
}
