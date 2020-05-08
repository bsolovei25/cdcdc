import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-aws-block',
    templateUrl: './aws-block.component.html',
    styleUrls: ['./aws-block.component.scss'],
})
export class AwsBlockComponent implements OnInit {
    @Input() private isLockedUser: boolean = false;
    @Output() private changeLockUser: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() private removeUser: EventEmitter<null> = new EventEmitter<null>();

    public selected: SelectionModel<boolean> = new SelectionModel<boolean>();

    private readonly lockedIcon: string = 'assets/icons/widgets/admin/lock_1.svg';
    private readonly unlockedIcon: string = 'assets/icons/widgets/admin/lock_2.svg';

    private readonly msgLockUser: string = 'Заблокировать пользователя';
    private readonly msgUnlockUser: string = 'Разблокировать пользователя';

    public readonly removeIcon: string = 'assets/icons/widgets/admin/admin-groups/delete-icon.svg';
    public readonly msgRemoveUser: string = 'Удалить пользователя';

    public isMouseOnLockLogo: boolean = false;
    public isMouseOnRemoveLogo: boolean = false;

    constructor() {}

    public ngOnInit(): void {
        if (this.isLockedUser) {
            this.selected.toggle(true);
        }
    }

    public getIconPath(): string {
        if (this.selected.hasValue()) {
            return this.lockedIcon;
        }
        return this.unlockedIcon;
    }

    public getMessageText(): string {
        return this.selected.isEmpty() ? this.msgLockUser : this.msgUnlockUser;
    }

    public onClick(action: 'lock' | 'remove'): void {
        if (action === 'lock') {
            this.selected.toggle(true);
            this.changeLockUser.emit(this.selected.hasValue());
        } else {
            this.removeUser.emit();
        }
    }

    public onMouseEnter(action: 'lock' | 'remove'): void {
        if (action === 'lock') {
            this.isMouseOnLockLogo = true;
        } else {
            this.isMouseOnRemoveLogo = true;
        }
    }

    public onMouseLeave(action: 'lock' | 'remove'): void {
        if (action === 'lock') {
            this.isMouseOnLockLogo = false;
        } else {
            this.isMouseOnRemoveLogo = false;
        }
    }
}
