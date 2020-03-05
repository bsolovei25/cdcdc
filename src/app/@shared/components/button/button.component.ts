import { Component, OnInit, Input } from '@angular/core';
import { IButtonImgSrc } from '../../../dashboard/models/admin';

@Component({
    selector: 'evj-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
    @Input() isSmallButton: boolean = false;
    @Input() textButton: string = '';
    @Input() imgSrc: IButtonImgSrc = null;

    public isButtonHover: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    public changeButtonStyle(): string {
        if (this.isButtonHover) {
            return 'button-active';
        }
        return '';
    }

    public changeButtonIcon(): string {
        if (this.imgSrc && this.isButtonHover) {
            return this.imgSrc.active;
        } else if (this.imgSrc) {
            return this.imgSrc.normal;
        } else {
            return '';
        }
    }

    onClick() {
        console.log('123');
    }
}
