import { IUser } from './events-widget';

export interface IBrigade {
    id: number;
    number: string;
    // number: number;
}

export interface Employee {
    id: number;
    photoId: string;
    firstName: string;
    lastName: string;
    brigade: IBrigade;
    position: string;
    positionDescription: string;
    main?: boolean;
}

export interface ShiftMember {
    employee: Employee;
    status: ShiftMemberStatus;
    position: string;
    shiftType?: string;
}

export interface Shift {
    id: number;
    shiftMembers: ShiftMember[];
    brigade: IBrigade;
    shiftPassingComments: ShiftComment[];
    shiftAcceptingComments: ShiftComment[];
    status: ShiftStatus;
}

export interface ShiftPass {
    id: number;
    passingShift: Shift;
    acceptingShift: Shift;
    unitId: number;
}

export interface ShiftComment {
    id: number;
    comment: string;
    createdAt: Date;
    createdBy: number;
}

export interface ICommentRequired {
    idShift: number;
    comment: string;
    result: boolean;
}

export interface IVerifyWindow {
    action: VerifyWindowActions;
    widgetId: string;
    type?: VerifyWindowType;
    verifyId?: number;
    user?: IUser;
    message?: string;
    result?: boolean;
}

export type ShiftMemberStatus =
    | 'initialization'
    | 'inProgressAccepted'
    | 'accepted'
    | 'inProgressPassed'
    | 'passed'
    | 'absent'
    | 'missing';

export type ShiftStatus =
    | 'initialization'
    | 'inProgressAccepted'
    | 'accepted'
    | 'inProgressPassed'
    | 'passed'
    | 'passedConfirm';

export type VerifyWindowActions = 'open' | 'close';
export type VerifyWindowType = 'usb' | 'card' | null;
