export interface MI_TempValues {
  id: string;
  value: string;
}

export interface MI_DataGet {
  trueValues: string[];
  falseValues: string[];
}

export interface MI_DataSend {
  Id:string;
  User: string;
  Params: MI_ParamSend[];
}

export interface MI_ParamSend {
  Id: string;
  Value: string;
  TimeCode: Date;
  Comment: string;
  isEdit: boolean;
}

export interface Param_MI {
  id: string;
  name: string;
  group: string;
  machine: string;
  unit: string;
  lastValue: string;
  curValue?: string;
  lastTime: Date;
  curTime: Date;
  minValue: string;
  maxValue: string;
  comment?: string;
  isCommentRequired: boolean;
  isActive: boolean;
  isWarning: boolean;
  isSave?: boolean;
  isError?: boolean;
  isEdit?: boolean;
  saveValue?: string;
}

export interface Group_MI {
  name: string;
  params: Param_MI[];
}

export interface Machine_MI {
  name: string;
  groups: Group_MI[];
}

export interface TestPostClass {
  id: number;
  msg: string;
}
