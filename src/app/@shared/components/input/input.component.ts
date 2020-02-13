import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'evj-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
    @Input() placeholder: string = '';
    @Input() iconSrc: string = '';

    public isFocused: boolean = false;

    constructor() {}

    ngOnInit() {}

    onFocus(): string {
        if (this.isFocused) {
            return '';
        } else {
            return this.placeholder;
        }
    }
}
