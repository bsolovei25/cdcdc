export interface IChartStyle {
    lineWidth: number;
    lineColor: string;
    lineType: LineTypes;
}

export type LineTypes = 'solid' | 'dashed';

export type ChartStyleType = 'common' | 'main' | 'additional' | 'area';

export class ChartStyle {
    private readonly chartColors: { [key: string]: string } = {
        white: 'var(--index-fact-color)',
        active: 'var(--index-plan-color)',
    };

    public readonly common: IChartStyle = {
        lineWidth: 1,
        lineColor: this.chartColors.white,
        lineType: 'solid',
    };

    public readonly main: IChartStyle = {
        lineWidth: 2,
        lineColor: this.chartColors.active,
        lineType: 'solid',
    };

    public readonly additional: IChartStyle = {
        lineWidth: 0.5,
        lineColor: this.chartColors.white,
        lineType: 'dashed',
    };

    public drawLineType(lineStyle: IChartStyle): string {
        return lineStyle.lineType === 'dashed' ? '2 5' : '2 0';
    }
}
