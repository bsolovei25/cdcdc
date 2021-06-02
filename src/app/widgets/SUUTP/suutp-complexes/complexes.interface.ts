import { IKpeGaugeChartPage } from "@widgets/KPE/key-performance-indicators/components/gauge-diagram/gauge-diagram.component";

export interface IComplex {
    title: string;
    indicators: IComplexIndicator[];
    data: IComplexData[];
    chartPage: IKpeGaugeChartPage;
}

export interface IComplexIndicator {
    count: number;
    planLimit?: number;
    errorLimit?: number;
    icon?: string;
    greyColor?: boolean;
}

export interface IComplexData {
    title: string;
    col: 6 | 4 | 3;
    isWarning: boolean;
    indicator: IComplexIndicator;
}
