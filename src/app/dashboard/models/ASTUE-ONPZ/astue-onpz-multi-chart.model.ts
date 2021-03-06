import { IChartMini, IChartD3 } from '@shared/interfaces/smart-scroll.model';

export interface IMultiChartTransfer {
    type: IMultiChartTransferType;
    isEconomy: boolean;
}

export type IMultiChartTransferType = 'deviation' | 'limit';

export interface IMultiChartLine {
    graphType: IMultiChartTypes;
    units?: string;
    graph: IChartMini[];
    tagName: string;
    graphStyle?: string;
    nextPlanValue?: number; // только для плана
    currentValue?: number;
    subchannelId?: string;
    multiChartTypes?: string;
}

export interface IMultiChartData extends IMultiChartLine {
    minValue: number;
    maxValue: number;
    scaleY: (val: number) => number;
    axisY: (...args: any) => any;
    transformedGraph: IChartD3[];
}

export type IMultiChartTypes =
    | 'plan'
    | 'fact'
    | 'forecast'
    | 'factModel'
    | 'temperature'
    | 'heatExchanger'
    | 'volume'
    | 'pressure'
    | 'border'
    | 'higherBorder'
    | 'lowerBorder';
