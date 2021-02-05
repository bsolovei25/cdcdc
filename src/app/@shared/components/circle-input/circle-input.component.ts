import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'evj-circle-input',
    templateUrl: './circle-input.component.html',
    styleUrls: ['./circle-input.component.scss'],
})
export class CircleInputComponent {
    // region: two way binding area
    public searchValue: string;
    @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
    @Input()
    get search(): string {
        return this.searchValue;
    }
    set search(val: string) {
        this.searchValue = val;
        this.searchChange.emit(this.searchValue);
    }
    @Input() placeholder: string = 'Поиск...';
    // end region: two way binding area
    public isInput: boolean = false;
    @Input() adminShift: boolean = false;
}
