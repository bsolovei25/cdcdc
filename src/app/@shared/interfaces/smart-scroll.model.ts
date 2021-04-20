export interface IChartMini {
    value: number;
    timeStamp: Date;
}

export interface IPointTank {
    value: number;
    timestamp: Date;
    additional?: IPointAdditional;
}

export interface IChartD3 {
    x: number;
    y: number;
}

export interface IPointD3 {
    x: number;
    y: number;
    additional?: IPointAdditional;
}

export interface IPointAdditional {
    card?: IPointCardObject;
}

export interface IPointCardObject {
    title: string;
    direction: 'Приемник' | 'Источник';
    objectType?: 'unit' | 'tank';
}
