export interface IAstueOnpzMnemonicFurnaceResponse {
    description: string;
    units: IAstueOnpzMnemonicFurnaceResponseOvenUnit[];
}

export interface IAstueOnpzMnemonicFurnaceResponseOvenUnit {
    description: string;
    ovens: IAstueOnpzMnemonicFurnaceResponseOven[];
}

export interface IAstueOnpzMnemonicFurnaceResponseOven {
    inputOil: IAstueOnpzMnemonicFurnaceResponseGroupData[];
    inputGaz: IAstueOnpzMnemonicFurnaceResponseGroupData[];
    liquidFuel: IAstueOnpzMnemonicFurnaceResponseGroupData[];
    rarefaction: IAstueOnpzMnemonicFurnaceResponseGroupData[];
    outputRaw: IAstueOnpzMnemonicFurnaceResponseGroupData[];
    outputGaz: IAstueOnpzMnemonicFurnaceResponseGroupData[];
}

export interface IAstueOnpzMnemonicFurnaceResponseGroupData {
    name: string;
    description: string;
    order: number;
    value: number;
    type: string;
}

export interface IAstueOnpzMnemonicFurnace {
    unitTitle: string;
    inputOilBlock: IAstueOnpzMnemonicFurnaceBlock;
    inputGasBlock: IAstueOnpzMnemonicFurnaceBlock;
    inputLiquidBlock: IAstueOnpzMnemonicFurnaceBlock;
    outputBlock: IAstueOnpzMnemonicFurnaceBlock;
    dischargeStats: IAstueOnpzMnemonicFurnaceStreamStats;
    gasStats: IAstueOnpzMnemonicFurnaceStreamStats;
}

export interface IAstueOnpzMnemonicFurnaceBlock {
    title: string;
    lines: IAstueOnpzMnemonicFurnaceLine[][];
}

export interface IAstueOnpzMnemonicFurnaceLine {
    type: AstueOnpzMnemonicFurnaceElementType;
    data:
        | IAstueOnpzMnemonicFurnaceCircle
        | IAstueOnpzMnemonicFurnaceQuad
        | IAstueOnpzMnemonicFurnaceRect;
}

export interface IAstueOnpzMnemonicFurnaceStreamStats {
    title: string;
    main: IAstueOnpzMnemonicFurnaceCircle;
    streams: number[];
}

export interface IAstueOnpzMnemonicFurnaceRect {
    count?: string;
    title: string;
    value?: number;
    unit?: string;
    type: AstueOnpzMnemonicFurnaceRectType;
}

export interface IAstueOnpzMnemonicFurnaceCircle {
    value: number;
    unit: string;
    type?: AstueOnpzMnemonicFurnaceStreamStatsType;
}

export interface IAstueOnpzMnemonicFurnaceQuad {
    value: number;
    unit: string;
}

export enum AstueOnpzMnemonicFurnaceElementType {
    Rect = 'rect',
    Circle = 'circle',
    Quad = 'quad',
}

export enum AstueOnpzMnemonicFurnaceStreamStatsType {
    Norm = 'norm',
    Deviation = 'deviation',
}

export enum AstueOnpzMnemonicFurnaceRectType {
    Full = 'full',
    Value = 'value',
    Stream = 'stream',
}
