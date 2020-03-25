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

    public selected: SelectionModel<boolean> = new SelectionModel<boolean>();

    private readonly lockedIcon: string = 'assets/icons/widgets/admin/lock_1.svg';
    private readonly unlockedIcon: string = 'assets/icons/widgets/admin/lock_2.svg';

    private readonly msgLockUser: string = 'Заблокировать пользователя';
    private readonly msgUnlockUser: string = 'Разблокировать пользователя';

    public isMouseOnLogo: boolean = false;

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

    public onClick(): void {
        this.selected.toggle(true);
        this.changeLockUser.emit(this.selected.hasValue());
    }

    public onMouseEnter(): void {
        this.isMouseOnLogo = true;
    }

    public onMouseLeave(): void {
        this.isMouseOnLogo = false;
    }
}
