import { LineChartOptions } from './line-chart';

export interface WidgetGridsterSettings {
    itemRows: string;
    itemCols: string;
    
  }
  
  
export class WidgetModel{
    isMock: boolean;
    id: number;
  }
  
export interface Widgets{
  code: string;
  id: string;
  name: string;
  title: string;
  units: string;
  widgetOptions: LineChartOptions;
  widgetType: string;
}  

export interface PieWidget{
  name: string;
  critical: number;
  nonCritical: number;
}