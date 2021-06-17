import { LineChartOptions } from './line-chart';
import { SortTypeEvents } from './EVJ/events-widget';

export interface IWidgetGridsterSettings {
    itemRows: string;
    itemCols: string;
}

export class WidgetModel {
    isMock: boolean;
    id: number;
}

export interface IWidget {
    code: string;
    id: string;
    name: string;
    title?: string;
    units?: string;
    widgetOptions?: LineChartOptions;
    widgetType: string;
    categories?: string[];
    isClaim: boolean;
    isVideoWall?: boolean;
    isHidden?: boolean;
    sensorId?: number;
    isActive?: boolean;
    attributes?: any;
    sourceTypeFlag: number;
}

export interface RingFactoryWidget {
    id: string;
    title: string;
    typeFabric: number;
    values: RingValue[];
    buttons: RingButton[];
}

export interface RingValue {
    name: string;
    plan: number;
    fact: number;
}

export interface RingButton {
    typeButton: number;
    critical: number;
    notCritical: number;
}

export interface ChainMap {
    line: ChainLine[];
    circle: ChainCircle[];
}

export interface ChainLine {
    idLine: string;
    status: number;
}

export interface ChainCircle {
    idCircle: string;
    status: number;
}

export interface PieWidget {
    name: string;
    critical: number;
    nonCritical: number;
}

export interface BarWidget {
    name: string;
    good: number;
    bad: number;
    total: number;
}

export interface TruncPieWidget {
    name: string;
    count: number;
    critical: number;
    image: string;
}
