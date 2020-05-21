import {
    Component,
    OnInit,
    Renderer2,
    ViewChild,
    ElementRef,
    forwardRef,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IInputOptions, IInputMask } from '../../models/input.model';

@Component({
    selector: 'evj-input-custom',
    templateUrl: './input-custom.component.html',
    styleUrls: ['./input-custom.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputCustomComponent),
            multi: true,
        },
    ],
})
export class InputCustomComponent implements OnInit, ControlValueAccessor {
    // tslint:disable-next-line: no-output-native
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();

    @Input() public options: IInputOptions = {
        type: 'text',
        state: 'normal',
        placeholder: 'Введите текст',
        isMovingPlaceholder: true,
        icon: {
            src: 'assets/icons/login/visibility.svg',
            svgStyle: { 'width.px': 20, 'height.px': 20 },
            isClickable: true,
            onClick: () => {
                [this.options.icon.src, this.options.icon.secState] = [
                    this.options.icon.secState,
                    this.options.icon.src,
                ];
            },
            secState: 'assets/icons/login/visibility_off.svg',
        },
        mask: {
            prefix: '+7',
            mask: '(000) 000-00-00',
            showMaskTyped: true,
        },
    };
    @ViewChild('input', { static: true }) public input: ElementRef;

    public isInput: boolean = false;
    public isDisabled: boolean = false;
    public mask: IInputMask = {
        prefix: '',
        mask: '',
        showMaskTyped: false,
    };

    constructor(private renderer: Renderer2) {}

    public ngOnInit(): void {
        this.maskSettings();
    }

    public onClickIcon(): void {
        if (this.options.icon.isClickable && !!this.options.icon.onClick) {
            this.options.icon.onClick();
        }
    }

    private maskSettings(): void {
        if (this.options.mask) {
            this.mask = this.options.mask;
            this.isInput = true;

            console.log(this.mask);
        }
    }

    public onInput(value: string): void {
        this.writeValue(value);
    }

    public onBlur(value: string): void {
        this.isInput = !!value || !!this.mask?.mask || !!this.mask?.prefix;
        this.onTouched();
        this.blur.emit();
    }

    private onChange: (_: any) => void = () => null;
    private onTouched: () => void = () => null;

    // #region ControlValueAccessor
    public writeValue(value: string): void {
        this.renderer.setProperty(this.input.nativeElement, 'value', value);
        this.isInput = !!value || !!this.mask?.mask || !!this.mask?.prefix;

        this.onChange(value);
    }

    public registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public setDisabledState(isDisabled: boolean): void {
        this.renderer.setProperty(this.input.nativeElement, 'disabled', isDisabled);
        this.isDisabled = isDisabled;
    }
    //#endregion ControlValueAccessor
}
