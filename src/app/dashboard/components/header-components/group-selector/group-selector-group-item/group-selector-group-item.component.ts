import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { IGroupScreens } from '../group-selector.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UserSettingsService } from '../../../../services/user-settings.service';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkConnectedOverlay, ConnectedPosition } from "@angular/cdk/overlay";
import { mapTo } from 'rxjs/operators';

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
            if (this.groupData.id !== 0) {
                this.switchEnable(val);
            }
        });
        this.groupData = data;
    }
    @Input() set saveNewGroup(data: { flag: boolean; id: number }) {
        if (data.flag && data.id === 0 && this.projectForm.valid) {
            this.onCreateGroup();
        }
    }
    @Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();

    @ViewChild('nameElement', { static: true }) nameInput: ElementRef;
    @ViewChild(CdkConnectedOverlay, { static: true }) connectedOverlay: CdkConnectedOverlay;

    public editName: boolean = true;
    public switchStatus: boolean;
    public isEditLogo: boolean;
    public isEditLogo$: Observable<boolean> = new Observable<boolean>();
    public groupData: IGroupScreens;
    public switchSubscribe: Subscription;
    public positions: ConnectedPosition[] = [
        {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top'
        },
    ];

    public projectForm: FormGroup = new FormGroup({
        name: new FormControl(null, [
            Validators.required,
            Validators.maxLength(20),
            Validators.minLength(1),
        ]),
        isEnabled: new FormControl(),
        icon: new FormControl(),
    });
    private projectForm$: Observable<IGroupScreens> = this.projectForm.valueChanges;
    public selector: SelectionModel<IGroupScreens> = new SelectionModel<IGroupScreens>();

    constructor(
        private userSettingsService: UserSettingsService,
        private snackBar: SnackBarService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.connectedOverlay.backdropClick.subscribe(() => {
            this.isEditLogo = false;
        });
    }

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
            if (this.groupData.id !== 0) {
                let group: IGroupScreens;
                group = { ...this.groupData, name: this.projectForm.get('name').value };

                group = await this.userSettingsService.updateGroup(group);
                this.projectForm.get('name').setValue(group.name);

                this.snackBar.openSnackBar('Новое имя группы сохранено');
            }
            this.editName = true;
        } else if (!this.projectForm.get('name').valid) {
            this.snackBar.openSnackBar('Неверное название группы', 'snackbar-red');
        }
    }

    public async switchEnable(value: boolean): Promise<void> {
        let group: IGroupScreens;
        group = { ...this.groupData, isEnabled: this.projectForm.get('isEnabled').value };
        try {
            group = await this.userSettingsService.updateGroup(group);
            this.snackBar.openSnackBar('Статус группы изменен');
        } catch (e) {
            this.snackBar.openSnackBar('Ошибка смены статуса', 'snackbar-red');
            this.switchStatus = !this.switchStatus;
            this.switchSubscribe.unsubscribe();
            this.projectForm.get('isEnabled').setValue(this.switchStatus);
            this.switchSubscribe = this.projectForm
                .get('isEnabled')
                .valueChanges.subscribe((val) => {
                    this.switchStatus = val;
                    this.switchEnable(val);
                });
        }
    }

    public async onDelete(): Promise<void> {
        if (this.groupData.id === 0) {
            this.changed.emit(false);
            return;
        }
        if (!(await this.userSettingsService.deleteGroup(this.groupData.id))) {
            return;
        }
        this.snackBar.openSnackBar('Группа удалена');
        if (+this.selector.selected[0].id === +this.groupData.id) {
            this.selectFirstGroup();
        }
    }

    public async onCreateGroup(): Promise<void> {
        const newGroup = await this.userSettingsService.addGroup({
            ...this.projectForm.value,
            id: 0,
        });
        if (!newGroup) {
            return;
        }
        this.onSelect(newGroup);
        await this.userSettingsService.pushScreen(`Экран группы ${newGroup.name}`);
        this.changed.emit(false);
    }

    public onSelect(group: IGroupScreens): void {
        this.selector.select(group);
        this.userSettingsService.groupId = group.id ?? undefined;
        this.userSettingsService.groupName = group.id ? group.name : undefined;
        this.router.navigate([], {
            queryParams: { userScreenGroupId: group.id ?? undefined },
            queryParamsHandling: 'merge',
        });
        this.userSettingsService.getScreens(group.id);
    }

    private selectFirstGroup(): void {
        const groups = this.userSettingsService.groupsList$.getValue();
        const fn = (id: string) => {
            if (!id) {
                return;
            }
            const group = groups.find((item) => item.id === +id);
            if (group) {
                this.onSelect(group);
            }
        };

        const groupIdFromRoute: string = this.route.snapshot.queryParamMap.get('userScreenGroupId');
        if (!!groupIdFromRoute) {
            fn(groupIdFromRoute);
        } else {
            const groupIdFromSS: string = sessionStorage.getItem('userScreenGroupId');
            const groupIdFromLS: string = localStorage.getItem('userScreenGroupId');
            !!groupIdFromSS ? fn(groupIdFromSS) : fn(groupIdFromLS);
        }

        if (!this.selector.selected.length && groups?.length > 0) {
            this.onSelect(groups[0]);
        }
    }

    private editLogo(): void {
        this.isEditLogo = true;
    }

    public onChanged(data: boolean): void {
        this.isEditLogo = false;
    }
}
