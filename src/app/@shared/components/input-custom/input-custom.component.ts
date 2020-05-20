import { Component, OnInit, Renderer2, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface IInputIcon {
    src: string;
    svgStyle: { [key: string]: number | string };
    isClickable: boolean;
    onClick?: () => void;
    secState?: string;
}

interface IInputOptions {
    type: string;
    placeholder: string;
    isMovingPlaceholder: boolean;
    icon?: IInputIcon;
}

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
    @ViewChild('input', { static: true }) private input: ElementRef;

    public options: IInputOptions = {
        type: 'text',
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
    };

    public isInput: boolean = false;

    constructor(private renderer: Renderer2) {}

    public ngOnInit(): void {}

    public onClickIcon(): void {
        if (this.options.icon.isClickable && !!this.options.icon.onClick) {
            this.options.icon.onClick();
        }
    }

    public onInput(value: string): void {
        this.writeValue(value);
    }

    public onBlur(value: string): void {
        this.isInput = !!value;
        this.onTouched();
    }

    private onChange: (_: any) => void = () => null;
    private onTouched: () => void = () => null;

    // #region ControlValueAccessor
    public writeValue(value: string): void {
        this.renderer.setProperty(this.input.nativeElement, 'value', value);
        this.isInput = !!value;

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
    }
    //#endregion ControlValueAccessor
}
