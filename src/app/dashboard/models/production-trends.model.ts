import { IChartMini } from '../../@shared/models/smart-scroll.model';

export interface IProductionTrend {
    graphType: ProductionTrendType;
    graph: IChartMini[];
}

export type ProductionTrendType = 'plan' | 'fact';
