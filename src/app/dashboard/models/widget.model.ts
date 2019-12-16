import { LineChartOptions } from './line-chart';

export interface WidgetGridsterSettings {
  itemRows: string;
  itemCols: string;

}


export class WidgetModel {
  isMock: boolean;
  id: number;
}

export interface Widgets {
  code: string;
  id: string;
  name: string;
  title: string;
  units: string;
  widgetOptions: LineChartOptions;
  widgetType: string;
} 

export interface RingFactoryWidget{
  title: string;
  typeFabric: number;
  value: RingValue[];
  buttons: RingButton[];
}

export interface RingValue{
  name: string;
  valueOne: number;
  valueTwo: number;
}

export interface RingButton{
  typeButton: string;
  critical: number;
  notcritical: number;
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


