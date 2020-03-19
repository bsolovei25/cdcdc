import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Shift, ShiftMember } from 'src/app/dashboard/models/shift.model';
import { ShiftService } from '../../../services/shift.service';
import { MaterialControllerService } from '../../../services/material-controller.service';

@Component({
    selector: 'evj-shift-person',
    templateUrl: './shift-person.component.html',
    styleUrls: ['./shift-person.component.scss'],
})
export class ShiftPersonComponent implements OnInit {
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

    @ViewChild('dropdown') ddMenu: ElementRef;
    @ViewChild('insideElement') insideElement: ElementRef;

    public mapPosition = [
        {
            code: 'responsible',
            name: 'Старший оператор',
        },
        {
            code: 'common',
            name: 'Оператор',
        },
    ];

    public mapStatus = [
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
        private materialController: MaterialControllerService
    ) {}

    public ngOnInit(): void {}

    public getDisplayStatus(code): string {
        return this.mapStatus.find((el) => el.code === code).name;
    }

    public getDisplayPosition(code): string {
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
                if (true) {
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
                if (true) {
                    this.dropdownMenu.push('Покинул смену');
                    this.dropdownMenu.push('Сделать главным');
                }
                break;
        }
    }

    menuCheck(event: any, person: ShiftMember): void {
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
                this.shiftService.changeStatus(
                    'missing',
                    person.employee.id,
                    this.shiftId,
                    this.widgetId,
                    this.unitId
                );
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

    addToShift(id) {
        if (!this.onShift) {
            this.shiftService.addMember(id, this.shiftId, this.unitId);
            const event = new CustomEvent('changeShift_clickAddBtn');
            document.dispatchEvent(event);
        }
    }

    isFromThisBrigade(): boolean {
        return this.person.employee.brigade.id === this.currentBrigade;
    }

    isPersonExist(): boolean {
        if (!this.person.employee.firstName) {
            return false;
        }
        if (!this.person.employee.lastName) {
            return false;
        }
        return true;
    }
}
