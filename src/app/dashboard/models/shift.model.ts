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
}

export interface ShiftMember {
  employee: Employee;
  status: string;
}

export interface Shift {
  id: number;
  shiftMembers: ShiftMember[];
  brigade: Brigade;
}

export interface ShiftPass {
  id: number;
  passingShift: Shift;
  acceptingShift: Shift;
}

