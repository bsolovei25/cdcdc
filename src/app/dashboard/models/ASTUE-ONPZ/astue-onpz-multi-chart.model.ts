import { IChartMini } from '../../../@shared/models/smart-scroll.model';

export interface IMultiChartLine {
    graphType: IMultiChartTypes;
    units?: string;
    graph: IChartMini[];
}

export type IMultiChartTypes =
    | 'plan'
    | 'fact'
    | 'temperature'
    | 'heatExchanger'
    | 'volume'
    | 'pressure';
