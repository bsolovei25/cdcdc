import {LineChartOptions} from "./line-chart";

export interface Widget {
  id: string;
  name: string;
  code: string;
  units: string;
  widgetType: string;
  widgetOptions: LineChartOptions;
}



