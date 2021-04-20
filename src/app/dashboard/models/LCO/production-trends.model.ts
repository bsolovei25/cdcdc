import { IChartMini } from '@shared/interfaces/smart-scroll.model';
import { ChartStyleType } from '@shared/interfaces/line-chart-style.model';

export interface IProductionTrend {
    graphType: ProductionTrendType;
    graphStyle?: ChartStyleType;
    graph: IChartMini[];
    additional?: {
        tankName: string;
        maxValue: number;
    };
}

export type ProductionTrendType = 'plan' | 'fact' | 'higherBorder' | 'lowerBorder';
