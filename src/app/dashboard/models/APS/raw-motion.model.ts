export interface IRawMotion {
    units: string;
    upperLimit: number;
    lowerLimit: number;
    maxValue: number;
    minValue: number;
    cols: IRawMotionCol[];
}

export interface IRawMotionCol {
    date: Date;
    value: number;
}

export interface IRawMotionHeader {
    title: string;
    iconName: string;
    svgStyle: { [key: string]: number };
}
