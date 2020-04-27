import { IChartMini } from '../../@shared/models/smart-scroll.model';

export interface IProductionTrend {
    graphType: ProductionTrendType;
    graph: IChartMini[];
    deviationUp?: number;
    deviationDown?: number;
}

export type ProductionTrendType = 'plan' | 'fact';
