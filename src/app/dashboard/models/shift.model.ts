export interface Brigade {
    id: number;
    number: number;
}

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    brigade: Brigade;
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
    brigade: Brigade;
    shiftPassingComments: ShiftComment[];
    shiftAcceptingComments: ShiftComment[];
    status: ShiftStatus;
}

export interface ShiftPass {
    id: number;
    passingShift: Shift;
    acceptingShift: Shift;
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

export type ShiftMemberStatus = 'initialization' |
    'inProgressAccepted' |
    'accepted' |
    'inProgressPassed' |
    'passed' |
    'absent' |
    'missing';

export type ShiftStatus = 'initialization' |
    'inProgressAccepted' |
    'accepted' |
    'inProgressPassed' |
    'passed' |
    'passedConfirm';
