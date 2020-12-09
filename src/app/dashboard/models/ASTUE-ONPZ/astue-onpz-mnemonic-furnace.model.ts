export interface IAstueOnpzMnemonicFurnaceResponse {
    description: string;
    units: IAstueOnpzMnemonicFurnaceResponseOvenUnit[];
}

export interface IAstueOnpzMnemonicFurnaceResponseOvenUnit {
    description: string;
    ovens: IAstueOnpzMnemonicFurnaceResponseOven[];
}

export interface IAstueOnpzMnemonicFurnaceResponseOven {
    name: string;
    inputOil: IAstueOnpzMnemonicFurnaceResponseGroup;
    inputGaz: IAstueOnpzMnemonicFurnaceResponseGroup;
    liquidFuel: IAstueOnpzMnemonicFurnaceResponseGroup;
    rarefaction: IAstueOnpzMnemonicFurnaceResponseGroup;
    outputRaw: IAstueOnpzMnemonicFurnaceResponseGroup;
    outputGaz: IAstueOnpzMnemonicFurnaceResponseGroup;
}

export interface IAstueOnpzMnemonicFurnaceResponseGroup {
    item: IAstueOnpzMnemonicFurnaceResponseGroupData[];
    value: number;
    unit: string;
}

export interface IAstueOnpzMnemonicFurnaceResponseGroupData {
    name: string;
    description: string;
    order: number;
    value: number;
    units: string;
    type: string;
    temp: IAstueOnpzMnemonicFurnaceResponseExtendAttribute;
    pressure: IAstueOnpzMnemonicFurnaceResponseExtendAttribute;
}

export interface IAstueOnpzMnemonicFurnaceResponseExtendAttribute {
    value: number;
    units: string;
}

export interface IAstueOnpzMnemonicFurnaceSelectReferences {
    manufactures: {
        title: string;
        units: {
            title: string;
            ovens: {
                title: string;
            }[];
        }[];
    }[];
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
    streamType?: AstueOnpzMnemonicFurnaceStreamStatsType;
}

export interface IAstueOnpzMnemonicFurnaceCircle {
    value: number;
    unit: string;
    streamType?: AstueOnpzMnemonicFurnaceStreamStatsType;
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
