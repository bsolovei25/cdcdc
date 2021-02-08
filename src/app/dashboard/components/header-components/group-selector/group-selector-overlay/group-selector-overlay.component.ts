import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserSettingsService } from '../../../../services/user-settings.service';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { IGroupScreens } from '../group-selector.component';

@Component({
    selector: 'evj-group-selector-overlay',
    templateUrl: './group-selector-overlay.component.html',
    styleUrls: ['./group-selector-overlay.component.scss'],
})
export class GroupSelectorOverlayComponent implements OnInit {
    @Input() iconList: string[] = [];
    @Input() group: IGroupScreens;
    @Input() currentIconId: string = null;
    @Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() changeIcon: EventEmitter<string> = new EventEmitter<string>();

    readonly baseSrc: string = 'https://deploy.funcoff.club/api/file-storage/';

    constructor(
        private userSettingsService: UserSettingsService,
        private snackBar: SnackBarService
    ) {}

    ngOnInit(): void {
        this.userSettingsService.iconsList$.subscribe((val) => (this.iconList = val));
    }

    public async getFile(event: FileList): Promise<void> {
        const file: File = event?.[0];
        const res = await this.userSettingsService.addIcons(file);
        if (res) {
            this.snackBar.openSnackBar('Новая иконка добавлена');
        } else {
            this.snackBar.openSnackBar('Не удалось добавить иконку', 'snackbar-red');
        }
    }

    public closeOverlay(): void {
        this.changed.emit(false);
    }

    public acceptEdit(iconId: string): void {
        this.changeIcon.emit(iconId);
    }

    public async onDelete(iconId: string): Promise<void> {
        try {
            await this.userSettingsService.deleteIcon(iconId);
            if (iconId === this.userSettingsService.groupIconId) {
                this.userSettingsService.groupIconId = '';
            } else if (this.group.id !== 0 && this.group.iconId === iconId) {
                let groupData: IGroupScreens;
                groupData = { ...this.group, iconId: '' };
                this.userSettingsService.updateGroup(groupData);
            }
            this.snackBar.openSnackBar('Иконка удалена');
        } catch (e) {
            this.snackBar.openSnackBar('Не удалось удалить иконку', 'snackbar-red');
        }
    }
}
