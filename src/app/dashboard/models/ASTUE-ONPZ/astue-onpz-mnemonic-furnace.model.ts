export interface IAstueOnpzMnemonicFurnaceResponse {
    id: string;
    description: string;
    units: IAstueOnpzMnemonicFurnaceResponseOvenUnit[];
}

export interface IAstueOnpzMnemonicFurnaceResponseOvenUnit {
    id: string;
    description: string;
    ovens: IAstueOnpzMnemonicFurnaceResponseOven[];
}

export interface IAstueOnpzMnemonicFurnaceResponseOven {
    id: string;
    name: string;
    inputOil: IAstueOnpzMnemonicFurnaceResponseGroup;
    inputGaz: IAstueOnpzMnemonicFurnaceResponseGroup;
    liquidFuel: IAstueOnpzMnemonicFurnaceResponseGroup;
    rarefaction: IAstueOnpzMnemonicFurnaceResponseGroup;
    outputRaw: IAstueOnpzMnemonicFurnaceResponseGroup;
    outputGaz: IAstueOnpzMnemonicFurnaceResponseGroup;
}

export interface IAstueOnpzMnemonicFurnaceResponseGroup {
    id?: string;
    value: number;
    unit: string;
    temp: IAstueOnpzMnemonicFurnaceResponseExtendAttribute;
    item: IAstueOnpzMnemonicFurnaceResponseGroupData[];
}

export interface IAstueOnpzMnemonicFurnaceResponseGroupData {
    id: string;
    name: string;
    description: string;
    order: number;
    value: number;
    units: string;
    type: string;
    code: number;
    temp: IAstueOnpzMnemonicFurnaceResponseExtendAttribute;
    pressure: IAstueOnpzMnemonicFurnaceResponseExtendAttribute;
    isDeviation: boolean;
}

export interface IAstueOnpzMnemonicFurnaceResponseExtendAttribute {
    id?: string;
    value: number;
    units: string;
    isDeviation: boolean;
}

export interface IAstueOnpzMnemonicFurnaceSelectReferences {
    manufactures: {
        id: string;
        title: string;
        units: {
            id: string;
            title: string;
            ovens: {
                id: string;
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
    streams: IAstueOnpzMnemonicFurnaceStreamStatsMini[];
}

export interface IAstueOnpzMnemonicFurnaceStreamStatsMini {
    value: number;
    streamType?: AstueOnpzMnemonicFurnaceStreamStatsType;
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
    id?: string;
    value: number;
    unit: string;
    streamType?: AstueOnpzMnemonicFurnaceStreamStatsType;
}

export interface IAstueOnpzMnemonicFurnaceQuad {
    value: number;
    unit: string;
    streamType?: AstueOnpzMnemonicFurnaceStreamStatsType;
}

export enum AstueOnpzMnemonicFurnaceElementType {
    Rect = 'rect',
    Circle = 'circle',
    Quad = 'quad',
}

export interface IAstueOnpzMnemonicFurnaceOptions {
    manufactureId: string;
    unitId: string;
    ovenId: string;
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
