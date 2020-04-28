export interface IChartMini {
    value: number;
    timestamp: Date;
}

export interface IPointTank {
    value: number;
    timestamp: Date;
    additional?: any;
}

export interface IChartD3 {
    x: number;
    y: number;
}

export interface IPointD3 {
    x: number;
    y: number;
    additional?: any;
}
