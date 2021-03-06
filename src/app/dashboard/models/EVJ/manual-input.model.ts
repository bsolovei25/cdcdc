export interface MI_TempValues {
    id: string;
    value: string;
}

export interface MI_DataGet {
    trueValues: IValue[];
    falseValues: IValue[];
}

export interface MI_DataSend {
    Id: string;
    User: string;
    Params: MI_ParamSend[];
}

export interface MI_ParamSend {
    Id: string;
    Value: string;
    TimeCode: Date;
    Comment?: string;
    isEdit?: boolean;
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
    curComment?: string;
    prevComment?: string;
    isCommentRequired: boolean;
    isActive: boolean;
    isWarning: boolean;
    isSave?: boolean;
    isError?: boolean;
    isEdit?: boolean;
    openInput?: boolean;
    saveValue?: string;
    historyValues?: IHistory[];
}

export interface IGroup_MI {
    name: string;
    params?: Param_MI[];
    open?: boolean;
}

export interface ManualInputData {
    items: IMachine_MI[];
}

export interface IMachine_MI {
    name: string;
    isUserHasWriteClaims?: boolean;
    groups?: IGroup_MI[];
    active?: boolean;
    open?: boolean;
}

export interface TestPostClass {
    id: number;
    msg: string;
}

export interface IValue {
    id: string;
    timeCode: Date;
    value: string;
}

export interface IHours {
    hour: Date;
    value: number;
}

export interface IHistory {
    day: string;
    hourValues: IHours[];
}

export interface IChoosenHistorical {
    name: string;
    isUserHasWriteClaims?: boolean;
    groups?: {
        name: string;
        params?: Param_MI;
        open?: boolean;
    };
    active?: boolean;
    open?: boolean;
}

export interface IHistoryIdx {
    machineIdx: number;
    groupIdx: number;
    paramsIdx: number;
}
