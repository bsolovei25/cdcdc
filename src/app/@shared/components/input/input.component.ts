import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
    @Input() placeholder: string = '';

    constructor() {}

    ngOnInit() {}
}
