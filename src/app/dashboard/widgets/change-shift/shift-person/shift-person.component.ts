import { Component, OnInit, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ShiftMember } from 'src/app/dashboard/models/shift.model';
import { ShiftService } from '../../../services/shift.service';

@Component({
    selector: 'evj-shift-person',
    templateUrl: './shift-person.component.html',
    styleUrls: ['./shift-person.component.scss'],
})
export class ShiftPersonComponent implements OnInit {
    @Input() person: ShiftMember;
    @Input() currentBrigade: number;
    @Input() shiftType: string;
    @Input() shiftId: number;
    @Input() onShift: boolean;
    @Input() isPresent: boolean;
    @Input() isMain: boolean;

    isDropdownActive: boolean = false;

    @ViewChild('dropdown', { static: false }) ddMenu: ElementRef;
    @ViewChild('insideElement', { static: false }) insideElement: ElementRef;

    mapPosition = [
        {
            code: 'responsible',
            name: 'Старший оператор',
        },
        {
            code: 'common',
            name: 'Оператор',
        },
    ];

    mapStatus = [
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

    constructor(private shiftService: ShiftService) {}

    ngOnInit(): void {}

    getDisplayStatus(code): string {
        return this.mapStatus.find((el) => el.code === code).name;
    }

    getDisplayPosition(code): string {
        return this.mapPosition.find((el) => el.code === code).name;
    }

    onMouseOver() {
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

    onMouseOut() {
        if (this.ddMenu) {
            const classes: DOMTokenList = this.ddMenu.nativeElement.classList;
            if (!classes.contains('disable')) {
                classes.add('disable');
                this.isDropdownActive = false;
            }
        }
    }

    private createDropdown():void {
        this.dropdownMenu = [];
        switch (this.person.status) {
            case 'absent':
                this.dropdownMenu.push('Вернуть');
                break;
            case 'accepted':
                this.dropdownMenu.push('Готов к передаче');
                if (!this.person.employee.main) {
                    this.dropdownMenu.push('Отсутствует');
                    this.dropdownMenu.push('Сделать главным');
                }
                break;
            case 'passed':
                break;
            case 'initialization':
                if (!this.person.employee.main) {
                    this.dropdownMenu.push('Покинул смену');
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

    menuCheck(event: any, person: ShiftMember): void {
        switch (event.target.innerText) {
            case 'Принять смену':
                this.shiftService.changeStatus('accepted', person.employee.id, this.shiftId);
                break;
            case 'Передать смену':
                this.shiftService.changeStatus('passed', person.employee.id, this.shiftId);
                break;
            case 'Отсутствует':
                this.shiftService.changeStatus('absent', person.employee.id, this.shiftId);
                break;
            case 'На месте':
                this.shiftService.changeStatus('inProgressAccepted', person.employee.id, this.shiftId);
                break;
            case 'Готов к передаче':
                this.shiftService.changeStatus('inProgressPassed', person.employee.id, this.shiftId);
                break;
            case 'Покинул смену':
                this.shiftService.changeStatus('missing', person.employee.id, this.shiftId);
                break;
            case 'Сделать главным':
                this.shiftService.changePosition(person.employee.id, this.shiftId);
                break;
            case 'Удалить':
                this.shiftService.delMember(person.employee.id, this.shiftId);
                break;
        }
    }

    addToShift(id) {
        if (!this.onShift) {
            this.shiftService.addMember(id, this.shiftId);
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
