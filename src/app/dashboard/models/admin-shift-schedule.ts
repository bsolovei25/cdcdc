import { IUser } from './events-widget';

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
    isPossibilityDelete: boolean;
    status: EnumShiftStatus;
    position: EnumShiftPosition;
}

export interface IBrigadeWithUsersDto {
    brigadeId: number;
    brigadeNumber: string;
    users: IUser[];
}

export interface IUnits {
    id: number;
    name: string;
    createdAt: Date;
    createdById: number;
    synonyms: IUnits[];
}
