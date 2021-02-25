import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IGroupScreens } from '../group-selector.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserSettingsService } from '../../../../services/user-settings.service';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { Router } from '@angular/router';
import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';
import { GroupSelectorModalComponent } from '../group-selector-modal/group-selector-modal.component';
import { CdkPortal } from '@angular/cdk/portal';

@Component({
    selector: 'evj-group-selector-group-item',
    templateUrl: './group-selector-group-item.component.html',
    styleUrls: ['./group-selector-group-item.component.scss'],
})
export class GroupSelectorGroupItemComponent implements OnInit {
    @Input() set group(data: IGroupScreens) {
        this.projectForm.get('name').setValue(data.name);
        this.projectForm.get('isEnabled').setValue(data.isEnabled);
        this.switchStatus = data.isEnabled;

        this.switchSubscribe = this.projectForm.get('isEnabled').valueChanges.subscribe((val) => {
            this.switchStatus = val;
            if (!!this.groupData.id) {
                this.switchEnable();
            } else if (!val && this.groupData.id === this.userSettingsService.groupId) {
                const selectableGroup = this.userSettingsService.groupsList$.getValue().find((item) => item.isEnabled);
                this.onSelect(selectableGroup);
            }
        });
        this.groupData = data;
        if (!this.groupData.id) {
            this.onEditName();
        }
        this.userSettingsService.iconsList$.subscribe((icons) => {
            this.icons = icons;
            this.setIcon();
        });

        this.setIcon();
    }
    @Output() cancelNewProject: EventEmitter<void> = new EventEmitter<void>();
    @ViewChild('nameElement', { static: true }) nameInput: ElementRef;

    @ViewChild('originOverlay') originOverlay: CdkPortal;
    public overlayRef: OverlayRef;

    readonly baseSrc: string = 'https://deploy.funcoff.club/api/file-storage/';
    public editName: boolean = true;
    public switchStatus: boolean;
    public isEditLogo: boolean;
    public iconSrc: string = '';
    public groupData: IGroupScreens;
    public icons: string[];
    public switchSubscribe: Subscription;
    public positions: ConnectedPosition[] = [
        {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: -30,
        },
    ];

    public projectForm: FormGroup = new FormGroup({
        name: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(1)]),
        isEnabled: new FormControl(),
        iconId: new FormControl(),
    });

    constructor(
        private userSettingsService: UserSettingsService,
        private snackBar: SnackBarService,
        private overlay: Overlay,
        private router: Router,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {}

    public onEditName(): void {
        if (this.editName) {
            this.nameInput.nativeElement.focus();
        } else {
            this.projectForm.get('name').setValue(this.groupData.name);
        }
        this.editName = !this.editName;
    }

    public async acceptEdit(): Promise<void> {
        if (this.projectForm.get('name').dirty && this.projectForm.get('name').valid) {
            let group: IGroupScreens;
            group = { ...this.groupData, name: this.projectForm.get('name').value };
            if (!!this.groupData.id) {
                group = await this.userSettingsService.updateGroup(group);

                this.snackBar.openSnackBar('Новое имя группы сохранено');

                if (this.userSettingsService.groupId === group.id) {
                    this.userSettingsService.groupName = group.name;
                }
            } else {
                await this.onCreateGroup(group);
            }
            this.editName = true;
        } else if (!this.projectForm.get('name').valid) {
            this.snackBar.openSnackBar('Неверное название группы', 'error');
        }
    }

    public async switchEnable(): Promise<void> {
        let group: IGroupScreens;
        group = { ...this.groupData, isEnabled: this.projectForm.get('isEnabled').value };
        try {
            group = await this.userSettingsService.updateGroup(group);
            this.snackBar.openSnackBar('Статус группы изменен');
            if (this.userSettingsService.groupId === group.id) {
                const selectableGroup = this.userSettingsService.groupsList$.getValue().find((item) => item.isEnabled);
                this.onSelect(selectableGroup);
            }
        } catch (e) {
            this.snackBar.openSnackBar('Ошибка смены статуса', 'error');
            this.switchStatus = !this.switchStatus;
            this.switchSubscribe.unsubscribe();
            this.projectForm.get('isEnabled').setValue(this.switchStatus);
            this.switchSubscribe = this.projectForm.get('isEnabled').valueChanges.subscribe((val) => {
                this.switchStatus = val;
                this.switchEnable();
            });
        }
    }

    public openModal(): void {
        if (!this.groupData.id) {
            this.cancelNewProject.emit();
            return;
        } else {
            this.dialog.open(GroupSelectorModalComponent, { data: this.groupData.id });
        }
    }

    public async onCreateGroup(group: IGroupScreens): Promise<void> {
        const newGroup = await this.userSettingsService.addGroup(group);
        if (!newGroup) {
            return;
        }
        this.onSelect(newGroup);
        await this.userSettingsService.pushScreen(`Экран группы ${newGroup.name}`);
    }

    public onSelect(group: IGroupScreens): void {
        const currentIcon = this.userSettingsService.iconsList$.getValue()?.find((icon) => icon === group.iconId);
        this.userSettingsService.groupIconId = currentIcon ?? undefined;
        this.userSettingsService.groupId = group.id ?? undefined;
        this.userSettingsService.groupName = group.id ? group.name : undefined;
        this.router.navigate([], {
            queryParams: { userScreenGroupId: group.id ?? undefined },
            queryParamsHandling: 'merge',
        });
        this.userSettingsService.getScreens(group.id);
    }

    public setIcon(): void {
        this.projectForm.get('iconId').setValue(this.groupData.iconId);
        this.iconSrc = !!this.groupData.iconId
            ? this.baseSrc + this.groupData.iconId
            : 'assets/icons/control-group-icons/upload.svg';
    }

    public editLogo(event: Event): void {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(event.target as Element)
            .withPositions(this.positions);
        this.overlayRef = this.overlay.create(
            new OverlayConfig({
                positionStrategy,
                hasBackdrop: true,
                backdropClass: 'cdk-overlay-transparent-backdrop',
            })
        );
        this.overlayRef.backdropClick().subscribe(() => {
            this.isEditLogo = false;
            this.overlayRef.dispose();
        });
        this.overlayRef.attach(this.originOverlay);
    }

    public onChanged(): void {
        this.isEditLogo = false;
        this.overlayRef.dispose();
    }

    public async onChangeIcon(id: string): Promise<void> {
        this.projectForm.get('iconId').setValue(id);
        this.groupData.iconId = id;
        this.setIcon();
        if (!!this.groupData.id) {
            let group: IGroupScreens;
            group = { ...this.groupData, iconId: this.projectForm.get('iconId').value };
            group = await this.userSettingsService.updateGroup(group);
            this.projectForm.get('name').setValue(group.name);
            this.snackBar.openSnackBar('Иконка изменена');
            if (this.userSettingsService.groupId === group.id) {
                this.userSettingsService.groupIconId = id;
            }
        }
    }
}
