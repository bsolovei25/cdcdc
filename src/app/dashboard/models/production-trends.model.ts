import { IChartMini } from '../../@shared/models/smart-scroll.model';
import { ChartStyleType } from '../../@shared/models/line-chart-style.model';

export interface IProductionTrend {
    graphType: ProductionTrendType;
    graphStyle: ChartStyleType;
    graph: IChartMini[];
}

export type ProductionTrendType = 'plan' | 'fact' | 'higherBorder' | 'lowerBorder';
