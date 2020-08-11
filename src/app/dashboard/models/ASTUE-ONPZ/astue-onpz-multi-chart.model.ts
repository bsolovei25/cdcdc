import { IChartMini } from '../../../@shared/models/smart-scroll.model';

export interface IMultiChartLine {
    graphType: IMultiChartTypes;
    graph: IChartMini[];
}

export type IMultiChartTypes = 'plan' | 'fact' | 'temperature';
