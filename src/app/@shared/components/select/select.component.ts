import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ISelectValue {
    value: string | number;
    label: string | number;
}

@Component({
    selector: 'evj-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
    @Input()
    public items: ISelectValue[] | null;

    @Input()
    public label: string = 'Выпадающий список';

    @Output()
    public onValueChange: EventEmitter<string | number | ISelectValue> = new EventEmitter<
        string | number | ISelectValue
    >();

    constructor() {}

    public ngOnInit(): void {}

    public onClick(): void {}

    public onSelect(value: keyof ISelectValue): void {
        this.onValueChange.emit(value);
    }
}
