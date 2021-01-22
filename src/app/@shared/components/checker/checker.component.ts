import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'evj-checker',
    templateUrl: './checker.component.html',
    styleUrls: ['./checker.component.scss'],
})
export class CheckerComponent implements OnInit {
    @Input() value: boolean = false;
    @Output() changeValue: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {}

    clickAction(): void {
        this.value = !this.value;
        this.changeValue.emit(this.value);
    }
}
