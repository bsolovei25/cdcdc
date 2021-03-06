export interface IKpeLineChartData {
    graphType: 'fact' | 'plan' | 'lowerBorder' | 'higherBorder';
    graph?: { value: number; timeStamp: string }[];
    graphStyle?: 'main' | 'common' | 'additional';
}

export interface IKpeGaugeChartData {
    fact: number;
    plan: number;
    deviation?: number;
    title?: string;
    zeroOn?: string;
    colorBounds?: string[];
    unit?: string;
    isWarning?: boolean;
    percentage?: number;
    deviationPercentage?: number;
    percentageInfluence?: number;
}
