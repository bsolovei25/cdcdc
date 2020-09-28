import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { Shift, ShiftMember } from 'src/app/dashboard/models/shift.model';
import { ShiftService } from '../../../services/shift.service';
import { SnackBarService } from '../../../services/snack-bar.service';
import { AppConfigService } from '@core/service/app-config.service';
import { AvatarConfiguratorService } from '@core/service/avatar-configurator.service';
import { IAlertWindowModel } from '@shared/models/alert-window.model';

interface IMapper { code: string; name: string; }

@Component({
    selector: 'evj-shift-person',
    templateUrl: './shift-person.component.html',
    styleUrls: ['./shift-person.component.scss'],
})
export class ShiftPersonComponent implements OnInit, OnChanges {
    @Input() public widgetId: string;

    @Input() public person: ShiftMember;
    @Input() public currentBrigade: number;
    @Input() public shiftType: string;
    @Input() public shiftId: number;
    @Input() public onShift: boolean;
    @Input() public isPresent: boolean;
    @Input() public isMain: boolean;
    @Input() public currentShift: Shift;
    @Input() public unitId: number;

    public isDropdownActive: boolean = false;
    public photoPathUser: string = 'assets/icons/widgets/admin/default_avatar2.svg';

    @ViewChild('dropdown') ddMenu: ElementRef;
    @ViewChild('insideElement') insideElement: ElementRef;

    public mapPosition: IMapper[] = [
        {
            code: 'responsible',
            name: 'Старший оператор',
        },
        {
            code: 'common',
            name: 'Оператор',
        },
    ];

    public mapStatus: IMapper[] = [
        {
            code: 'initialization',
            name: 'Ожидание',
        },
        {
            code: 'accepted',
            name: 'Принял смену',
        },
        {
            code: 'passed',
            name: 'Сдал смену',
        },
        {
            code: 'inProgressAccepted',
            name: 'В процессе',
        },
        {
            code: 'inProgressPassed',
            name: 'В процессе',
        },
        {
            code: 'absent',
            name: 'Отсутствует',
        },
        {
            code: 'missing',
            name: 'Отсутствует',
        },
    ];

    public dropdownMenu: string[];

    constructor(
        private shiftService: ShiftService,
        private avatarConfiguratorService: AvatarConfiguratorService,
        private materialController: SnackBarService
    ) { }

    public ngOnInit(): void {

    }

    public ngOnChanges(): void {
        this.photoPathUser = this.avatarConfiguratorService.getAvatarPath(this.person.employee.photoId);
    }

    public getDisplayStatus(code: string): string {
        return this.mapStatus.find((el) => el.code === code).name;
    }

    public getDisplayPosition(code: string): string {
        return this.mapPosition.find((el) => el.code === code).name;
    }

    public onMouseOver(): void {
        if (!this.ddMenu) {
            return;
        }
        this.createDropdown();
        const classes: DOMTokenList = this.ddMenu.nativeElement.classList;
        if (classes.contains('disable')) {
            classes.remove('disable');
            this.isDropdownActive = true;
        }
    }

    public onMouseOut(): void {
        if (this.ddMenu) {
            const classes: DOMTokenList = this.ddMenu.nativeElement.classList;
            if (!classes.contains('disable')) {
                classes.add('disable');
                this.isDropdownActive = false;
            }
        }
    }

    private createDropdown(): void {
        this.dropdownMenu = [];
        switch (this.person.status) {
            case 'absent':
                this.dropdownMenu.push('Вернуть');
                break;
            case 'accepted':
                this.dropdownMenu.push('Готов к передаче');
                if (!this.person.employee.main) {
                    this.dropdownMenu.push('Покинул смену');
                    this.dropdownMenu.push('Сделать главным');
                }
                break;
            case 'passed':
                break;
            case 'initialization':
                if (!this.person.employee.main) {
                    this.dropdownMenu.push('Отсутствует');
                    this.dropdownMenu.push('Сделать главным');
                }
                this.dropdownMenu.push('На месте');
                break;
            case 'inProgressAccepted':
                if (!this.person.employee.main) {
                    this.dropdownMenu.push('Покинул смену');
                    this.dropdownMenu.push('Сделать главным');
                }
                break;
            case 'inProgressPassed':
                if (!this.person.employee.main) {
                    this.dropdownMenu.push('Покинул смену');
                    this.dropdownMenu.push('Сделать главным');
                }
                break;
        }
    }

