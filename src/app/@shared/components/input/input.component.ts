import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
} from '@angular/core';

@Component({
    selector: 'evj-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
    @Input() placeholder: string = '';
    @Input() iconSrc: string = '';
    @Output() inputedValue: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('input') input: ElementRef;

    public isFocused: boolean = false;

    constructor() {}

    public ngOnInit(): void {}

    public onFocus(): string {
        if (this.isFocused) {
            return '';
        } else {
            return this.placeholder;
        }
    }

    public onInput(): void {
        this.inputedValue.emit(this.input.nativeElement.value);
    }
}
