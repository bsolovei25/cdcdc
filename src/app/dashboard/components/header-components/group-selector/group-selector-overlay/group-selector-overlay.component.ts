import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserSettingsService } from '../../../../services/user-settings.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IGroupScreens, IGroupScreensIcon } from '../group-selector.component';
import { SnackBarService } from '../../../../services/snack-bar.service';

@Component({
    selector: 'evj-group-selector-overlay',
    templateUrl: './group-selector-overlay.component.html',
    styleUrls: ['./group-selector-overlay.component.scss'],
})
export class GroupSelectorOverlayComponent implements OnInit {
    @Input() iconList: IGroupScreensIcon[] = [];
    @Input() currentIconId: number = null;
    @Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() changeIcon: EventEmitter<number> = new EventEmitter<number>();
    constructor(
        private userSettingsService: UserSettingsService,
        private snackBar: SnackBarService
    ) {}

    ngOnInit(): void {
        this.userSettingsService.getIcons();
        this.userSettingsService.iconsList$.subscribe((val) => (this.iconList = val));
    }

    public async getFile(event: FileList): Promise<void> {
        const file: File = event?.[0];
        const res =  await this.userSettingsService.addIcons(file);
        if (res) {
            this.snackBar.openSnackBar('Новая иконка добавлена');
        } else {
            this.snackBar.openSnackBar('Не удалось добавить иконку', 'snackbar-red');
        }
    }

    public closeOverlay(): void {
        this.changed.emit(false);
    }

    public acceptEdit(iconId: number): void {
        this.changeIcon.emit(iconId);
    }

    public async onDelete(iconId: number): Promise<void> {
        try {
            await this.userSettingsService.deleteIcon(iconId);
            if (iconId === this.userSettingsService.groupIconId) {
                this.userSettingsService.groupIconSrc = undefined;
            }
            this.snackBar.openSnackBar('Иконка удалена');
        } catch (e) {
            this.snackBar.openSnackBar('Не удалось удалить иконку', 'snackbar-red');
        }
    }
}