    public menuCheck(event: any, person: ShiftMember): void {
        switch (event.target.innerText) {
            case 'Принять смену':
                this.shiftService.changeStatus(
                    'accepted',
                    person.employee.id,
                    this.shiftId,
                    this.widgetId,
                    this.unitId
                );
                break;
            case 'Передать смену':
                this.shiftService.changeStatus(
                    'passed',
                    person.employee.id,
                    this.shiftId,
                    this.widgetId,
                    this.unitId
                );
                break;
            case 'Отсутствует':
                this.shiftService.changeStatus(
                    'absent',
                    person.employee.id,
                    this.shiftId,
                    this.widgetId,
                    this.unitId
                );
                break;
            case 'На месте':
                this.shiftService.changeStatus(
                    'inProgressAccepted',
                    person.employee.id,
                    this.shiftId,
                    this.widgetId,
                    this.unitId
                );
                break;
            case 'Готов к передаче':
                this.shiftService.changeStatus(
                    'inProgressPassed',
                    person.employee.id,
                    this.shiftId,
                    this.widgetId,
                    this.unitId
                );
                break;
            case 'Покинул смену':
                this.shiftService.alertWindowLeaveShift$.next({
                    isShow: true,
                    questionText: `Вы действительно хотите перевести пользователя ${person.employee.lastName} ${person.employee.firstName} в статус Отсутствующие?`,
                    acceptText: 'Да',
                    cancelText: 'Отмена',
                    closeFunction: () =>  this.shiftService.alertWindowLeaveShift$.next(null),
                    acceptFunction: async () => {
                        await this.shiftService.changeStatus(
                            'missing',
                            person.employee.id,
                            this.shiftId,
                            this.widgetId,
                            this.unitId,
                            null,
                        );
                        this.materialController.openSnackBar(`Пользователь ${person.employee.lastName} ${person.employee.firstName} успешно удален из смены`);
                    }
                });
                break;
            case 'Сделать главным':
                this.shiftService.changePosition(person.employee.id, this.shiftId, this.unitId);
                break;
            case 'Удалить':
                this.shiftService.delMember(person.employee.id, this.shiftId, this.unitId);
                break;
            case 'Вернуть':
                if (this.currentShift.status === 'inProgressAccepted') {
                    this.shiftService.changeStatus(
                        'initialization',
                        person.employee.id,
                        this.shiftId,
                        this.widgetId,
                        this.unitId
                    );
                } else {
                    this.changeStatusAccepted(person);
                }
                break;
        }
    }

    public changeStatusAccepted(person: ShiftMember): void {
        if (this.currentShift.status !== 'accepted') {
            return;
        }
        this.materialController.openSnackBar('Для продолжения оставьте комментарий');
        this.shiftService.setIsCommentRequired(true, 'shift-accepted');
        const subscription = this.shiftService
            .getRequiredComment(this.currentShift.id)
            .asObservable()
            .subscribe((ans) => {
                console.log(ans);
                if (ans.result) {
                    console.log('continue');
                    this.shiftService.changeStatus(
                        'accepted',
                        person.employee.id,
                        this.shiftId,
                        this.widgetId,
                        ans.comment
                    );
                } else {
                    console.log('cancel');
                }
                if (subscription) {
                    subscription.unsubscribe();
                }
                this.shiftService.getIsCommentRequired('shift-accepted');
                this.shiftService.setIsCommentRequired(false, 'shift-accepted');
            });
    }

    public addToShift(id: number): void {
        if (!this.onShift) {
            this.shiftService.addMember(id, this.shiftId, this.unitId);
            const event = new CustomEvent('changeShift_clickAddBtn');
            document.dispatchEvent(event);
        }
    }

    public isPersonExist(): boolean {
        if (!this.person.employee.firstName || !this.person.employee.lastName) {
            return false;
        }

        return true;
    }
}
