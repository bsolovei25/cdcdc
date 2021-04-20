import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'evj-rectangle-input',
    templateUrl: './rectangle-input.component.html',
    styleUrls: ['./rectangle-input.component.scss'],
})
export class RectangleInputComponent {
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
    public isInput: boolean = false;
}
