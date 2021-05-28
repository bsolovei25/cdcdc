export type SuutpGaugeChartColors = 'Red' | 'Yellow' | 'Blue' | 'Brown' | 'White';

export interface ISuutpGaugeChart {
    description: string,
    bounds: number[],
    colorBounds: SuutpGaugeChartColors[],
    deviation: number,
    fact: number,
    percentage: number,
    plan: number
}

export interface ISuutpBarChart {
    value: number,
    date: string
}

export interface ISuutpLineChart {
    value: number,
    date: string
}

export interface ISuutpCharts {
    gaugeChart: ISuutpGaugeChart,
    dynamicsChart: ISuutpBarChart[] | ISuutpLineChart[]
}
