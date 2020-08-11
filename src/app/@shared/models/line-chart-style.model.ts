export interface IChartStyle {
    lineWidth: number;
    lineColor: string;
    lineType: LineTypes;
}

export type LineTypes = 'solid' | 'dashed';

export type ChartStyleType = 'common' | 'main' | 'additional' | 'area';

export class ChartStyle {
    private readonly chartColors: { [key: string]: string } = {
        white: '#ffffff',
        active: '#3fa9f5',
    };

    public readonly common: IChartStyle = {
        lineWidth: 0.5,
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
