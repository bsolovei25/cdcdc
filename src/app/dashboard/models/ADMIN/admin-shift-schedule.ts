import { IUser } from '../EVJ/events-widget';
import { IAbsent } from '../../../widgets/admin/admin-shift-schedule/admin-shift-schedule.component';

export enum EnumShiftStatus {
    initialization = 'initialization',
    inProgressPassed = 'inProgressPassed',
    inProgressAccepted = 'inProgressAccepted',
}

export enum EnumShiftPosition {
    common = 'common',
    responsible = 'responsible',
}

export interface IScheduleShiftDay {
    date: Date;
    items: IScheduleShift[];
    isAllShiftsSet: boolean;
}

export interface IScheduleShift {
    id: number;
    start: Date;
    end: Date;
    status: EnumShiftStatus;
    brigadeId: number;
    brigade: { id: number; number: string };
    brigadeName: string;
    isBrigadeSet: boolean;
    isAccepted: boolean;
    isPassed: boolean;
    shiftMembers?: IShiftMember[];
}

export interface IShiftMember {
    employeeId: number;
    isConfirmed: boolean;
    employee: IUser;
    absentReason: IAbsent;
    isPossibilityDelete: boolean;
    status: EnumShiftStatus;
    position: EnumShiftPosition;
    isAdditionalMember: boolean;
}

export interface IBrigadeWithUsersDto {
    brigadeId: number;
    brigadeNumber: string;
    unit?: IUnits;
    users?: IUser[];
}

export interface IUnits {
    id: number;
    name: string;
    createdAt: Date;
    createdById: number;
    synonyms: IUnits[];
}

export interface IUnitSettings {
    id?: number;
    unitId: number;
    shiftLengthHours: number;
    shiftStartOffset: number;
    applyFrom: string;
    createdAt?: Date;
}
