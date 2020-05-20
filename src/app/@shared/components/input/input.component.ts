import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
} from '@angular/core';

type formFieldAppearance = 'legacy' | 'standard' | 'fill' | 'outline' | 'none';

@Component({
    selector: 'evj-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
    @Input() public placeholder: string = '';
    @Input() public iconSrc: string = '';
    @Input() public value: string = '';
    @Input() public isDisabled: boolean = false;
    @Input() public focused: boolean = false;
    @Input() public appearance: formFieldAppearance = 'none';
    @Output() public inputedValue: EventEmitter<string> = new EventEmitter<string>();
    @Output() public unfocus: EventEmitter<string> = new EventEmitter<string>();
    @ViewChild('input') public input: ElementRef;

    public isFocused: boolean = false;

    constructor() {}

    public ngOnInit(): void {}

    public onInput(): void {
        this.inputedValue.emit(this.input.nativeElement.value);
    }

    public onBlur(): void {
        this.unfocus.emit(this.input.nativeElement.value);
    }
}
