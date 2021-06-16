// TODO: replace model
export interface IBrigade {
    id: number;
    number: string;
}

export interface IChangeShiftComment {
    id: number;
    comment: string;
    createdAt: Date;
    createdBy: number;
}

export interface IChangeShiftDto {
    id: number;
    startFact: Date;
    endFact: Date;
    startTimetable: Date;
    endTimetable: Date;
    status: ChangeShiftStatus;
    unit: IChangeShiftUnit;
}

export interface IChangeShiftModel extends IChangeShiftDto {
    members: IChangeShiftMember[];
    comments: IChangeShiftComment[];
}

export interface IChangeShiftUnit {
    id: number;
    name: string;
}

export interface IChangeShiftMember {
    id: number;
    unitRole: IChangeShiftRole;
    user: IChangeShiftUser;
}

export interface IChangeShiftUser {
    id: number;
    displayName: string;
    firstName: string;
    lastName: string;
    mainTag: string; // ???
    middleName: string;
    photoId: string; // guid
    post: string;
    status: ChangeShiftUserStatus;
}

export interface IChangeShiftRole {
    id: number;
    name: string;
    type: ChangeShiftRoleType;
    mainTag: ChangeShiftRoleTag;
}

export interface IChangeShiftRoleReference {
    key: ChangeShiftRoleType;
    value: string;
}

export interface IChangeShiftCommentRequired {
    comment: string;
    result: boolean;
}

export interface IChangeShiftVerifier {
    id: number;
    widgetId: string;
    isConfirmed: boolean;
    shiftId: number;
    memberId: number;
    roleId: number;
    message: string;
    type: ChangeShiftVerifierType;
}

export type ChangeShiftStatus = 'init' | 'acceptReady' | 'accepted' | 'passed';
export type ChangeShiftType = 'pass' | 'accept';
export type ChangeShiftUserStatus = 'inProcess' | 'onShift' | 'passShift' | 'absent';
export type ChangeShiftRoleType = 'role' | 'additionalRole' | 'mainRole';
export type ChangeShiftRoleTag = 'secondary' | 'main';
export type ChangeShiftMemberAction = 'add' | 'delete' | 'main' | 'progress';
export type ChangeShiftVerifierType = 'shift' | 'member' | 'refresh';
