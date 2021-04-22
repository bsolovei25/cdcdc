import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
    ChangeShiftMemberAction,
    ChangeShiftRoleType,
    ChangeShiftStatus,
    ChangeShiftType,
    ChangeShiftUserStatus,
    IChangeShiftMember,
    IChangeShiftModel,
} from '../change-shift.interfaces';

@Injectable({
    providedIn: 'any',
})
export class ChangeShiftHelperService {
    public readonly defaultAvatarPath: string = 'assets/icons/widgets/admin/default_avatar2.svg';

    private readonly memberActionReference: { [key in ChangeShiftMemberAction]: string } = {
        main: 'Сделать главным',
        progress: 'Готов к передаче',
        add: 'Добавить на смену',
        delete: 'Покинул смену',
    };

    private readonly shiftStatus: { [key in ChangeShiftStatus]: string } = {
        init: 'Сформирована',
        acceptReady: 'Готова к приему',
        accepted: 'Принята',
        passed: 'Сдана',
    };

    private readonly mapStatus: { [key in ChangeShiftUserStatus]: string } = {
        onShift: 'На смене',
        passShift: 'Сдал смену',
        inProcess: 'В процессе',
        absent: 'Отсутствует',
    };

    constructor() {}

    public isReadyShift = (shift: IChangeShiftModel): boolean => {
        return !shift?.members?.some((x) => this.isBaseRole(x.unitRole.type) && !x?.user);
    };

    public getDisplayShiftStatus(status: ChangeShiftStatus): string {
        return this.shiftStatus[status];
    }

    public getIconType(iconType: string): string {
        return `assets/icons/widgets/change-shift/member-statuses/${iconType}.svg`;
    }

    public getDisplayMemberStatus(code: ChangeShiftUserStatus): string {
        if (!code) {
            return null;
        }
        return this.mapStatus[code];
    }

    public getDisplayAction(action: ChangeShiftMemberAction): string {
        if (!action) {
            return null;
        }
        return this.memberActionReference[action];
    }

    /**
     * format array of 2 elements to header display string
     * if in one day, then HH:mm, else dd.MM.yyyy | HH:mm
     * @param startDatetime
     * @param endDatetime
     */
    public formatDateString = (startDatetime: Date, endDatetime: Date): string => {
        const fullTemplate = 'dd.MM.yyyy | HH:mm';
        const shortTemplate = 'HH:mm';
        const pipe = new DatePipe('en');

        const isDifferentDays: boolean = startDatetime.getDate() !== endDatetime.getDate();
        let display: string = '';
        display += startDatetime ? pipe.transform(startDatetime, fullTemplate) : '----';
        display += ' - ';
        display += endDatetime ? pipe.transform(endDatetime, isDifferentDays ? fullTemplate : shortTemplate) : '----';
        return display;
    };

    public getShiftTypeByName(widgetName: string): ChangeShiftType {
        return widgetName.search('pass') !== -1 ? 'pass' : 'accept';
    }

    public isBaseRole = (role: ChangeShiftRoleType): boolean => {
        switch (role) {
            case 'mainRole':
            case 'role':
                return true;
            default:
                return false;
        }
    };

    public isMainRole = (role: ChangeShiftRoleType): boolean => {
        switch (role) {
            case 'mainRole':
                return true;
            default:
                return false;
        }
    };

    public isMainMember = (member: IChangeShiftMember): boolean => {
        return member?.user?.mainTag === 'main';
    };

    public isAbsentMember = (member: IChangeShiftMember): boolean => {
        return member?.user?.status === 'absent';
    };

    public getAvailableActions(member: IChangeShiftMember, shiftStatus: ChangeShiftStatus): ChangeShiftMemberAction[] {
        if (member?.user?.status === 'absent') {
            return [];
        }
        let statuses: ChangeShiftMemberAction[] = [];
        if (shiftStatus === 'accepted' && member?.user?.status === 'onShift') {
            statuses = [...statuses, 'progress'];
        }
        if (!this.isMainMember(member)) {
            statuses = [...statuses, 'main', 'delete'];
        }
        return statuses;
    }
}
