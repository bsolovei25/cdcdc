export interface MachineParam {
  Id: string;
  Name: string;
  LastValue: string;
  CurValue?: string;
  TimeCodeLast?: Date;
  TimeCodeCur?: Date;
  MinValue: string;
  MaxValue: string;
  Unit: string;
  PeriodTime: number;
  InputTime: number;
  Comment?: string;

  isActiveTime?: boolean;
  isActiveTimeOut?: boolean;
  isSave?: boolean;
  isError?: boolean;

  saveCount: number;
  saveValue?: string;
  Time?: number;
}

export interface Machine {
  Name: string;
  MachineParams: MachineParam[];
}

export interface Area {
  Name: string;
  Machines: Machine[];
}

export interface RestDataGet {
  Areas: Area[];
}

export interface RestDataSend {
  Id: string;
  Value: string;
  TimeCode: string;
  Comment: string;
  isEdit: boolean;
}

export interface RestCheckGet {
  StatusCode: number;
  Ids: string[];
}
