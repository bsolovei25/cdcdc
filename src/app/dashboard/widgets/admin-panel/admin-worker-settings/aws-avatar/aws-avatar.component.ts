import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'evj-aws-avatar',
    templateUrl: './aws-avatar.component.html',
    styleUrls: ['./aws-avatar.component.scss'],
})
export class AwsAvatarComponent implements OnInit {
    @Output() private closePopUp: EventEmitter<void> = new EventEmitter<void>();

    constructor() {}

    public ngOnInit(): void {}

    public onClose(): void {
        this.closePopUp.emit();
    }
}
