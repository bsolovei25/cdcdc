export interface IChartMini {
    value: number;
    timestamp: Date;
}

export interface IPointTank {
    value: number;
    timestamp: Date;
    additional?: IPointObject;
}

export interface IChartD3 {
    x: number;
    y: number;
}

export interface IPointD3 {
    x: number;
    y: number;
    additional?: IPointObject;
}

export interface IPointObject {
    title: string;
    direction: 'Приемник' | 'Источник';
    objectType?: 'unit' | 'tank';
}
