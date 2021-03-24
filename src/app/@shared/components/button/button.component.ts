import { Component, OnInit, Input } from '@angular/core';
import { IButtonImgSrc } from '../../../dashboard/models/ADMIN/admin-panel.model';

type ButtonType = 'default' | 'primary';

@Component({
    selector: 'evj-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
    @Input() public isSmallButton: boolean = false;
    @Input() public textButton: string = '';
    @Input() public imgSrc: IButtonImgSrc = null;
    @Input() public isActive: boolean = false;
    @Input() public isChangingState: boolean = false;
    @Input() public disabled: boolean = false;
    @Input() public isRounded: boolean = false;
    @Input() public type: ButtonType = 'default';

    public isButtonHover: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    public changeButtonStyle(): string {
        const classBtn: string = this.isSmallButton ? 'button-small' : '';
        if (this.isButtonHover || this.isActive) {
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
        if (this.isChangingState) {
            this.isActive = !this.isActive;
        }
    }
}
