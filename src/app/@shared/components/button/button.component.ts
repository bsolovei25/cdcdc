import { Component, OnInit, Input } from '@angular/core';
import { IButtonImgSrc } from '../../../dashboard/models/admin-panel';

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
        const classBtn: string = this.isSmallButton ? 'button-small' : '';
        if (this.isButtonHover) {
            return `${classBtn} button-active`;
        }
        return classBtn;
    }

    public changeButtonIcon(): string {
        // if (this.imgSrc && this.isButtonHover) {
        //     return this.imgSrc.active;
        // } else 
        if (this.imgSrc) {
            return this.imgSrc.btnIconSrc;
        } else {
            return '';
        }
    }

    public onClick(): void {
        console.log('123');
    }
}
