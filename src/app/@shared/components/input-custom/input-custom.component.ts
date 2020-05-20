import { Component, OnInit } from '@angular/core';

interface IInputIcon {
    src: string;
    svgStyle: { [key: string]: number | string };
    isClickable: boolean;
    onClick?: () => void;
    secState?: string;
}

@Component({
    selector: 'evj-input-custom',
    templateUrl: './input-custom.component.html',
    styleUrls: ['./input-custom.component.scss'],
})
export class InputCustomComponent implements OnInit {
    public type: string = 'text';
    public placeholder: string = 'Введите текст';
    public isMovingPlaceholder: boolean = false;

    public icon: IInputIcon = {
        src: 'assets/icons/login/visibility.svg',
        svgStyle: { 'width.px': 20, 'height.px': 20 },
        isClickable: true,
        onClick: () => {
            [this.icon.src, this.icon.secState] = [this.icon.secState, this.icon.src];
        },
        secState: 'assets/icons/login/visibility_off.svg',
    };

    public isInput: boolean = false;

    constructor() {}

    public ngOnInit(): void {}

    public onClickIcon(): void {
        if (this.icon.isClickable && !!this.icon.onClick) {
            this.icon.onClick();
        }
    }

    public onBlur(event: FocusEvent): void {
        const elem: HTMLTextAreaElement = event.target as HTMLTextAreaElement;
        this.isInput = !!elem.value;
    }
}
