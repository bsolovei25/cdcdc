import { IChartMini, IChartD3 } from '../../../@shared/models/smart-scroll.model';

export interface IMultiChartLine {
    graphType: IMultiChartTypes;
    units?: string;
    graph: IChartMini[];
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
    | 'temperature'
    | 'heatExchanger'
    | 'volume'
    | 'pressure';
