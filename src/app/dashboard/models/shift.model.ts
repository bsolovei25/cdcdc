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
    status: string;
    position: string;
    shiftType?: string;
}

export interface Shift {
    id: number;
    shiftMembers: ShiftMember[];
    brigade: Brigade;
    shiftPassingComments: ShiftComment[];
    shiftAcceptingComments: ShiftComment[];
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
